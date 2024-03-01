import { deleteClearInformationList, getAllResultPoints, getCheckErrorPoints, getClosestPoints, getErrorPoints, getInformationList, getMapData, getMapResultPoints, getRouteDetails, pathCalculateOne, postCalculateAll, postUpdateStoreAccumulationId } from "@/service/modules/cluster";
import { IAccumlationInfo, IAccumulationIdInfo, IAreaDetails, ICalculateInfo, IClusterAndShopList, IErrorPoints, IInformationList, IMapResultPoints, IMapResultSurface, IResultPoints, IRouteData, IShopData } from "@/types/cluster";
import { defineStore } from "pinia";

export const useClusterStore = defineStore("cluster", () => {

    //获取所有聚集区和对应商铺
    const clusterAndShopList = ref<IClusterAndShopList[]>([]);
    //获取聚集区和商铺
    const resultPoints = ref<IResultPoints[]>([]);
    async function getAllResultPointsAction() {
        const res = await getAllResultPoints();
        resultPoints.value = res.data;
        const mergedArray = resultPoints.value.reduce((result, point) => {
            const accumulation = point.accumulation;
            const existingItem = result.find(item => item.accumulation === accumulation);
            if (existingItem) {
                existingItem.son.push({ shopName: point.name });
            } else {
                result.push({ accumulation: point.accumulation, son: [{ shopName: point.name }] });
            }
            return result;
        }, clusterAndShopList.value);
        clusterAndShopList.value = mergedArray;
    }

    //计算接口
    async function postCalculateAllAction() {
        const res = await postCalculateAll();
        if (res.code === 200) {
            ElMessage.success(res.msg);
        } else {
            ElMessage.error('失败');
        }
    }

    //清空修改数据信息列表哩的全部信息
    async function deleteClearInformationListAction() {
        await deleteClearInformationList();
    }


    //定义变量修改数据信息列表
    const InformationList = ref<IInformationList[]>()
    //获取修改数据信息列表
    async function getInformationListAction() {
        const res = await getInformationList();
        InformationList.value = res.data
    }

    //定义变量聚集区错误点
    const ErrorPoints = ref<number>()
    //获取修改数据信息列表
    async function getCheckErrorPointsAction() {
        const res = await getCheckErrorPoints();
        ErrorPoints.value = res.data
        console.log(res);

    }

    //获取错误点接口
    const errorResult = ref<IErrorPoints[]>()
    // const errorPointsData = ref<IErrorPoints_data[]>();
    async function getErrorPointsAction() {
        const res = await getErrorPoints();
        errorResult.value = res.data
    }

    //获取当前商铺可调整到的聚集区
    const AccumlationInfo = ref<IAccumlationInfo[]>()
    async function getClosestPointsAction(data: IShopData) {
        const res = await getClosestPoints(data);
        AccumlationInfo.value = res.data
    }

    //获取成功的code
    const UpdateStoreAccumulationIdCode = ref<number>()
    //聚集区微调接口
    async function postUpdateStoreAccumulationIdAction(data: IAccumulationIdInfo) {
        const res = await postUpdateStoreAccumulationId(data);
        UpdateStoreAccumulationIdCode.value = res.code
        if (res.code === 200) {
            ElMessage.success(res.msg);
        } else {
            ElMessage.error('失败');
        }
    }

    //获取地图所有商铺点
    //定义变量储存数据
    const MapResultPoints = ref<IMapResultPoints[]>()
    const MapResultSurface = ref<IMapResultSurface[]>()
    async function getMapResultPointsAction() {
        const res = await getMapResultPoints();
        console.log(res);
        MapResultPoints.value = res.data.point
        MapResultSurface.value = res.data.side
    }

    //路径计算接口
    //定义变量储存重新计算完的路径数据
    const newPathResult = ref<IRouteData[]>()
    async function pathCalculateOneAction(data: ICalculateInfo) {
        const res = await pathCalculateOne(data);
        newPathResult.value = res.data
        console.log(res);

    }

    //路径分析获取地图数据
    async function getMapDataAction() {
        const res = await getMapData();
        console.log(res);
    }
    
    //获取路线详情
    //定义路线存储数据变量
    const routeDetails = ref<IAreaDetails[]>()
    async function getRouteDetailsAction() {
        const res = await getRouteDetails();
        console.log(res);
        routeDetails.value = res.data
    }

    return {
        getAllResultPointsAction,
        clusterAndShopList,
        resultPoints,
        postCalculateAllAction,
        getInformationListAction,
        InformationList,
        getCheckErrorPointsAction,
        ErrorPoints,
        deleteClearInformationListAction,
        getErrorPointsAction,
        errorResult,
        getClosestPointsAction,
        AccumlationInfo,
        postUpdateStoreAccumulationIdAction,
        UpdateStoreAccumulationIdCode,
        getMapResultPointsAction,
        MapResultPoints,
        MapResultSurface,
        pathCalculateOneAction,
        getMapDataAction,
        getRouteDetailsAction,
        routeDetails,
        newPathResult
    }
})