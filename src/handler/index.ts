
export default class BaseHandler {
  protected clientId: number;
  public elasticSearchIndiceName: string;
  constructor(clientId: number) {
    this.clientId = clientId;
  }

  public proccessUpdateElasticSearch(outletCodeArray?: string[]) {

  }
  public prepareMappingDataForIndexing() {

  }

  public buildAddressIndexModel(mappingRecord: any) {

  }
}
