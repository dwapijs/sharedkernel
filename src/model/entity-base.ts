import { BaseEntity, Entity, PrimaryColumn } from "typeorm";
import uuidv1 from "uuid/v1";

@Entity()
export abstract class EntityBase extends BaseEntity {
    @PrimaryColumn("uuid")
    id: string;

    protected constructor() {
        super();
        this.id = uuidv1();
    }
}