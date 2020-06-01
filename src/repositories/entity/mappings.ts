import { Column, Entity, Index, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import "reflect-metadata";
import {Outlets} from "./outlets";

@Entity("mappings")
@Index("client_id", ["client_id",])
@Index("outlet_id", ["outlet_id",])
@Index("zip", ["zip",])
@Index("level1", ["level1",])
@Index("level2", ["level2",])
@Index("level3", ["level3",])
@Index("level4", ["level4",])
@Index("level5", ["level5",])
@Index("active", ["active",])
@Index("address_code", ["address_code",])
@Index("language", ["language",])
export class Mappings {
    @PrimaryGeneratedColumn({
        type: "int",
        unsigned: true,
        name: "id"
    })
    id: number;


    @Column("char", {
        nullable: true,
        length: 10,
        name: "zip"
    })
    zip: string | null;


    @Column("int", {
        nullable: true,
        name: "client_id"
    })
    client_id: number | null;


    @Column("varchar", {
        nullable: true,
        name: "level1"
    })
    level1: string | null;


    @Column("varchar", {
        nullable: true,
        name: "level2"
    })
    level2: string | null;


    @Column("varchar", {
        nullable: true,
        name: "level3"
    })
    level3: string | null;


    @Column("varchar", {
        nullable: true,
        name: "level4"
    })
    level4: string | null;


    @Column("varchar", {
        nullable: true,
        name: "level5"
    })
    level5: string | null;


    @Column("varchar", {
        nullable: true,
        name: "level6"
    })
    level6: string | null;


    @Column("text", {
        nullable: true,
        name: "level7"
    })
    level7: string | null;


    @Column("datetime", {
        nullable: true,
        name: "from_date"
    })
    from_date: Date | null;


    @Column("datetime", {
        nullable: true,
        name: "to_date"
    })
    to_date: Date | null;


    @Column("int", {
        nullable: true,
        name: "outlet_id"
    })
    outlet_id: number | null;


    @Column("varchar", {
        nullable: true,
        length: 100,
        name: "outlet_code"
    })
    outlet_code: string | null;


    @Column("varchar", {
        nullable: true,
        length: 100,
        name: "address_code"
    })
    address_code: string | null;


    @Column("datetime", {
        nullable: true,
        name: "created_at"
    })
    created_at: Date | null;


    @Column("datetime", {
        nullable: true,
        name: "updated_at"
    })
    updated_at: Date | null;


    @Column("int", {
        nullable: true,
        default: () => "'1'",
        name: "active"
    })
    active: number | null;


    @Column("varchar", {
        nullable: true,
        length: 3,
        name: "language"
    })
    language: string | null;

}
