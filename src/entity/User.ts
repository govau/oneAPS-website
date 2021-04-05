import {
  Entity,
  Column,
  PrimaryColumn,
  BeforeInsert,
  BaseEntity,
} from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("users")
export class User extends BaseEntity {
  @PrimaryColumn("uuid") id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column("boolean", { default: false })
  verified: boolean;

  @Column("boolean", { default: false })
  isAdmin: Boolean;

  @BeforeInsert()
  addId() {
    this.id = uuid();
  }
}
