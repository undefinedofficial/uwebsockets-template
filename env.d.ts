export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      RELEASE?: "yes";
      VERSION: string;
      HOST_PROTO: string;
      HOST_NAME: string;
      HOST_ADDR: string;
      HOST_PORT: string;
      HOST_CRT: string;
      HOST_KEY: string;
    }
  }
}
