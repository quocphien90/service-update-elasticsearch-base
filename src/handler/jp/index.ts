import BaseHandler from '../index';
import { elasticSearchService, mappingsService, outletService, addressOutletMappingsService } from '../../services';
import { EleasticSearchIndex } from '../../common/interfaces'
import { JapanAddressIndex } from '../../repositories/entity/elasticSearch';
import moment from 'moment-timezone'
import { AddressOutletMappings } from '../../repositories/entity/address_outlet_mappings';

export default class JapanHandler extends BaseHandler {
    public elasticSearchIndiceName: string;
    constructor(clientId: number) {
        super(clientId);
        this.elasticSearchIndiceName = EleasticSearchIndex.JAPAN;
    }
    public proccessUpdateElasticSearch(outletCodeArray?: string[]) {
        //return this.processUpdateAllMappingsToElasticData();
        return this.deleteAllAddressIndexInAddressMappings().then(() => {
            console.log('------------------------ Finish Delete Old Address Index in Elastic Search ---------------------------------')
            return outletService.getAllOutletActive();
        }).then((outlets) => {
            const outletCodeList = outlets.map(outlet => outlet.code);
            return outletCodeList
        }).then(outletCodeList => {
            return this.processUpdateElasticSearchAllStores([outletCodeList]);
        });
    }


    protected processUpdateAllMappingsToElasticData = () => {
        return elasticSearchService.deleteOldAllIndexElasticSearch(this.elasticSearchIndiceName).then(() => {
            return mappingsService.findAllMappingsForJapan();
        }).then(allMappingsRecords => {
            return this.splitBulkUpdateElasticSearch(allMappingsRecords);
        });
    }

    protected async splitBulkUpdateElasticSearch(mappingRecordsList) {
        const LIMIT_BULK = 5000;
        let countItemBulk = 0;
        let bulkUpdateMappings = [];
        for (const mappingRecord of mappingRecordsList) {
            bulkUpdateMappings.push(mappingRecord);
            if (bulkUpdateMappings.length == LIMIT_BULK) {
                await this.updateElasticSearchEachBulk(bulkUpdateMappings);
                bulkUpdateMappings = [];
                countItemBulk = 0;
            }
            countItemBulk++;
        }
        if (countItemBulk > 0) {
            return this.updateElasticSearchEachBulk(bulkUpdateMappings);
        }
        return Promise.resolve();

    }

    protected updateElasticSearchEachBulk = (bulkMappingRecords) => {
        const addressIndexArray = this.buildAddressIndexModelList(bulkMappingRecords);
        if (addressIndexArray.length > 0) {
            return elasticSearchService.createIndexElasticSearchSplitBulk(addressIndexArray, this.elasticSearchIndiceName);
        }
        return Promise.resolve();
    }

    protected processUpdateElasticSearchAllStores = async (outletCodeList) => {
        const LIMIT_BULK = 2;
        let countBulk = 1;
        let storeCodeArray = [];
        for (const outletCode of outletCodeList) {
            storeCodeArray.push(outletCode);
            if (countBulk == LIMIT_BULK) {
                console.log('------------------- Process Update Index by Outlet Code ' + storeCodeArray.join(',') + ' in ElasticSearch -------------------');
                await this.processUpdateElasticSearchEachBulk(storeCodeArray);
                storeCodeArray = [];
                countBulk = 1;
            }
            countBulk++;
        }
        if (storeCodeArray.length > 0) {
            console.log('------------------- Process Update Index by Outlet Code ' + storeCodeArray.join(',') + ' in ElasticSearch -------------------');
            return this.processUpdateElasticSearchEachBulk(storeCodeArray)
        }
        return Promise.resolve();
    }

    protected processUpdateElasticSearchEachBulk = (outletCodeArray) => {
        return this.prepareMappingDataForIndexing(outletCodeArray).then((addressIndexArray) => {
            if (addressIndexArray.length > 0) {
                return elasticSearchService.createIndexElasticSearchSplitBulk(addressIndexArray, this.elasticSearchIndiceName);
            } else {
                console.log('Not found any data to index ElasticSearch')
            }
        });
    }

    protected deleteAllAddressIndexInAddressMappings = () => {
        return addressOutletMappingsService.findAllAddressOutletMappings().then((addressMappingsList: AddressOutletMappings[]) => {
            const addressCodeArray = [... new Set(addressMappingsList.map(addressMapping => addressMapping.address_code))];
            console.log('-------------------Total ' + addressCodeArray.length + ' Address Index to delete in ElasticSearch -------------------');
            return elasticSearchService.deleteAddressIndexByAddressCode(addressCodeArray, this.elasticSearchIndiceName);
        });
    }

    public async prepareMappingDataForIndexing(outletCodeArray?: string[]): Promise<JapanAddressIndex[] | any> {
        return mappingsService.findMappingsByOutletCodesForJapan(outletCodeArray).then((allMappingsRecords) => {
            console.log('------------------- Start build Address Index by Address Code in ElasticSearch -------------------');
            return this.buildAddressIndexModelList(allMappingsRecords);
        })
    }

    public buildAddressIndexModel(mappingRecord): JapanAddressIndex {
        const addressCode = mappingRecord.address_code;
        const outletCode = (mappingRecord.outlet_code != undefined) ? mappingRecord.outlet_code : null;
        const outletId = (mappingRecord.outlet_id != undefined) ? mappingRecord.outlet_id : null;
        const addressIndex = {
            id: 0,
            address_code: '',
            storeid: 0,
            storenumber: '',
            prefecture_name: '',
            city_name: '',
            villeage_name: '',
            st: '',
            custom: '',
            address: '',
            starting_date: '',
            amend_date: '',
            zip_code: '',
        };

        let customAddressName = '';
        if (mappingRecord.language === 'ja') {
            customAddressName = (mappingRecord.japanese_name != null) ? mappingRecord.japanese_name : '';
        } else {
            customAddressName = (mappingRecord.english_name != null) ? mappingRecord.english_name : '';
        }

        let zipCode = mappingRecord.zip;
        if (mappingRecord.active === 0 && mappingRecord.language === 'ja') {
            zipCode = mappingRecord.zip_code;
        }

        addressIndex.id = mappingRecord.id;
        addressIndex.storeid = outletId;
        addressIndex.storenumber = outletCode;
        addressIndex.address_code = addressCode;
        addressIndex.prefecture_name = mappingRecord.prefectureName;
        addressIndex.city_name = mappingRecord.cityName;
        addressIndex.villeage_name = (mappingRecord.villeageName != null) ? mappingRecord.villeageName : '';
        addressIndex.st = (mappingRecord.st != null) ? mappingRecord.st : '';
        addressIndex.custom = customAddressName;
        // Fix index
        const fromDate = mappingRecord.from_date == null ? '1970-01-01T00:00:00+00:00' : moment.tz(mappingRecord.from_date, "Asia/Ho_Chi_Minh").format("YYYY-MM-DDTHH:mm:ss") + '+00:00';
        const toDate = mappingRecord.to_date == null ? '9999-12-31T14:59:59+00:00' : moment.tz(mappingRecord.to_date, "Asia/Ho_Chi_Minh").format("YYYY-MM-DDTHH:mm:ss") + '+00:00';
        addressIndex.starting_date = fromDate;
        addressIndex.amend_date = toDate;
        addressIndex.zip_code = (zipCode != null) ? zipCode : '';
        addressIndex.address = (`${addressIndex.prefecture_name.trim()} ${addressIndex.city_name.trim()} ${addressIndex.villeage_name.trim()} ${addressIndex.st.trim()}`).trim();
        console.log('New address Index: ' + JSON.stringify(addressIndex));
        return addressIndex;
    }

    public buildAddressIndexModelList(mappingRecordsList: any[]) {
        try {
            const addressIndexArray = [];
            console.log('-------------------Build address index object in ElasticSearch-------------------');
            if (mappingRecordsList.length <= 0) { return []; }
            // Loop each Mapping Records
            for (const mappingRecord of mappingRecordsList) {
                const addressIndex = this.buildAddressIndexModel(mappingRecord);
                addressIndexArray.push(addressIndex);
            }
            return addressIndexArray;
        } catch (error) {
            throw error;
        }
    };


}
