/*eslint @typescript-eslint/camelcase: ["error", {properties: "never"}]*/

import {
  Column,
  Entity,
  Index,
  AfterLoad,
  PrimaryGeneratedColumn
} from 'typeorm';

@Entity('outlets')
@Index('uuid', ['uuid'], { unique: true })
@Index('active', ['active'])
@Index('lat', ['lat'])
@Index('long', ['long'])
@Index('client_id', ['client_id'])
@Index('client_id_2', ['client_id'])
@Index('code', ['code'])
@Index('zip', ['zip'])
@Index('area_code', ['area_code'])
@Index('jpchar', ['jpchar'])
@Index('owner_code', ['owner_code'])
@Index('owner_name', ['owner_name'])
@Index('email', ['email'])
@Index('from_date', ['from_date'])
@Index('to_date', ['to_date'])
export class Outlets {
  @PrimaryGeneratedColumn({
    type: 'int',
    unsigned: true,
    name: 'id'
  })
  id: number;

  @Column('int', {
    nullable: false,
    name: 'client_id'
  })
  client_id: number;

  @Column('varchar', {
    nullable: true,
    length: 10,
    name: 'zip'
  })
  zip: string | null;

  @Column('varchar', {
    nullable: false,
    unique: true,
    name: 'uuid'
  })
  uuid: string;

  @Column('varchar', {
    nullable: true,
    name: 'code'
  })
  code: string | null;

  @Column('varchar', {
    nullable: true,
    name: 'email'
  })
  email: string | null;

  @Column('text', {
    nullable: true,
    name: 'name'
  })
  name: string | null;

  @Column('text', {
    nullable: true,
    name: 'description'
  })
  description: string | null;

  @Column('text', {
    nullable: true,
    name: 'seo_description'
  })
  seo_description: string | null;

  @Column('text', {
    nullable: true,
    name: 'address'
  })
  address: string | null;

  @Column('varchar', {
    nullable: true,
    name: 'street'
  })
  street: string | null;

  @Column('double', {
    nullable: true,
    precision: 22,
    name: 'lat'
  })
  lat: number | null;

  @Column('double', {
    nullable: true,
    precision: 22,
    name: 'long'
  })
  long: number | null;

  @Column('varchar', {
    nullable: true,
    name: 'timezone'
  })
  timezone: string | null;

  @Column('text', {
    nullable: true,
    name: 'image'
  })
  image: string | null;

  @Column('varchar', {
    nullable: true,
    name: 'phone'
  })
  phone: string | null;

  @Column('int', {
    nullable: true,
    default: () => "'1'",
    name: 'tier'
  })
  tier: number | null;

  @Column('int', {
    nullable: true,
    default: () => "'1'",
    name: 'active'
  })
  active: number | null;

  @Column('varchar', {
    nullable: true,
    name: 'disposition'
  })
  disposition: string | null;

  @Column('varchar', {
    nullable: true,
    name: 'min_cart'
  })
  min_cart: string | null;

  @Column('varchar', {
    nullable: true,
    name: 'quote_time'
  })
  quote_time: string | null;

  @Column('varchar', {
    nullable: true,
    name: 'duration'
  })
  duration: string | null;

  @Column('varchar', {
    nullable: true,
    name: 'division'
  })
  division: string | null;

  @Column('text', {
    nullable: true,
    name: 'customize'
  })
  customize: string | null;

  @Column('varchar', {
    nullable: true,
    length: 100,
    name: 'area_code'
  })
  area_code: string | null;

  @Column('varchar', {
    nullable: true,
    length: 100,
    name: 'jpchar'
  })
  jpchar: string | null;

  @Column('varchar', {
    nullable: true,
    length: 100,
    name: 'owner_code'
  })
  owner_code: string | null;

  @Column('varchar', {
    nullable: true,
    name: 'owner_name'
  })
  owner_name: string | null;

  @Column('varchar', {
    nullable: true,
    name: 'fax'
  })
  fax: string | null;

  @Column('int', {
    nullable: true,
    default: () => "'0'",
    name: 'online_orders'
  })
  online_orders: number | null;

  @Column('int', {
    nullable: true,
    default: () => "'0'",
    name: 'offline_orders'
  })
  offline_orders: number | null;

  @Column('int', {
    nullable: true,
    default: () => "'0'",
    name: 'alcohol_drinks_available'
  })
  alcohol_drinks_available: number | null;

  @Column('text', {
    nullable: true,
    name: 'credit_card_accepted'
  })
  credit_card_accepted: string | null;

  @Column('text', {
    nullable: true,
    name: 'ponta_card_accepted'
  })
  ponta_card_accepted: string | null;

  @Column('text', {
    nullable: true,
    name: 'gourmet_card_accepted'
  })
  gourmet_card_accepted: string | null;

  @Column('text', {
    nullable: true,
    name: 'aggregator_accepted'
  })
  aggregator_accepted: string | null;

  @Column('text', {
    nullable: true,
    name: 'cash_accepted'
  })
  cash_accepted: string | null;

  @Column('text', {
    nullable: true,
    name: 'payment_accepted'
  })
  payment_accepted: string | null;

  @Column('double', {
    nullable: true,
    precision: 22,
    name: 'delivery_fee'
  })
  delivery_fee: number | null;

  @Column('datetime', {
    nullable: true,
    name: 'from_date',
  })
  from_date: Date | null;

  @Column('datetime', {
    nullable: true,
    name: 'to_date'
  })
  to_date: Date | null;

  @Column('datetime', {
    nullable: true,
    name: 'created_at'
  })
  created_at: Date | null;

  @Column('datetime', {
    nullable: true,
    name: 'updated_at'
  })
  updated_at: Date | null;

  @Column('int', {
    nullable: true,
    default: () => "'1'",
    name: 'is_open'
  })
  is_open: number | null;

  @Column('varchar', {
    nullable: true,
    length: 50,
    name: 'aggregator_code'
  })
  aggregator_code: string | null;

  @Column('text', {
    nullable: true,
    name: 'aggregators'
  })
  aggregators: string | null;

  @AfterLoad()
  parseJSONField() {
    if (this.min_cart != '' && this.min_cart != undefined) {
      this.min_cart = JSON.parse(this.min_cart);
    }
    if (this.quote_time != '' && this.quote_time != undefined) {
      this.quote_time = JSON.parse(this.quote_time);
    }
    if (this.address != '' && this.address != undefined) {
      this.address = JSON.parse(this.address);
    }
    if (this.name != '' && this.name != undefined) {
      this.name = JSON.parse(this.name);
    }
    if (this.duration != '' && this.duration != undefined) {
      this.duration = JSON.parse(this.duration);
    }
    if (this.division != '' && this.division != undefined) {
      this.division = JSON.parse(this.division);
    }
    if (this.customize != '' && this.customize != undefined) {
      this.customize = JSON.parse(this.customize);
    }
    if (this.payment_accepted != '' && this.payment_accepted != undefined) {
      this.payment_accepted = JSON.parse(this.payment_accepted);
    }
    if (this.disposition != '' && this.disposition != undefined) {
      this.disposition = JSON.parse(this.disposition);
    }
    if (this.aggregators != '' && this.aggregators != undefined) {
      this.aggregators = JSON.parse(this.aggregators);
    }
  }
}
