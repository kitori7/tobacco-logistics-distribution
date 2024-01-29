import { deleteClearInformationList, getAllResultPoints, getCheckErrorPoints, getClosestPoints, getErrorPoints, getInformationList, postCalculateAll, postUpdateStoreAccumulationId } from "@/service/modules/cluster";
import { IAccumlationInfo, IAccumulationIdInfo, IClusterAndShopList, IErrorPoints, IInformationList, IResultPoints, IShopData } from "@/types/cluster";
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

    //获取错误点接口（）
    const errorResult = ref<IErrorPoints[]>()
    // const errorPointsData = ref<IErrorPoints_data[]>();
    async function getErrorPointsAction() {
        const res = await getErrorPoints();
        errorResult.value = res.data
    }

    //获取当前商铺可调整到的聚集区（）
    const AccumlationInfo = ref<IAccumlationInfo[]>()
    async function getClosestPointsAction(data: IShopData) {
        const res = await getClosestPoints(data);
        AccumlationInfo.value = res.data
    }

    //获取成功的code
    const  UpdateStoreAccumulationIdCode = ref<number>()
    //聚集区微调接口
    async function postUpdateStoreAccumulationIdAction(data: IAccumulationIdInfo) {
        const res = await postUpdateStoreAccumulationId(data);
        UpdateStoreAccumulationIdCode.value= res.code
        if (res.code === 200) {
            ElMessage.success(res.msg);
        } else {
            ElMessage.error('失败');
        }
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
        UpdateStoreAccumulationIdCode
    }
})