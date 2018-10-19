import { Entity } from "typeorm";
import { EntityBase } from "./entity-base";

@Entity()
export abstract class AggregateRoot extends EntityBase {
}