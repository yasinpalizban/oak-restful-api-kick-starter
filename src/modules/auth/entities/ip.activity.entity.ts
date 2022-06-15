import {Entity} from "../../shared/libraries/entity.ts";

export class IpActivityEntity extends Entity {
    id: number | undefined;
    success: boolean | undefined;
    type: string | undefined;
    login: string | undefined;
    ipAddress: string | undefined;
    userAgent: string | undefined;
    userId: number | undefined;
    date: Date | undefined;


    constructor(init?: Partial<IpActivityEntity>) {
        super();
        Object.assign(this, init);

    }


}
