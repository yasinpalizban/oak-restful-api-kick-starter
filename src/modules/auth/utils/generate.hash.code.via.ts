import {createHash} from "https://deno.land/std@0.97.0/hash/mod.ts";
import {CoreConfig} from "../../../core/config/core.config.ts";
export function generateHashCode(): string {
    const nonce: number = Math.round(100);
    const secretKey: string = CoreConfig.jwt.secretKey;
    const hash = createHash("sha256");
    hash.update(nonce + '|' + secretKey);
    return hash.toString();

}
