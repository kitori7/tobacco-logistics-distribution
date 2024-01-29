import requests from "../index";
import { IRequest } from "../request/type";
import { IAccumlationInfo, IAccumulationIdInfo, IErrorPoints, IInformationList, IMapResultPoints, IResultPoints, IShopData, ItestInformation } from "@/types/cluster";

// 获取所有聚集区及商铺点
export function getAllResultPoints() {
    return requests.get<IRequest<IResultPoints[]>>({
        timeout: 1000 * 30,
        url: "/clustercalculate/cluster/getListResultPoints",
    });
}

// 计算接口
export function postCalculateAll() {
    return requests.post<IRequest<any[]>>({
        timeout: 1000 * 60 * 4,
        url: "/clustercalculate/cluster/calculateAll",
    });
}

//检测所有大区的所有聚集区是否有错误点
export function getCheckErrorPoints() {
    return requests.get<IRequest<number>>({
        timeout: 1000 * 60,
        url: "/clustercalculate/cluster/checkErrorPoints",
    });
}

//清空修改数据信息列表哩的全部信息
export function deleteClearInformationList() {
    return requests.delete<IRequest<any[]>>({
        url: "/clustercalculate/cluster/clearInformationList",
    });
}

//获取当前商铺可调整到的聚集区（）
export function getClosestPoints(data: IShopData) {
    return requests.get<IRequest<IAccumlationInfo[]>>({
        url: `/clustercalculate/cluster/getClosestPoints?latitude=${data.latitude}&longitude=${data.longitude}`,
    });
}

//获取错误点接口
export function getErrorPoints() {
    return requests.get<IRequest<IErrorPoints[]>>({
        url: "/clustercalculate/cluster/getErrorPoints",
    });
}

//获取修改数据信息列表
export function getInformationList() {
    return requests.get<IRequest<IInformationList[]>>({
        url: "/clustercalculate/cluster/getInformationList",
    });
}

//获取地图所有商铺点()
export function getMapResultPoints() {
    return requests.get<IRequest<IMapResultPoints[]>>({
        url: "/clustercalculate/cluster/getMapResultPoints",
    });
}

//测试增删改修改数据信息
export function postTestInformation(data: ItestInformation) {
    return requests.post<IRequest<any[]>>({
        url: "/clustercalculate/cluster/testInformation",
        data,
    });
}

//聚集区微调接口（）
export function postUpdateStoreAccumulationId(data: IAccumulationIdInfo) {
    return requests.post<IRequest<any[]>>({
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        url: "/clustercalculate/cluster/updateStoreAccumulationId",
        data,
    });
}