import { Index, Entity, PrimaryColumn, PrimaryGeneratedColumn, Column, OneToOne, OneToMany, ManyToOne, ManyToMany, JoinColumn, JoinTable, RelationId } from "typeorm";


@Entity("comment_master", { schema: "pizzahut_jp" })
@Index("outlet_code", ["outlet_code",])
@Index("address_code", ["address_code",])
export class comment_master {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column("varchar", {
        nullable: true,
        length: 255,
        name: "outlet_code"
    })
    outlet_code: string | null;


    @Column("varchar", {
        nullable: true,
        length: 255,
        name: "address_code"
    })
    address_code: string | null;


    @Column("varchar", {
        nullable: true,
        length: 255,
        name: "ja"
    })
    ja: string | null;


    @Column("varchar", {
        nullable: true,
        length: 255,
        name: "en"
    })
    en: string | null;

}
