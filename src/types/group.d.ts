export interface addUserForm {
    userName: string;
    password: string;
    phone: string;
    email: string;
    department: string;
    roleId: number;
    workNumber: string;
    signTime:string;
    avatarPath?:string;
}
export interface userAuthorityDataType {
    idList:string,
    role_id:Number,
}