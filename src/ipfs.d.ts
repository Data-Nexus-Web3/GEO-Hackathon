declare module "ipfs-http-client" {
    export default function ipfsHttpClient(options: { host: string; port: number; protocol: string }): {
      add: (data: string | Buffer) => Promise<{ path: string }>;
    };
  }