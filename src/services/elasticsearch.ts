import { mappingsRepo, elasticSearchRepo } from '../repositories';
import { BaseAddressIndex} from '../repositories/entity/elasticSearch'
import { AddressOutletMappings } from '../repositories/entity/address_outlet_mappings';


const deleteOldAllIndexElasticSearch = (elasticSearchIndiceName: string) => {
    return elasticSearchRepo.deleteAllIndexElasticSearch(elasticSearchIndiceName)

}



const deleteAddressIndexByAddressCode = async (addressCodeArray: string[], elasticSearchIndiceName: string) => {
    try {
        let promiseDeleteIndexesByQueryArray = [];
        console.log('------------------- Start delete old address code in ElasticSearch array addressCodeArray : ' + addressCodeArray.join(',') + '-------------------');
        const LIMIT_DELETE = 100;
        let totalDelete = 0;
        let countBulk = 1;
        for (const addressCode of addressCodeArray) {
            const promiseDeleteIndexesByQuery = elasticSearchRepo.deleteElasticSearchByAddressCode(addressCode, elasticSearchIndiceName);
            promiseDeleteIndexesByQueryArray.push(promiseDeleteIndexesByQuery);
            if (totalDelete == LIMIT_DELETE) {
                console.log('---------Start Delete Bulk ' + countBulk + '-------------------')
                await Promise.all(promiseDeleteIndexesByQueryArray);
                totalDelete = 0;
                promiseDeleteIndexesByQueryArray = [];
                countBulk++;
            }
            totalDelete++;
        }
        console.log('---------Finish Delete Bulk -' + promiseDeleteIndexesByQueryArray.length + '------------------')
        return Promise.all(promiseDeleteIndexesByQueryArray);
    } catch (e) {
        console.log(e)
        throw e;
    }
};


const deleteAddressIndexByAddressCodeAndOutlet = async (addressOutletMappings: AddressOutletMappings[], elasticSearchIndiceName: string) => {
    let promiseDeleteIndexesByQueryArray = [];
    const LIMIT_DELETE = 10;
    let totalDelete = 0;
    for (const addressMapping of addressOutletMappings) {
        const {address_code, outlet_code} = addressMapping;
        console.log('------------------- Start delete old address code in ElasticSearch ' + address_code + '-----with outlet code ' + outlet_code +'-----------------');
        const promiseDeleteIndexesByQuery = elasticSearchRepo.deleteElasticSearchByAddressCodeAndOutlet(address_code, outlet_code, elasticSearchIndiceName);
        promiseDeleteIndexesByQueryArray.push(promiseDeleteIndexesByQuery);
        if(totalDelete == LIMIT_DELETE){
            await Promise.all(promiseDeleteIndexesByQueryArray);
            totalDelete = 0;
            promiseDeleteIndexesByQueryArray = [];
        }
        totalDelete ++;
    }
    return Promise.all(promiseDeleteIndexesByQueryArray);
};

const deleteElasticSearchIndexNonUseByAddressCode = async (addressCodeArray: string[], elasticSearchIndiceName: string) => {
    let promiseDeleteIndexesByQueryArray = [];
    console.log('------------------- Start delete old address code in ElasticSearch array addressCodeArray : ' + addressCodeArray.join(',') + '-------------------');
    const LIMIT_DELETE = 10;
    let totalDelete = 0;
    for (const addressCode of addressCodeArray) {
        const promiseDeleteIndexesByQuery = elasticSearchRepo.deleteElasticSearchIndexNonUseByAddressCode(addressCode, elasticSearchIndiceName);
        promiseDeleteIndexesByQueryArray.push(promiseDeleteIndexesByQuery);
        if(totalDelete == LIMIT_DELETE){
            await Promise.all(promiseDeleteIndexesByQueryArray);
            totalDelete = 0;
            promiseDeleteIndexesByQueryArray = [];
        }
        totalDelete ++;
    }
    return Promise.all(promiseDeleteIndexesByQueryArray);
};

const deleteAddressIndexByOutletCode = async (outletCodeArray: string[], elasticSearchIndiceName: string) => {
    let promiseDeleteIndexesByQueryArray = [];
    console.log('------------------- Start delete old address code in ElasticSearch array addressCodeArray : ' + outletCodeArray.join(',') + '-------------------');
    const LIMIT_DELETE = 100;
    let totalDelete = 0;
    for (const outletCode of outletCodeArray) {
        const promiseDeleteIndexesByQuery = elasticSearchRepo.deleteElasticSearchByOutletCode(outletCode, elasticSearchIndiceName);
        promiseDeleteIndexesByQueryArray.push(promiseDeleteIndexesByQuery);
        if(totalDelete == LIMIT_DELETE){
            await Promise.all(promiseDeleteIndexesByQueryArray);
            totalDelete = 0;
            promiseDeleteIndexesByQueryArray = [];
        }
        totalDelete ++;
    }
    return Promise.all(promiseDeleteIndexesByQueryArray);
};

const createIndexElasticSearch = (addressIndexArray: BaseAddressIndex[], elasticSearchIndiceName: string) => {
    const bulkCreateIndexArray = [];
    const currentAddressIndex = { index: { _index: elasticSearchIndiceName, _type: '_doc' } };
    for (const addressIndex of addressIndexArray) {
        bulkCreateIndexArray.push(currentAddressIndex);
        bulkCreateIndexArray.push(addressIndex);
    }
    return elasticSearchRepo.inserkBulkElasticSearch(addressIndexArray);
}


const deleteElasticIndexByAddressCodeSplitBulk = async (addressCodeArray: string[], elasticSearchIndiceName: string) => {
    let promiseDeleteIndexesByQueryArray = [];
    console.log('------------------- Start delete old address code in ElasticSearch array addressCodeArray : ' + addressCodeArray.join(',') + '-------------------');
    const LIMIT_DELETE = 100;
    let totalDelete = 0;
    for (const addressCode of addressCodeArray) {
        const promiseDeleteIndexesByQuery = elasticSearchRepo.deleteElasticSearchByAddressCode(addressCode, elasticSearchIndiceName);
        promiseDeleteIndexesByQueryArray.push(promiseDeleteIndexesByQuery);
        if (totalDelete >= LIMIT_DELETE) {
            await Promise.all(promiseDeleteIndexesByQueryArray);
            totalDelete = 0;
            promiseDeleteIndexesByQueryArray = [];
        }
        totalDelete++;
    }
    return Promise.all(promiseDeleteIndexesByQueryArray);
};

const createIndexElasticSearchSplitBulk = async (addressIndexArray: BaseAddressIndex[], elasticSearchIndiceName: string) => {
    console.log('-------------------Total ' + addressIndexArray.length + ' index ElasticSearch-------------------')
    const LIMIT_INSERT_ES = 200;
    let countBulkInsert = 0;
    let countBulk = 1;
    let bulkCreateIndexArray = [];
    const currentAddressIndex = { index: { _index: elasticSearchIndiceName, _type: '_doc' } };
    for (const addressIndex of addressIndexArray) {
        bulkCreateIndexArray.push(currentAddressIndex);
        bulkCreateIndexArray.push(addressIndex);
        if (countBulkInsert === LIMIT_INSERT_ES) {
            console.log('-------------------Start save ' + countBulkInsert + ' indexes into ElasticSearch bulk num ' + countBulk + '------------------');
            await elasticSearchRepo.inserkBulkElasticSearch(bulkCreateIndexArray);
            bulkCreateIndexArray = [];
            countBulkInsert = 0;
            countBulk++
        }
        countBulkInsert++;
    }

    if (countBulkInsert > 0) {
        console.log('-------------------[End] Save the rest ' + countBulkInsert + ' indexes into ElasticSearch------------------');
        return elasticSearchRepo.inserkBulkElasticSearch(bulkCreateIndexArray);
    }
    return Promise.resolve();

};

export default {
    deleteOldAllIndexElasticSearch,
    deleteElasticIndexByAddressCodeSplitBulk,
    deleteAddressIndexByOutletCode,
    deleteAddressIndexByAddressCode,
    createIndexElasticSearch,
    createIndexElasticSearchSplitBulk,
    deleteAddressIndexByAddressCodeAndOutlet,
    deleteElasticSearchIndexNonUseByAddressCode
}