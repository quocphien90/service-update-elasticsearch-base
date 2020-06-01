import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity('address_outlet_mappings')
@Index('outlet_code_2', ['outlet_code', 'address_code'], { unique: true })
@Index('outlet_code', ['outlet_code'])
@Index('address_code', ['address_code'])
@Index('zip_code', ['zip_code'])
@Index('web_null_flg', ['web_null_flg'])
export class AddressOutletMappings {
  @PrimaryGeneratedColumn({
    type: 'int',
    unsigned: true,
    name: 'id'
  })
  id: number;

  @Column('varchar', {
    nullable: true,
    length: 100,
    name: 'outlet_code'
  })
  outlet_code: string | null;

  @Column('varchar', {
    nullable: true,
    length: 100,
    name: 'address_code'
  })
  address_code: string | null;

  @Column('char', {
    nullable: true,
    length: 10,
    name: 'zip_code'
  })
  zip_code: string | null;

  @Column('varchar', {
    nullable: true,
    name: 'kana_address'
  })
  kana_address: string | null;

  @Column('varchar', {
    nullable: true,
    name: 'kanji_address'
  })
  kanji_address: string | null;

  @Column('varchar', {
    nullable: true,
    length: 100,
    name: 'address1_code'
  })
  address1_code: string | null;

  @Column('char', {
    nullable: true,
    length: 2,
    name: 'area_ol_flg'
  })
  area_ol_flg: string | null;

  @Column('varchar', {
    nullable: true,
    length: 100,
    name: 'area_ol_com'
  })
  area_ol_com: string | null;

  @Column('char', {
    nullable: true,
    length: 2,
    name: 'web_null_flg'
  })
  web_null_flg: string | null;

  @Column('varchar', {
    nullable: true,
    length: 100,
    name: 'kanri_setai_cnt'
  })
  kanri_setai_cnt: string | null;

  @Column('varchar', {
    nullable: true,
    length: 100,
    name: 'kyaku_cnt'
  })
  kyaku_cnt: string | null;

  @Column('varchar', {
    nullable: true,
    length: 100,
    name: 'kyogo_tenpo_vnt'
  })
  kyogo_tenpo_vnt: string | null;

  @Column('varchar', {
    nullable: true,
    length: 100,
    name: 'dlv_time'
  })
  dlv_time: string | null;

  @Column('varchar', {
    nullable: true,
    length: 100,
    name: 'map_code'
  })
  map_code: string | null;

  @Column('varchar', {
    nullable: true,
    length: 100,
    name: 'ind_name'
  })
  ind_name: string | null;

  @Column("datetime", {
    nullable: true,
    name: "start_date"
  })
  start_date: Date | null;


  @Column("datetime", {
    nullable: true,
    name: "end_date"
  })
  end_date: Date | null;
}
