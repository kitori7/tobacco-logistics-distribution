export interface addUserRuleForm {
    user_name: string;
    phone: string;
    email: string;
    department: string;
    role_id: number;
    work_number: string;
    sign_time:string;
    avatarPath?:string;
}
export interface userAuthorityDataType {
    idList:string,
    role_id:Number,
}