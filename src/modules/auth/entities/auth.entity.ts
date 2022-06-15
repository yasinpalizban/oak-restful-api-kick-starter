import {createHash} from "https://deno.land/std@0.97.0/hash/mod.ts";
import * as bcrypt from "https://deno.land/x/bcrypt/mod.ts";
import {Entity} from "../../shared/libraries/entity.ts";
import {CoreConfig} from "../../../core/config/core.config.ts";

export class AuthEntity extends Entity {
    id: number | undefined;
    login: string | undefined;
    username: string | undefined;
    password: string | undefined;
    email: string | undefined;
    phone: string | undefined;
    image: string | undefined;
    firstName: string | undefined;
    lastName: string | undefined;
    country: string | undefined;
    city: string | undefined;
    address: string | undefined;
    statusMessage: string | undefined;
    gender: boolean | undefined;
    status: boolean | undefined;
    active: boolean | undefined;
    activeToken: string | undefined;
    activeExpires: Date | undefined;
    resetToken: string | undefined;
    resetExpires: Date | undefined;
    resetAt: Date | undefined;
    createdAt: Date | undefined;
    updatedAt: Date | undefined;
    deletedAt: Date | undefined;
    remember: boolean | undefined;
    token: string | undefined;
    action: string | undefined;
    userAgent: string | undefined;
    ip: string | undefined;

    constructor(init?: Partial<AuthEntity>) {
        super();
        Object.assign(this, init);
        //  delete this.passwordConfirm;
    }

    public activate(): this {
        this.active = true;
        return this;
    }

    public deActivate(): this {
        this.active = false;
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
        this.resetToken = hash.toString();
        return this;
    }

    public generateActivateToken(): this {
        const timestamp = Math.floor(new Date().getTime() / 1000);
        const secretKey: string = CoreConfig.jwt.secretKey;
        const hash = createHash("sha256");
        hash.update(timestamp + '|' + secretKey);
        this.activeToken = hash.toString();

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
        return this;
    }

    public signUpMode(): this {
        const regexEmail = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
        if (!isNaN(Number(this.login))) {
            this.phone = this.login;
        } else if (regexEmail.test(this.login!)) {
            this.email = this.login;
        }
        delete this.login;

        return this;
    }
}
