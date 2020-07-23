import BaseHandler from '../index';
import {PhillipinesAddressIndex, SingaporeAddressIndex} from '../../repositories/entity/elasticSearch';
import { Mappings } from '../../repositories/entity/mappings';
import {EleasticSearchIndex} from "../../common/interfaces";
import {elasticSearchService, mappingsService} from "../../services";

export default class PhillipinesHandler extends BaseHandler {
    public elasticSearchIndiceName: string;
    constructor(clientId: number) {
        super(clientId);
        this.elasticSearchIndiceName = EleasticSearchIndex.PHILLIPINES;
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

    public async prepareMappingDataForIndexing(): Promise<PhillipinesAddressIndex[]> {
        const addressIndexArray: SingaporeAddressIndex[] = [];
        const allMappingsRecords = await mappingsService.findAllMappings(this.clientId);
        for (const mappingRecord of allMappingsRecords) {
            const addressIndexModel = this.buildAddressIndexModel(mappingRecord);
            console.log('New address Index:  ' + JSON.stringify(addressIndexModel))
            addressIndexArray.push(addressIndexModel);
        }
        return addressIndexArray;
    }
    public buildAddressIndexModel(mappingRecord: Mappings): PhillipinesAddressIndex {
        const { level1, level2 } = mappingRecord;
        const addressIndex: PhillipinesAddressIndex = {
            id: mappingRecord.id,
            address: `${level2} ${level1}`,
            address_code: null,
            block_no: '',
            city_name: mappingRecord.level1,
            storeid: mappingRecord.outlet_id,
            storenumber: mappingRecord.outlet_code,
            prefecture_name: "",
            villeage_name: "",
            st: null,
            custom: null,
            zip_code: "",
            street_name: mappingRecord.level2,
        };

        return addressIndex;
    }
}
