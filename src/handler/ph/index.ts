import BaseHandler from '../index';
import { PhillipinesAddressIndex } from '../../repositories/entity/elasticSearch';
import { Mappings } from '../../repositories/entity/mappings';

export default class PhillipinesHandler extends BaseHandler {

    public buildAddressIndexModel(mappingRecord: Mappings): PhillipinesAddressIndex {
        const { level1, level2 } = mappingRecord;
        const addressIndex: PhillipinesAddressIndex = {
            id: mappingRecord.id,
            address_code: null,
            storeid: mappingRecord.outlet_id,
            storenumber: mappingRecord.outlet_code,
            prefecture_name: mappingRecord.level1,
            city_name: mappingRecord.level2,
            villeage_name: null,
            st: null,
            custom: null,
            address: `${level2} ${level1}`,
            amend_date: null,
            zip_code: null
        };
        return addressIndex;
    }
}
