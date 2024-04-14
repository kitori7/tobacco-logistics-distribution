<template>
    <div class="Shops">
        <div class="top">
            <el-select class="select" v-model="value" placeholder="全部区域" size="large" style="width: 240px">

            </el-select>
            <el-select class="select" v-model="value" placeholder="全部路线" size="large" style="width: 240px">

            </el-select>
            <el-input class="input" v-model="value" style="width: 380px" placeholder="输入关键词搜索" />
            <el-button class="btn">
                <el-icon>
                    <Search />
                </el-icon>
            </el-button>
        </div>
        <div class="second">
            <el-button class="btn">
                <el-icon>
                    <Plus />
                </el-icon>添加商铺
            </el-button>
            <el-button class="btn">
                <el-icon>
                    <Place />
                </el-icon>调整归属地
            </el-button>
            <el-button class="btn">
                <el-icon>
                    <Delete />
                </el-icon>批量删除
            </el-button>
            <el-button class="btn">
                <el-icon>
                    <EditPen />
                </el-icon>修改信息
            </el-button>
        </div>
        <div class="main">
            <el-table ref="multipleTableRef" :data="tableData" style="width: 100%"
                @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55" />
                <el-table-column label="Date" width="120">
                    <template #default="scope">{{ scope.row.date }}</template>
                </el-table-column>
                <el-table-column property="name" label="Name" width="120" />
                <el-table-column property="address" label="Address" show-overflow-tooltip />
            </el-table>
            
        </div>
    </div>
</template>
<script lang="ts" setup>
import { Search, Plus, Place, Delete, EditPen } from "@element-plus/icons-vue";
const value = ref('')
import { ElTable } from 'element-plus'
interface User {
    date: string
    name: string
    address: string
}
const multipleTableRef = ref<InstanceType<typeof ElTable>>()
const multipleSelection = ref<User[]>([])
const handleSelectionChange = (val: User[]) => {
    multipleSelection.value = val
}
const tableData: User[] = [
    {
        date: '2016-05-03',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-02',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-04',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-01',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-08',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-06',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-07',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
]
</script>
<style lang="scss" scoped>
.Shops {
    .top {
        margin: 20px 10px;

        .select {
            margin: 0 10px;
        }

        .input {
            margin: 0 10px;
        }

        .btn {
            box-sizing: border-box;
            width: 2.3vw;
            height: 4.1vh;
        }
    }

    .second {
        margin: 10px;

        .btn {
            margin: 0 10px;
            box-sizing: border-box;
            width: 6.5vw;
            height: 4.1vh;
        }
    }
    .main{
        :deep(.el-table__header th) {
            background-color: #9addf6 ;
        }
    }
}
</style>