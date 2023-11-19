import {
  ADMIN_WALLET_ADDRESS,
  NETWORK,
} from "@/components/dashboard/ItemDescription";
import {
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
  sendAndConfirmTransaction,
} from "@solana/web3.js";
import base58 from "bs58";
import { NextApiRequest, NextApiResponse } from "next";
import { encodeURL, findReference, validateTransfer } from "@solana/pay";
import BigNumber from "bignumber.js";

const recipient = new PublicKey(ADMIN_WALLET_ADDRESS);
const label = "WaveSurf Store";
const memo = "WaveSurf Solana Pay Memo";
const paymentRequests = new Map<
  string,
  { recipient: PublicKey; amount: BigNumber; memo: string }
>();

async function generateUrl(
  recipient: PublicKey,
  amount: BigNumber,
  reference: PublicKey,
  label: string,
  message: string,
  memo: string
) {
  const url: URL = encodeURL({
    recipient,
    amount,
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
      const { amount } = req.body;

      if (parseInt(amount) === 0) {
        return res
          .status(400)
          .json({ error: "Can't checkout with charge of 0" });
      }
      const reference = new Keypair().publicKey;
      const bigAmount = new BigNumber(amount);
      const message = `WaveSurf Store - Order ID #0${
        Math.floor(Math.random() * 999999) + 1
      }`;
      const { url } = await generateUrl(
        recipient,
        bigAmount,
        reference,
        label,
        message,
        memo
      );
      const ref = reference.toBase58();
      paymentRequests.set(ref, { recipient, amount: bigAmount, memo });
      res.status(200).json({ url: url.toString(), ref });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal Server Error" });
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
