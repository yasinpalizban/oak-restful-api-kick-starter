import { createHash } from "https://deno.land/std@0.97.0/hash/mod.ts";

import * as bcrypt from "https://deno.land/x/bcrypt/mod.ts";
import {Entity} from "../../shared/libraries/entity.ts";
import {CoreConfig} from "../../../core/config/core.config.ts";

export class UserEntity extends Entity {
    id: number | undefined;
    login: string | undefined;
    firstName: string | undefined;
    lastName: string | undefined;
    username: string | undefined;
    password: string | undefined;
    role: number | undefined;
    email: string | undefined;
    phone: string | undefined;
    image: string | undefined;
    address: string | undefined;
    gender: boolean | undefined;
    country: string | undefined;
    city: string | undefined;
    active: boolean | undefined;
    activeToken: string | undefined;
    activeExpires: Date | undefined;
    status: boolean | undefined;
    statusMessage: string | undefined;
    resetToken: string | undefined;
    resetExpires: Date | undefined;
    resetAt: Date | undefined;
    createdAt: Date | undefined;
    updatedAt: Date | undefined;
    deletedAt: Date | undefined;

    constructor(init?: Partial<UserEntity>) {
        super();
        Object.assign(this, init);
    }

    public activate(): this {
        this.active = true;
        return this;
    }

    public deActivate(): this {
        this.active = false;
        return this;
    }

    public enableStatus(): this {
        this.status = true;
        return this;
    }

    public disableStatus(): this {
        this.status = false;
        return this;
    }

    public createNow(): this {
        this.createdAt = new Date();
        return this;
    }

    public updateNow(): this {
        this.updatedAt = new Date();
        return this;
    }

    public deleteNow(): this {
        this.deletedAt = new Date();
        return this;
    }

    public resetNow(): this {
        this.resetAt = new Date();
        return this;
    }

    public resetExpiration(): this {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        this.resetExpires = tomorrow;
        return this;
    }

    public activateExpiration(): this {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        this.activeExpires = tomorrow;
        return this;
    }

    public generateRestToken(): this {
        const timestamp = Math.floor(new Date().getTime() / 1000);
        const secretKey: string = CoreConfig.jwt.secretKey;

        const hash = createHash("sha256");
        hash.update(timestamp + '|' + secretKey);
        this.resetToken =hash.toString();
        return this;
    }

    public generateActivateToken(): this {
        const timestamp = Math.floor(new Date().getTime() / 1000);
        const secretKey: string = CoreConfig.jwt.secretKey;
        const hash = createHash("sha256");
        hash.update(timestamp + '|' + secretKey);
        this.activeToken =hash.toString();
        return this;
    }

    public async generatePasswordHash(): Promise<this> {
        const salt = bcrypt.genSaltSync(10);
        if (this.password) this.password = await bcrypt.hash(this.password, salt);
        return this;
    }

    public logInMode(): this {
        const regexEmail = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
        if (!isNaN(Number(this.login))) {
            this.phone = this.login;
        } else if (regexEmail.test(this.login!)) {
            this.email = this.login;
        } else {
            this.username = this.login;
        }
        this.login = undefined;
        return this;
    }
}
