/* eslint-disable */
import {
  post,
  get

} from "./request.js";

const Api = {
  // 登录
  login(params) {
    return post("login", "login", params);
  },

};

export default Api;