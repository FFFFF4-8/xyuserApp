/* eslint-disable  */
import VueRouter from "vue-router";
import { routes } from "../router/index";
import axios from "axios";

const router = new VueRouter({
  routes,
});

//全局修改axios属性
axios.defaults.headers.post["Content-Type"] =
  "application/octet-stream;charset=UTF-8;application/json;image/png";
// 环境切换
export const ajaxUrl =
  process.env.NODE_ENV === "development" ?
    "http:///" : '//'



// create an axios instance
// 创建一个axios实例
const service = axios.create({
  // baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  withCredentials: true,
  //请求超时时间
  // timeout: 60000, // request timeout
  timeout: 10000 * 1000, // request timeout
});

// request interceptor
//axios拦截器，拦截请求前
service.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    // do something with request error
    console.log(error); // for debug
    return Promise.reject(error);
  }
);

// response interceptor
//axios拦截器，拦截请求后
service.interceptors.response.use(
  (response) => {
    const responseCode = response.status;
    // 状态码处理
    if (responseCode == 200) {
      return Promise.resolve(response);
    } else {
      //todo
      console.log(response);
      return Promise.reject(new Error(response || "Error"));
    }
  },
  (error) => {
    //todo
    if (error.response) {
      const responseCode = error.response.status;
      switch (responseCode) {
        case 471:
        case 472:

          //todo
          break;
        case 404:
          //todo
          break;
        default:
          //todo
          break;
      }
      return Promise.reject(error.response);
    } else {
      console.log("Please check your internet connection.");
    }
  }
);

// 封装get和post方法
export function get(path, params) {
  return new Promise((resolve, reject) => {
    service
      .get(ajaxUrl + path, {
        params: params,
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.data);
      });
  });
}
export function post(path, code, params) {
  return new Promise((resolve, reject) => {
    service
      .post(ajaxUrl + path + "?txcode=" + code, params)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
// 下载文件
export function postFile(code, params) {
  let formData = new FormData();
  for (var i in params) {
    formData.append(i, params[i]);
  }
  let xhr = new XMLHttpRequest();
  xhr.open("post", ajaxUrl + "dofile?txcode=" + code, true);
  xhr.send(formData);
  xhr.responseType = "blob";
  return new Promise((resolve, reject) => {
    xhr.onload = function () {
      var blob = this.response;
      if (this.status == 200) {
        var aTag = document.createElement("a");
        let result = window.URL.createObjectURL(blob);
        if (params.flag == "1") {
          aTag.download = "导入文件.xlsx";
        } else {
          aTag.download = "操作结果.xlsx";
        }
        aTag.href = result;
        aTag.click();
      } else {
        resolve(blob);
      }
    };
  });
}
// 上传文件
export function uploadFile(path, code, params) {
  let formData = new FormData();
  for (var i in params) {
    formData.append(i, params[i]);
  }
  return new Promise((resolve, reject) => {
    service
      .post(ajaxUrl + path + "?txcode=" + code, formData)
      .then((res) => {
        resolve(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        reject(err);
        console.log(err);
      });
  });
  // let xhr = new XMLHttpRequest();
  // xhr.open("post", ajaxUrl + path + "?txcode=" + code, true);
  // xhr.send(formData);
  // return new Promise((resolve, reject) => {
  //     xhr.onload = function() {
  //         if (this.readyState == 4 && this.status == 200) {
  //             let obj = JSON.parse(this.response);
  //             resolve(obj);
  //         }
  //     }
  // });
}