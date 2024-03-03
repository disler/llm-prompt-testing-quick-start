import { Logger } from "@azure/msal-common";
import { CachedKeyPair } from "../crypto/CryptoOps";
import { AsyncMemoryStorage } from "./AsyncMemoryStorage";
export declare const CryptoKeyStoreNames: {
    readonly asymmetricKeys: "asymmetricKeys";
    readonly symmetricKeys: "symmetricKeys";
};
export type CryptoKeyStoreNames = (typeof CryptoKeyStoreNames)[keyof typeof CryptoKeyStoreNames];
/**
 * MSAL CryptoKeyStore DB Version 2
 */
export declare class CryptoKeyStore {
    asymmetricKeys: AsyncMemoryStorage<CachedKeyPair>;
    symmetricKeys: AsyncMemoryStorage<CryptoKey>;
    logger: Logger;
    constructor(logger: Logger);
    clear(): Promise<boolean>;
}
//# sourceMappingURL=CryptoKeyStore.d.ts.map