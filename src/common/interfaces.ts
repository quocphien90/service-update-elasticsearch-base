export interface SimpleMap {
  [k: string]: any;
}

export enum Client {
  CLIENT_JAPAN = 1,
  CLIENT_NEW_ZEALAND = 2,
  CLIENT_SINGAPORE = 3,
  CLIENT_BRASIL = 126,
  CLIENT_KUWAIT = 122,
  CLIENT_PHILLIPINES = 5
}

export enum OrderType {
  CARRYOUT = 'C',
  DELIVERY = 'D'
}

export enum EleasticSearchIndex {
  JAPAN = 'phjp',
  SINGAPORE = 'phsg',
  PHILLIPINES = 'phph'
}

export interface ResponseItem {
  item: any;
  info: any;
}

export interface ResponseItemList {
  items: any[];
  info: any;
}

export interface ResponseData {
  status: boolean;
  data?: ResponseItem | ResponseItemList;
}