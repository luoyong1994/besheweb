/* eslint-disable */
import {
  get,
  post
} from './http'

//封装请求方法
export const login = data => post("user/login.do", data);

export const queryAdmin = data => post("user/queryAdmin.do", data);

export const deleteAdmin = data => post("user/deleteAdmin.do", data);

export const addAdmin = data=>post("user/addAdmin.do",data);

export const queryUser = data=>post("user/queryUser.do",data);