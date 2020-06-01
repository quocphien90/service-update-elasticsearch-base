import { Client } from '@elastic/elasticsearch';
import { BaseAddressIndex } from './entity/elasticSearch'
const elasticSearchClient = new Client({ node: process.env.ELASTIC_SEARCH_HOST });

const inserkBulkElasticSearch = (bulkAddressIndexArray: BaseAddressIndex[]) => {
    return elasticSearchClient.bulk({
        // here we are forcing an index refresh,
        // otherwise we will not get any result
        // in the consequent search
        refresh: 'true',
        body: bulkAddressIndexArray,
    });
}

const deleteElasticSearchByOutletCode = (outletCode: string, elasticIndiceName: string) => {
    return elasticSearchClient.deleteByQuery({
        index: elasticIndiceName,
        type: '_doc',
        body: {
            query: {
                match: {
                    storenumber: outletCode,
                },
            },
        },
    });
}


const deleteElasticSearchByAddressCode = (addressCode: string, elasticIndiceName: string) => {
    return elasticSearchClient.deleteByQuery({
        index: elasticIndiceName,
        type: '_doc',
        conflicts: 'proceed',
        body: {
            query: {
                match: {
                    address_code: addressCode,
                },
            },
        },
    });
}


const deleteElasticSearchByAddressCodeAndOutlet = (addressCode: string, outletCode: string, elasticIndiceName: string) => {
    return elasticSearchClient.deleteByQuery({
        index: elasticIndiceName,
        type: '_doc',
        conflicts: 'proceed',
        body: {
            query: {
                bool: {
                    must: [
                        {
                            match: {
                                storenumber: outletCode
                            }
                        },
                        {
                            match: {
                                address_code: addressCode
                            }
                        }
                    ]
                }
            }
        },
    });
}
 
const deleteElasticSearchIndexNonUseByAddressCode = (addressCode: string, elasticIndiceName: string) => {
    return elasticSearchClient.deleteByQuery({
        index: elasticIndiceName,
        type: '_doc',
        conflicts: 'proceed',
        body: {
            query: {
                bool: {
                    must: [
                        {
                            match: {
                                address_code: addressCode
                            }
                        }
                    ],
                    must_not: {
                        exists: {
                            field: "storenumber"
                        }
                    }
                }
            },
        },
    });
}

const deleteAllIndexElasticSearch = (elasticIndiceName: string) => {
    return elasticSearchClient.deleteByQuery({
        index: elasticIndiceName,
        type: '_doc',
        conflicts: 'proceed',
        body: {
            query: {
                match_all: {}
            },
        },
    });
}


export default {
    inserkBulkElasticSearch,
    deleteElasticSearchByAddressCode,
    deleteAllIndexElasticSearch,
    deleteElasticSearchByOutletCode,
    deleteElasticSearchByAddressCodeAndOutlet,
    deleteElasticSearchIndexNonUseByAddressCode
}