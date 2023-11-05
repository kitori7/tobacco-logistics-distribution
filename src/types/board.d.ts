export interface IBoardSearchData {
  /**
   * 大区名称
   */
  areaName?: string;
  /**
   * 客户名称
   */
  contactName?: string;
  /**
   * 客户编码
   */
  customerCode?: string;
  /**
   * 异常信息状态 不给是全部 0：未处理；1：处理中；2：已处理；3：无需处理
   */
  feedbackStatus?: string;
  /**
   * 异常信息类型 1：物流反馈；2：营销反馈
   */
  feedbackType: string;
  /**
   * 订单终止日期
   */
  orderEndDate?: string;
  /**
   * 订单起始日期
   */
  orderStartDate?: string;
  /**
   * 当前页码
   */
  pageNum: number;
  /**
   * 页记录数
   */
  pageSize: number;
  /**
   * 路线id
   */
  routeId?: number;
  [property: string]: any;
}

export interface IBoard {
  currentPageNum: number;
  dataCurrentPage: IBoardItem[];
  pageSize: number;
  totalCount: number;
  totalPageNum: number;
}

export interface IBoardItem {
  feedbackId: number;
  routeName: string;
  deliveryName: string;
  customerManagerName: string;
  feedbackInformation: string;
  customerCode: string;
  storeName: string;
  contactName: string;
  storeAddress: string;
  areaName: string;
  orderDate: string;
  feedbackFileList: Array;
  feedbackStatus: string;
}
