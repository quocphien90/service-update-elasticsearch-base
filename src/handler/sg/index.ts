import BaseHandler from '../index';
import { elasticSearchService, mappingsService } from '../../services'
import { EleasticSearchIndex } from '../../common/interfaces';
import { SingaporeAddressIndex } from '../../repositories/entity/elasticSearch'
import { Mappings} from '../../repositories/entity/mappings'
export default class SingaporeHandler extends BaseHandler {
    public elasticSearchIndiceName: string;
    constructor(clientId: number) {
        super(clientId);
        this.elasticSearchIndiceName = EleasticSearchIndex.SINGAPORE;
    }
    public proccessUpdateElasticSearch(outletCodeArray?: string[]) {
        return elasticSearchService.deleteOldAllIndexElasticSearch(this.elasticSearchIndiceName).then(() => {
            return this.prepareMappingDataForIndexing();
        }).then((addressIndexArray) => {
            if (addressIndexArray.length > 0) {
                return elasticSearchService.createIndexElasticSearchSplitBulk(addressIndexArray, this.elasticSearchIndiceName);
            } else {
                console.log('Not found any data to index ElasticSearch')
            }
        });
    }

    public async prepareMappingDataForIndexing(): Promise<SingaporeAddressIndex[]> {
        const addressIndexArray: SingaporeAddressIndex[] = [];
        const allMappingsRecords = await mappingsService.findAllMappings(this.clientId);
        for (const mappingRecord of allMappingsRecords) {
            const addressIndexModel = this.buildAddressIndexModel(mappingRecord);
            console.log('New address Index:  ' + JSON.stringify(addressIndexModel))
            addressIndexArray.push(addressIndexModel);
        }
        return addressIndexArray;
    }

    public buildAddressIndexModel(mappingRecord: Mappings): SingaporeAddressIndex {
        const { level1, level2 } = mappingRecord;
        const addressIndex: SingaporeAddressIndex = {
            id: mappingRecord.id,
            address: `${level2} ${level1}`,
            address_code: mappingRecord.address_code,
            block_no: mappingRecord.level2,
            city_name: "Singapore",
            storeid: mappingRecord.outlet_id,
            storenumber: mappingRecord.outlet_code,
            prefecture_name: "",
            villeage_name: "",
            st: null,
            custom: null,
            zip_code: mappingRecord.zip,
            street_name: level1,
        };
        return addressIndex;
    }
}
