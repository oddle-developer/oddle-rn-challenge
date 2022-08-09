import { RESTApi } from 'lybrid-common'
import Constants from './Constants'
import Logging from './Logging'
import VersionNumber from 'react-native-version-number';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Global from 'lybrid-global'
import axios, { AxiosResponse } from 'axios'
const default_timeout = 300000;

class NetworkHelper {

  static getDefaultHeader() {
    if (Global.connected) {
      return {
        'Authorization': `${Global.token}`,
        'Accept-Language': Global.lang,
        'version': VersionNumber.appVersion,
        'os': Platform.OS,
      }
    } else {
      return {
        'Accept-Language': Global.lang,
        'version': VersionNumber.appVersion,
        'os': Platform.OS,
      }
    }
  }

  static request(url: string, options: any, timeout = default_timeout): Promise<AxiosResponse<any, any>> {

    if (Global.customServer) {
      url = url.replace(RESTApi.BASE_API, Global.customServer);
    }

    return new Promise<AxiosResponse<any, any>>((resolve, reject) => {

      Logging.log({
        type: "Request",
        url,
        options,
        timeout,
      });

      if (options.method == "GET") {
        axios.get(url, {
          headers: options.headers,
          timeout,
        }).then(response => {
          resolve(response);
        }).catch((error) => {
          if (error.response && error.response.status != 200) {
            Logging.log(error);
            Logging.log("http--error---");
            Logging.log(JSON.stringify(error));
            Logging.log("http--error---");
          }

          if (error.response) {
            resolve(error.response);
          } else {
            reject();
          }
        });
      } else if (options.method == "PATCH") {
        axios.patch(url, options.body, {
          headers: options.headers,
          timeout,
        }).then(response => {
          // Logging.log("http--response---");
          // Logging.log(response);
          // Logging.log("http--response---");
          resolve(response);
        }).catch((error) => {
          if (error.response) {
            resolve(error.response);
          } else {
            reject(error);
          }
        });
      } else if (options.method == "DELETE") {
        axios.delete(url, {
          headers: options.headers,
          timeout,
        }).then(response => {
          resolve(response);
        }).catch((error) => {
          if (error.response && error.response.status != 200) {
            Logging.log(error);
            Logging.log("http--error---");
            Logging.log(JSON.stringify(error));
            Logging.log("http--error---");
          }

          if (error.response) {
            resolve(error.response);
          } else {
            reject();
          }
        });
      } else {
        axios.post(url, options.body, {
          headers: options.headers,
          timeout,
        }).then(response => {
          // Logging.log("http--response---");
          // Logging.log(response);
          // Logging.log("http--response---");
          resolve(response);
        }).catch((error) => {
          if (error.response) {
            resolve(error.response);
          } else {
            reject(error);
          }
        });
      }
    });
  }

  static requestPostNoAuthen(url: string, params: any, headers: any = null, formData: boolean = false): Promise<AxiosResponse<any, any>> {
    if (formData == false) {
      return NetworkHelper.requestHttp('POST', url, params, headers, true)
    } else {
      return NetworkHelper.requestHttpForm('POST', url, params, headers)
    }
  }

  static requestPost(url: string, params: any, headers: any = null, formData: boolean = false): Promise<AxiosResponse<any, any>> {
    if (formData == false) {
      return NetworkHelper.requestHttp('POST', url, params, headers)
    } else {
      return NetworkHelper.requestHttpForm('POST', url, params, headers)
    }
  }

  static requestGet(url: string, headers: any = null): Promise<AxiosResponse<any, any>> {
    return NetworkHelper.requestHttp('GET', url, null, headers)
  }

  static requestPut(url: string, params: any, headers: any = null): Promise<AxiosResponse<any, any>> {
    return NetworkHelper.requestHttp('PUT', url, params, headers)
  }

  static requestPatch(url: string, params: any, headers: any = null): Promise<AxiosResponse<any, any>> {
    return NetworkHelper.requestHttp('PATCH', url, params, headers)
  }

  static requestDelete(url: string, params: any, headers: any = null): Promise<AxiosResponse<any, any>> {
    return NetworkHelper.requestHttp('DELETE', url, params, headers)
  }

  static requestHttp(method: string, url: string, params: any, headers: any, disableDefautHeader: boolean = false): Promise<AxiosResponse<any, any>> {
    return new Promise((resolve, reject) => {
      var options = disableDefautHeader ? {
        method,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          ...headers,
        }
      } : {
        method,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          ...headers,
          ...NetworkHelper.getDefaultHeader(),
        }
      }

      if (params) {
        options.body = JSON.stringify(params)
      }
      // if (headers) {
      //   options.headers = headers
      // }

      // if (__DEV__) {
      //   options.headers.Authorization = 'Bearer hihi' + Global.token + 'hihi';
      // }
      NetworkHelper.request(url, options)
        .then((response) => {
          // Alert('',response.status);
          if (response.status == 500) {
            reject();
          } else if (response.status != 401) {
            resolve(response);
          } else if (response.status == 401) {
            return response;
          } else {
            reject();
          }
        })
        .catch(reject);
    });
  }

  static requestHttpForm(method: string, url: string, params: any, headers: any): Promise<AxiosResponse<any, any>> {
    return new Promise((resolve, reject) => {

      var formData = new FormData();
      for (var k in params) {
        formData.append(k, params[k]);
      }

      var options = {
        method,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          ...headers,
          ...NetworkHelper.getDefaultHeader(),
        },
        body: formData
      }

      // if (headers) {
      //   options.headers = headers
      // }

      // if (__DEV__) {
      //   options.headers.Authorization = 'Bearer hihi' + Global.token + 'hihi';
      // }

      NetworkHelper.request(url, options)
        .then((response) => {
          // Alert('',response.status);
          if (response.status == 500) {
            reject();
          } else if (response.status != 401) {
            resolve(response);
          } else {
            reject();
          }
        })
        .catch(reject);
    });
  }

  static tryGet(url: string, headers: any = null) {
    var options = {
      method: 'GET',
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': 'Bearer ' + Global.token,
        ...headers
      }
    }

    return fetch(url, options)
  }

  static tryPost(url: string, body: any, headers: any = null) {
    var options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...NetworkHelper.getDefaultHeader(),
        ...headers,
      },
      body
    }
    return NetworkHelper.request(url, options)
  }

  static tryPostForm(url: string, body: any, headers: any = null) {
    var formData = new FormData();
    for (var k in body) {
      formData.append(k, body[k]);
    }
    var options = {
      method: 'POST',
      headers: {
        'Content-Type': 'form-data',
        ...NetworkHelper.getDefaultHeader(),
        ...headers,
      },
      body: formData
    }
    return NetworkHelper.request(url, options)
  }

}

export default NetworkHelper
