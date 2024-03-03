// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { ManagedIdentityCredential, } from "./managedIdentityCredential";
import { AzureCliCredential } from "./azureCliCredential";
import { AzurePowerShellCredential } from "./azurePowerShellCredential";
import { ChainedTokenCredential } from "./chainedTokenCredential";
import { EnvironmentCredential } from "./environmentCredential";
import { AzureDeveloperCliCredential } from "./azureDeveloperCliCredential";
import { WorkloadIdentityCredential } from "./workloadIdentityCredential";
/**
 * A shim around ManagedIdentityCredential that adapts it to accept
 * `DefaultAzureCredentialOptions`.
 *
 * @internal
 */
export class DefaultManagedIdentityCredential extends ManagedIdentityCredential {
    // Constructor overload with just the other default options
    // Last constructor overload with Union of all options not required since the above two constructor overloads have optional properties
    constructor(options) {
        var _a, _b, _c;
        const managedIdentityClientId = (_a = options === null || options === void 0 ? void 0 : options.managedIdentityClientId) !== null && _a !== void 0 ? _a : process.env.AZURE_CLIENT_ID;
        const workloadIdentityClientId = (_b = options === null || options === void 0 ? void 0 : options.workloadIdentityClientId) !== null && _b !== void 0 ? _b : managedIdentityClientId;
        const managedResourceId = options === null || options === void 0 ? void 0 : options.managedIdentityResourceId;
        const workloadFile = process.env.AZURE_FEDERATED_TOKEN_FILE;
        const tenantId = (_c = options === null || options === void 0 ? void 0 : options.tenantId) !== null && _c !== void 0 ? _c : process.env.AZURE_TENANT_ID;
        // ManagedIdentityCredential throws if both the resourceId and the clientId are provided.
        if (managedResourceId) {
            const managedIdentityResourceIdOptions = Object.assign(Object.assign({}, options), { resourceId: managedResourceId });
            super(managedIdentityResourceIdOptions);
        }
        else if (workloadFile && workloadIdentityClientId) {
            const workloadIdentityCredentialOptions = Object.assign(Object.assign({}, options), { tenantId: tenantId });
            super(workloadIdentityClientId, workloadIdentityCredentialOptions);
        }
        else if (managedIdentityClientId) {
            const managedIdentityClientOptions = Object.assign(Object.assign({}, options), { clientId: managedIdentityClientId });
            super(managedIdentityClientOptions);
        }
        else {
            super(options);
        }
    }
}
/**
 * A shim around WorkloadIdentityCredential that adapts it to accept
 * `DefaultAzureCredentialOptions`.
 *
 * @internal
 */
export class DefaultWorkloadIdentityCredential extends WorkloadIdentityCredential {
    // Constructor overload with just the other default options
    // Last constructor overload with Union of all options not required since the above two constructor overloads have optional properties
    constructor(options) {
        var _a, _b, _c;
        const managedIdentityClientId = (_a = options === null || options === void 0 ? void 0 : options.managedIdentityClientId) !== null && _a !== void 0 ? _a : process.env.AZURE_CLIENT_ID;
        const workloadIdentityClientId = (_b = options === null || options === void 0 ? void 0 : options.workloadIdentityClientId) !== null && _b !== void 0 ? _b : managedIdentityClientId;
        const workloadFile = process.env.AZURE_FEDERATED_TOKEN_FILE;
        const tenantId = (_c = options === null || options === void 0 ? void 0 : options.tenantId) !== null && _c !== void 0 ? _c : process.env.AZURE_TENANT_ID;
        if (workloadFile && workloadIdentityClientId) {
            const workloadIdentityCredentialOptions = Object.assign(Object.assign({}, options), { tenantId, clientId: workloadIdentityClientId, tokenFilePath: workloadFile });
            super(workloadIdentityCredentialOptions);
        }
        else if (tenantId) {
            const workloadIdentityClientTenantOptions = Object.assign(Object.assign({}, options), { tenantId });
            super(workloadIdentityClientTenantOptions);
        }
        else {
            super(options);
        }
    }
}
export class DefaultAzureDeveloperCliCredential extends AzureDeveloperCliCredential {
    constructor(options) {
        super(Object.assign({ processTimeoutInMs: options === null || options === void 0 ? void 0 : options.processTimeoutInMs }, options));
    }
}
export class DefaultAzureCliCredential extends AzureCliCredential {
    constructor(options) {
        super(Object.assign({ processTimeoutInMs: options === null || options === void 0 ? void 0 : options.processTimeoutInMs }, options));
    }
}
export class DefaultAzurePowershellCredential extends AzurePowerShellCredential {
    constructor(options) {
        super(Object.assign({ processTimeoutInMs: options === null || options === void 0 ? void 0 : options.processTimeoutInMs }, options));
    }
}
export const defaultCredentials = [
    EnvironmentCredential,
    DefaultWorkloadIdentityCredential,
    DefaultManagedIdentityCredential,
    DefaultAzureCliCredential,
    DefaultAzurePowershellCredential,
    DefaultAzureDeveloperCliCredential,
];
/**
 * Provides a default {@link ChainedTokenCredential} configuration that should
 * work for most applications that use the Azure SDK.
 */
export class DefaultAzureCredential extends ChainedTokenCredential {
    constructor(options) {
        super(...defaultCredentials.map((ctor) => new ctor(options)));
    }
}
//# sourceMappingURL=defaultAzureCredential.js.map