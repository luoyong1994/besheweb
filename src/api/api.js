/* eslint-disable */
import {
  get,
  post
} from './http'

//封装请求方法

export const queryUser = data=>post("user/queryUser.do",data);
export const updateUser = data =>post("user/updateUser.do", data);
export const deleteUser = data => post("user/deleteUser.do", data);
export const addView = data =>post("view/addView.do",data);
export const queryView = data =>post("view/queryView.do",data)
export const deleteView = data => post("view/deleteView.do", data);
export const updateView = data =>post("view/updateView.do", data);


export const queryUsers = data => post("user/queryUsers.do", data);
export const addUser = data=>post("user/addUser.do",data);

//分类操作
export const addClassify = data => post("classify/add.do", data);
export const upateClassify = data => post("classify/update.do", data);
export const deleteClassify = data => post("classify/delete.do", data);
export const queryClassify = data => post("classify/query.do", data);

//订单操作
export const addOrder = data => post("order/add.do", data);
//订单操作
export const queryOrderInfo = data => post("queryOrder/queryOrderInfo.do", data);
export const queryAcceptOrder =data =>post("queryOrder/queryAcceptFlow.do",data);
export const deleteAcceptOrder =data =>post("queryOrder/deleteAcceptFlow.do",data);
export const authedAcceptFlow =data =>post("queryOrder/authedAcceptFlow.do",data);
export const updateInOrder =data =>post("queryOrder/updateInOrder.do",data);

//custer操作
export const queryCustomerOrderInfo = data =>post("customer/queryOrderInfo.do",data);
export const queryOrderDetailById = data =>post("customer/queryOrderDetail.do",data);
export const addAcceptOrderFlow =data =>post("customer/addAcceptOrderFlow.do",data);

//登录
export const signIn =data =>post("user/signIn.do",data);

export const addOutSource = data=>post("order/addOutsource.do",data);

export const queryOrderAllDetail = data=>post("order/queryOrderAllDetail.do",data);

export const orderBill = data=>post("order/orderBill.do",data);
