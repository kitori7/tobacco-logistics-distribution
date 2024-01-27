export interface IResultPoints {
    accumulation: string;
    name: string;
}

export interface IClusterAndShopList {
    accumulation: string;
    son: IShopList[];
}

export interface IShopList {
    shopName: string;
}

export interface IShopData {
    longitude: number;
    latitude: number;
    name?:string;
}
export interface IAccumlationInfo {
    accumulationId?: string;
    leaderName?: null | string;
    accumulationName: string;
    leaderPhone?: null | numbe;
    longitude?: number;
    latitude?: number;
    areaName?: string;
    createTime?: number;
    updateTime?: number;
    accumulationAddress?: string;
    delete?: boolean;
}

export interface IErrorPoints_data {
    longitude: number;
    latitude: number;
    name: string;
    son?:IErrorPoints_data[]
}

export interface IErrorPoints {
    number: number,
    accumulationName: string,
    data:IErrorPoints_data[],

}

export interface ItestInformation {
    data: string;
    managerName: string;
}

export interface IAccumulationIdInfo {
    longitude: number;
    latitude: number;
    accumulationId: string;
}

export interface IInformationList {
    name: string;
    number: number;
    data: string[];
}


export interface IMapResultPoints {
    longitude: number;
    latitude: number;
    state: string;
    name: string;
}