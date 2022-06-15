import {EntityInterface} from "../interfaces/entity.interface.ts";

export class Entity implements EntityInterface {


    get Entity(): object | any[] {
        return Object.entries(this);
    }


}
