import { deleteClearInformationList, getAllResultPoints, getTransitDepotRouteData, getCheckErrorPoints, getClosestPoints, getErrorPoints, getInformationList, getMapData, getMapResultPoints, getRouteData, getRouteDetails, getStoreDetails, pathCalculateOne, postAddRoute, postCalculateAll, postUpdateStoreAccumulationId, calculateAll } from "@/service/modules/cluster";
import { IAccumlationInfo, IAccumulationIdInfo, IAreaDetails, ICalculateInfo, IClusterAndShopList, IErrorPoints, IHistoricalPath, IInformationList, IMapResultPoints, IMapResultSurface, IResultPoints, IRouteData, IShopData, IStoreDetails } from "@/types/cluster";
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
        MapResultPoints.value = res.data.point
        MapResultSurface.value = res.data.side
    }

    //路径计算接口
    //定义变量储存重新计算完的路径数据
    const newPathResult = ref<IRouteData[]>()
    async function pathCalculateOneAction(data: ICalculateInfo) {
        const res = await pathCalculateOne(data);
        newPathResult.value = res.data
    }

    //计算全部大区接口
    //定义变量储存重新计算完的路径数据
    const newPathResultAll = ref<IRouteData[]>()
    async function calculateAllAction(data: ICalculateInfo) {
        const res = await calculateAll(data);
        newPathResultAll.value = res.data
    }

    //路径分析获取地图数据
    //定义变量储存路径数据
    const oldPathResult = ref<IRouteData[]>()
    async function getMapDataAction() {
        const res = await getMapData();
        oldPathResult.value = res.data
    }

    //获取路线详情-大区路线聚集区详情
    //定义路线存储数据变量
    const routeDetails = ref<IAreaDetails[]>()
    async function getRouteDetailsAction() {
        const res = await getRouteDetails();
        routeDetails.value = res.data
    }

    //获取路线详情-聚集区下商户信息
    //定义变量商户信息
    const storeResult = ref<IStoreDetails[]>()
    async function getStoreDetailsAction(data: string) {
        const res = await getStoreDetails(data);
        storeResult.value = res.data
    }

    //获取路径分析-大区历史路径数据
    //定义变量存储历史路径数据
    const historicalPath = ref<IHistoricalPath[]>()
    async function getTransitDepotRouteDataAction() {
        const res = await getTransitDepotRouteData();
        historicalPath.value = res.data
    }

    //保存路径
    async function postAddRouteAction(data: IRouteData[]) {
        const res = await postAddRoute(data);
        if (res.code === 200) {
            ElMessage.success(res.msg);
        }
        console.log(res);
    }

    //获取路径分析详细数据
    //定义变量存储正在分析的路径数据
    const analysisRouteData = ref<IRouteData>()
    async function getRouteDataAction(data:IRouteData) {
        const res = await getRouteData(data);
        console.log(res);
        if (res.code === 200) {
            ElMessage.success(res.msg);
        }else if (res.code !== 500 ) {
            ElMessage.error("失败");
        }
        analysisRouteData.value = res.data
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
        calculateAllAction,
        newPathResultAll,
        getMapDataAction,
        oldPathResult,
        getRouteDetailsAction,
        routeDetails,
        newPathResult,
        getStoreDetailsAction,
        storeResult,
        getTransitDepotRouteDataAction,
        historicalPath,
        postAddRouteAction,
        getRouteDataAction,
        analysisRouteData,
    }
})