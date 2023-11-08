import { Magic } from "magic-sdk";
import { OAuthExtension } from "@magic-ext/oauth";

type MagicInstance = Magic | null;

// Create client-side Magic instance
const createMagic = (key: string): MagicInstance => {
  if (typeof window !== "undefined") {
    return new Magic(key, {
      extensions: [new OAuthExtension()],
    });
  }
  return null;
};

const magicApiKey = process.env.NEXT_PUBLIC_MAGIC_API_KEY ?? "YOUR_DEFAULT_KEY";

export const magic: MagicInstance = createMagic(magicApiKey);

// import { Magic } from "magic-sdk";
// import { OAuthExtension } from "@magic-ext/oauth";

// // export const magic = new Magic("pk_live_EBBDDE7380155E3E", {
// //   network: {
// //     rpcUrl: "https://eth-sepolia.g.alchemy.com/v2/demo",

// //     chainId: 11155111,
// //   },
// // });

// let magic;

// if (typeof window !== "undefined") {
//   //const { Magic } = import("magic-sdk");
//   magic = new Magic("pk_live_EBBDDE7380155E3E", {
//     extensions: [new OAuthExtension()],
//   });
// }

// export { magic };
