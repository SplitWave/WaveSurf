import {
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
  TransactionInstruction,
  sendAndConfirmTransaction,
} from "@solana/web3.js";
import { NextApiRequest, NextApiResponse } from "next";
import {
  TransferRequestURL,
  encodeURL,
  findReference,
  parseURL,
  validateTransfer,
} from "@solana/pay";
import BigNumber from "bignumber.js";
import {
  createTransferCheckedInstruction,
  getAssociatedTokenAddress,
  getMint,
  getOrCreateAssociatedTokenAccount,
} from "@solana/spl-token";
import base58 from "bs58";

const ADMIN_WALLET_ADDRESS = "7xoh3GNCVEZgT7VeKB35bTBZuzm86XNfPVzr537zBzWt";
const USDC_TOKEN_ADDRESS = "Gh9ZwEmdLJ8DscKNTkTqPbNwLNNBjuSzaG9Vp2KGtKJr";
const usdcAddress = new PublicKey(USDC_TOKEN_ADDRESS);
const NETWORK = "https://api.devnet.solana.com";
const recipient = new PublicKey(ADMIN_WALLET_ADDRESS);
const connection = new Connection(NETWORK, "confirmed");
//const amount = new BigNumber(0.0001);
const label = "WaveSurf Store";
const memo = "WaveSurf Solana Pay Memo";
const paymentRequests = new Map<
  string,
  { recipient: PublicKey; amount: BigNumber; memo: string }
>();

export type MakeTransactionInputData = {
  account: string;
};

export type MakeTransactionOutputData = {
  transaction: string;
  message: string;
};

type ErrorOutput = {
  error: string;
};

async function generateUrl(
  recipient: PublicKey,
  amount: BigNumber,
  reference: PublicKey,
  splToken: PublicKey,
  label: string,
  message: string,
  memo: string
) {
  const url: URL = encodeURL({
    recipient,
    amount,
    splToken,
    reference,
    label,
    message,
    memo,
  });
  return { url };
}

async function verifyTransaction(reference: PublicKey) {
  // 1 - Check that the payment request exists
  const paymentData = paymentRequests.get(reference.toBase58());
  if (!paymentData) {
    throw new Error("Payment request not found");
  }
  const { recipient, amount, memo } = paymentData;

  // 2 - Establish a Connection to the Solana Cluster
  const connection = new Connection(NETWORK, "confirmed");
  console.log("recipient", recipient.toBase58());
  console.log("amount", amount);
  console.log("reference", reference.toBase58());
  console.log("memo", memo);

  // 3 - Find the transaction reference
  const found = await findReference(connection, reference);
  console.log(found.signature);

  // 4 - Validate the transaction
  const response = await validateTransfer(
    connection,
    found.signature,
    {
      recipient,
      amount,
      splToken: undefined,
      reference,
      //memo
    },
    { commitment: "confirmed" }
  );

  // 5 - Delete the payment request from local storage and return the response
  if (response) {
    paymentRequests.delete(reference.toBase58());
  }
  return response;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //Handle Generate Payment Requests
  if (req.method === "POST") {
    try {
      // We pass the reference to use in the query
      const { reference } = req.query;
      if (!reference) {
        res.status(400).json({ error: "No reference provided" });
        return;
      }
      const { amount } = req.body;
      if (parseInt(amount) === 0) {
        return res
          .status(400)
          .json({ error: "Can't checkout with charge of 0" });
      }

      const { account } = req.body as MakeTransactionInputData;
      if (!account) {
        res.status(400).json({ error: "No account provided" });
        return;
      }

      const buyerPublicKey = new PublicKey(account);
      const shopPublicKey = new PublicKey(ADMIN_WALLET_ADDRESS);

      // Get details about the USDC token
      const usdcMint = await getMint(connection, usdcAddress);
      // Get the buyer's USDC token account address
      const buyerUsdcAddress = await getAssociatedTokenAddress(
        usdcAddress,
        buyerPublicKey
      );
      // Get the shop's USDC token account address
      const shopUsdcAddress = await getAssociatedTokenAddress(
        usdcAddress,
        shopPublicKey
      );

      // Get a recent blockhash to include in the transaction
      const { blockhash } = await connection.getLatestBlockhash("finalized");

      const transaction = new Transaction({
        recentBlockhash: blockhash,
        // The buyer pays the transaction fee
        feePayer: buyerPublicKey,
      });

      // Create the instruction to send USDC from the buyer to the shop
      const transferInstruction = createTransferCheckedInstruction(
        buyerUsdcAddress, // source
        usdcAddress, // mint (token address)
        shopUsdcAddress, // destination
        buyerPublicKey, // owner of source address
        amount.toNumber() * 10 ** (await usdcMint).decimals, // amount to transfer (in units of the USDC token)
        usdcMint.decimals // decimals of the USDC token
      );

      // Add the reference to the instruction as a key
      // This will mean this transaction is returned when we query for the reference
      transferInstruction.keys.push({
        pubkey: new PublicKey(reference),
        isSigner: false,
        isWritable: false,
      });

      // Add the instruction to the transaction
      transaction.add(transferInstruction);

      // Serialize the transaction and convert to base64 to return it
      const serializedTransaction = transaction.serialize({
        // We will need the buyer to sign this transaction after it's returned to them
        requireAllSignatures: false,
      });
      const base64 = serializedTransaction.toString("base64");
      // Insert into database: reference, amount

      // Return the serialized transaction
      res.status(200).json({
        transaction: base64,
        message: "Thanks for your order! 🍪",
      });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "error creating transaction" });
    }
  }
  //Hanle Verify Payment Requests
  else if (req.method === "GET") {
    // 1 - Get the reference query parameter from the NextApiRequest
    const reference = req.query.reference;
    if (!reference) {
      res.status(400).json({ error: "Missing reference query parameter" });
      return;
    }

    // 2 - Verify the transaction
    try {
      const referencePublicKey = new PublicKey(reference as string);
      const response = await verifyTransaction(referencePublicKey);
      if (response) {
        res.status(200).json({ status: "verified" });
      } else {
        res.status(404).json({ status: "not found" });
      }
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
