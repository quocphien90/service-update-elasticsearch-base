export class BaseAddressIndex {
    id: number;
    address_code: string;          
    storeid: number;
    storenumber: string;
    prefecture_name: string;
    city_name: string;
    villeage_name: string;
    st?: string;
    custom?: string;
    address: string;
    starting_date?: Date | string;
    amend_date?: Date | string;
    zip_code: string;
}

export class JapanAddressIndex extends BaseAddressIndex {}

export class SingaporeAddressIndex extends BaseAddressIndex {
    block_no?: string;
    street_name?: string;
}
export class PhillipinesAddressIndex extends BaseAddressIndex {
    block_no?: string;
    street_name?: string;
}