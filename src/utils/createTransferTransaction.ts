import {
  Transaction,
  SystemProgram,
  Connection,
  PublicKey,
} from "@solana/web3.js";

// Helper function to convert SOL to lamports
const solToLamports = (sol: number): number => {
  // 1 SOL = 1,000,000,000 lamports
  return Math.ceil(sol * 1e9);
};

/**
 * Creates an arbitrary transfer transaction
 * @param   {String}      senderPublicKey  Sender's public key
 * @param   {String}      recieverPublicKey  Reciever's public key
 * @param   {number}      amount              Amount of tokens to transfer
 * @param   {Connection}  connection an RPC connection
 * @returns {Transaction}            a transaction
 */
const createTransferTransaction = async (
  senderPublicKey: PublicKey,
  recieverPublicKey: PublicKey,
  amount: number,
  connection: Connection
): Promise<Transaction> => {
  // Convert amount from SOL to lamports
  const lamports = solToLamports(amount);

  // Create a new Solana transaction
  const transaction = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey: senderPublicKey,
      toPubkey: recieverPublicKey,
      lamports: amount,
    })
  );
  transaction.feePayer = senderPublicKey;

  const anyTransaction: any = transaction;
  anyTransaction.recentBlockhash = (
    await connection.getLatestBlockhash()
  ).blockhash;

  return transaction;
};

export default createTransferTransaction;
