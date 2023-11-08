import { Magic } from "@magic-sdk/admin";
import { NextApiRequest, NextApiResponse } from "next";

// Initiating Magic instance for server-side methods
const magic = new Magic(process.env.MAGIC_SECRET_KEY as string);

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new Error("Authorization header not found");
    }

    const didToken = authHeader.substring(7);
    await magic.token.validate(didToken);
    res.status(200).json({ authenticated: true });
  } catch (error: any) {
    res.status(500).json({ error: error.message as string });
  }
}
