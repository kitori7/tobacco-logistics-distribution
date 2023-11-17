<template>
    <div class="groupSettingDialog">
        <el-dialog
            v-model="groupSettingOpen"
            width="69%"
            @close="closeGroupSetting"
            >
                <div class="groupSettingTopText">设置角色权限点：</div>
                <div class="groupSettingcontent">
                    <div class="groupSettingLeft">
                        <el-button class="groupSettingLeftButton" @click="changeRoleID(1)" >班组长权限</el-button>
                        <el-button class="groupSettingLeftButton" @click="changeRoleID(2)">送货员权限</el-button>
                        <el-button class="groupSettingLeftButton" @click="changeRoleID(3)">市场经理权限</el-button>
                        <el-button class="groupSettingLeftButton" @click="changeRoleID(4)">客户专员权限</el-button>
                        <el-button class="groupSettingLeftButton" @click="changeRoleID(5)">领导权限</el-button>
                    </div>
                    <div class="groupSettingRight">
                        <el-transfer class="groupSettingTransfer" 
                        v-model="value" 
                        :data="data" 
                        :titles="['权限点', '该角色权限点']"
                        />
                        <div class="groupSettingRightBtn">
                            <el-button class="groupSettingRightCancel" @click="closeGroupSetting()">取消</el-button>
                            <el-button class="groupSettingRightConfirm" @click="groupSettingConfirm(userAuthorityData)">确认</el-button>
                        </div>
                    </div>
                </div>
            </el-dialog>
    </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { userAuthorityDataType } from "@/types/group";
import { useGroupStore } from "@/store/group";
const groupStore = useGroupStore();
interface Option {
    key: number
    label: string
}
const value = ref([])
const AllAuthorityList = ref()
const data = ref<Option[]>()//这个是放权限数据的

groupStore.getAllAuthorityAction()
    .then(()=>{
        AllAuthorityList.value = groupStore.AllAuthority
        const list = toRaw(AllAuthorityList.value)
        const qwe: Option[] = []
        for (let i = 0; i < list.length; i++) {
            qwe.push({
                key: list[i].operation_id,
                label: list[i].operation_name,
            })
        }  
        console.log(qwe);//qwe是需要传到data里面的
        
})


const groupSettingOpen =ref(false)
const closeGroupSetting = () =>{
    groupSettingOpen.value = false
    value.value=[]

}
defineExpose({
    groupSettingOpen
})


const changeRoleID= (e:number)=>{
    userAuthorityData.role_id = e
    console.log(userAuthorityData.role_id);
    
}
const userAuthorityData =reactive({
    idList:'',
    role_id:0,
})
const groupSettingConfirm = ( authority :userAuthorityDataType ) =>{
    const arr =Array.from(value.value);
    userAuthorityData.idList=arr.toString();
    if(userAuthorityData.role_id == 0){
        ElMessage({
        type: 'warning',
        message: '请选择要设置的角色',
        })
    }else if(userAuthorityData.idList == ''){
        ElMessage({
        type: 'warning',
        message: '该角色权限点不能为空',
        })
    }else{
        console.log(authority);
        groupStore
        .setUserAuthorityAction(authority)
        .then(()=>{
            closeGroupSetting();
        })
    }
}


</script>
<style lang="scss" scoped>

.groupSettingTopText{
    margin-left: 4.5vw;
    font-size: 25px;
}
.groupSettingcontent{
    display: flex;
    justify-content: center;
    margin-top: 20px;
    margin-bottom: 50px;
    .groupSettingLeft{
    display: flex;
    flex-direction: column;
        .groupSettingLeftButton{
            margin: 10px;
            width: 140px;
            height: 55px;
            font-size: 20px;
        }
    }
    .groupSettingRight{
        margin: 10px;
        padding: 30px;
        border: 1px solid #73e1ff;
        .groupSettingTransfer{
            margin: 10px;
        }
        .groupSettingRightBtn{
            margin-top: 30px;
            display: flex;
            justify-content: center;
            .groupSettingRightCancel,.groupSettingRightConfirm{
                font-size: 20px;
                width: 100px;
                height: 35px;
            }
        }
    }
    
}
</style>
