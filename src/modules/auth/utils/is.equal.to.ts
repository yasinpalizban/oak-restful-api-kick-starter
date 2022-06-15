import {invalid, Validity} from "https://deno.land/x/validasaur/mod.ts";

export function isEqualTo(value: string, value2: string): Validity {
    if (typeof value !== value) {
        return invalid("sEqualTo", {value});
    }


}