/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-10 09:49:36
 * @LastEditTime: 2019-09-29 14:23:22
 * @LastEditors: Please set LastEditors
 */
import axios from 'axios'
import config from '@/config/config'
import store from '@/store'
import {Message, Loading} from 'element-ui'
const STATIC_TIMEOUT = 15000;
axios.defaults.timeout = STATIC_TIMEOUT;
axios.defaults.withCredentials = true;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8;';
axios.defaults.baseURL = config.base.ip + config.base.basicPort
axios.interceptors.request.use((config) => {
    if(String(config.url.toLowerCase()).indexOf('delete') !== -1) {//判断是否包含delete请求
        window.deleteApiOpening =  true
    }
    config.cancelToken = new axios.CancelToken(cancel => {
        window.axiosPromiseArr.push({cancel})
    })

    if (window.sessionStorage.getItem('Token') != '') { //token
        config.headers.Authorization = window.sessionStorage.getItem('Token');
    } else {
        window.location.href = 'index.html?'
    }
    if( window.sessionStorage.getItem('erpLanguage') != '') { //多语言
        config.headers['.AspNetCore.Culture'] = window.sessionStorage.getItem('erpLanguage')
    } else {
        config.headers['.AspNetCore.Culture'] = navigator.language
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});
//返回状态判断
axios.interceptors.response.use((res) => {
    window.deleteApiOpening =  false
    // return Promise.reject(res);
    return res;
}, (err) => {
    window.deleteApiOpening =  false
    if (axios.isCancel(err)) {//若路由切换后，请求取消则移除该菜单模块路由缓存
        let aliveParam = {
            flag: false,
            value: store.state.currentRouter
        }
        store.commit('set_keepAliveRouter', aliveParam);
    } else {
        //404等问题可以在这里处理
        if (err.response) {
            let error = err.error = {}
            switch (err.response.status) { // 判断后台返回的token值是否失效

            }
            return Promise.reject(err);

        } else if (err.request) {
            let {config:{timeout},request:{status}} = err
            window.deleteApiOpening =  false
            if (typeof(timeout) !== 'undefined' && parseInt(timeout) === STATIC_TIMEOUT) {
                Message.closeAll();
                Message({
                    message: "请求超时，数据加载失败，请重试！",
                    type: 'error',
                    showClose: true,
                    duration: 2 * 1000
                })
            }
            if(status === 0 && err.message === 'Network Error'){
                Message.closeAll();
                Message({
                    message: "服务器内部错误",
                    type: 'error',
                    showClose: true,
                    duration: 2 * 1000
                })
            }
            return Promise.reject(Object.assign(err.request,{
                message: err.message,
                }));
        } else {
            return Promise.reject(err.message);
        }
    }
});
export default {
    posts(url, params) {
        return new Promise((resolve, reject) => {
            axios.post(url, params)
                .then(response => {
                    resolve(response.data);
                }, err => {
                    reject(err);
                    console.log(err)
                })
                .catch((error) => {
                    reject(error)
                    console.log(error)
                })
        })
    },
    postsview(url, params) {
        return new Promise((resolve, reject) => {
            const loading = Loading.service({
                lock: true,
                text: '拼命加载中',
                spinner: 'el-icon-loading',
                background: 'rgba(250, 250, 250, 0.8)',
                target: document.querySelector('.contents')
            });
            axios.post(url, params)
                .then(response => {
                    resolve(response.data);
                    loading.close();
                }, err => {
                    reject(err);
                    console.log(err)
                    loading.close();
                })
                .catch((error) => {
                    reject(error)
                    console.log(error)
                    loading.close();
                })
        })
    },
    delBatch(url, params) {
        return new Promise((resolve, reject) => {
            const loading = Loading.service({
                lock: true,
                text: '正在删除数据',
                spinner: 'el-icon-loading',
                background: 'rgba(250, 250, 250, 0.8)',
                target: document.querySelector('.contents')
            });
            axios.post(url, params)
                .then(response => {
                    resolve(response.data);
                    loading.close();
                }, err => {
                    reject(err);
                    loading.close();
                })
                .catch((error) => {
                    reject(error);
                    loading.close();
                })
        })
    },
    saves(url, params) {//保存方法
        return new Promise((resolve, reject) => {
            const loading = Loading.service({
                lock: true,
                text: '保存中,请稍后',
                spinner: 'el-icon-loading',
                background: 'rgba(250, 250, 250, 0.8)',
                target: document.querySelector('.contents')
            });
            axios.post(url, params)
                .then(response => {
                    loading.close();
                    resolve(response.data);
                }, err => {
                    reject(err);
                    loading.close();
                })
                .catch((error) => {
                    loading.close();
                    reject(error)
                })
        })
    },
    update(url, params) {//修改方法
        return new Promise((resolve, reject) => {
            const loading = Loading.service({
                lock: true,
                text: '保存中,请稍后',
                spinner: 'el-icon-loading',
                background: 'rgba(250, 250, 250, 0.8)',
                target: document.querySelector('.contents')
            });
            axios.put(url, params)
                .then(response => {
                    loading.close();
                    resolve(response.data);
                }, err => {
                    reject(err);
                    loading.close();
                })
                .catch((error) => {
                    loading.close();
                    reject(error)
                })
        })
    },
    view(url, params) {
        return new Promise((resolve, reject) => {
            const loading = Loading.service({
                lock: true,
                text: '拼命加载中',
                spinner: 'el-icon-loading',
                background: 'rgba(250, 250, 250, 0.8)',
                target: document.querySelector('.contents')
            });
            axios.get(url, {'params': params})
                .then(response => {
                    if (response.data) {
                        resolve(response.data);
                    }
                    loading.close();
                }, err => {
                    reject(err);
                    loading.close();
                })
                .catch((error) => {
                    reject(error)
                    loading.close();
                })
        })
    },
    gets(url, params) {
        return new Promise((resolve, reject) => {
            axios.get(url, {'params': params})
                .then(response => {
                    if (response.data) {
                        resolve(response.data);
                    }
                }, err => {
                    reject(err);
                })
                .catch((error) => {
                    reject(error)
                })
        })
    },
    deletes(url, params) {
        return new Promise((resolve, reject) => {
            const loading = Loading.service({
                lock: true,
                text: '正在删除此条数据',
                spinner: 'el-icon-loading',
                background: 'rgba(250, 250, 250, 0.8)',
                target: document.querySelector('.contents')
            });
            axios.delete(url, {'params': params})
                .then(response => {
                    resolve(response.data);
                    loading.close();
                }, err => {
                    reject(err);
                    loading.close();
                })
                .catch((error) => {
                    reject(error);
                    loading.close();
                })
        })
    },
    puts(url, params) {
        return new Promise((resolve, reject) => {
            axios.put(url, params)
                .then(response => {
                    resolve(response.data);
                }, err => {
                    reject(err);
                })
                .catch((error) => {
                    reject(error)
                })
        })
    },
    instancePosts(url, params) {//登录
        var instance = axios.create({
            baseURL: config.identity.ip + config.base.identityPort
        });
        instance.defaults.headers.post['Content-Type'] = 'multipart/form-data';
        return new Promise((resolve, reject) => {
            instance.post(url, params)
                .then(response => {
                    resolve(response.data);
                }, err => {
                    reject(err);
                })
                .catch((error) => {
                    reject(error)
                })
        })
    },
    getBaseURL(baseURL) { //上传图片
       //return config.upload.ip + config.base.uploadPort
       return config.upload.ip
    },
    getWeChartBaseURL() { // 获取和设置微信baseurl
        return config.wx.ip +  config.wx.basicPort
    },
    getMallBaseUrl() {
        return config.mall.ip + config.mall.basicPort
    },
    loadImg(url, params) {//表单提交，上传图片
        var instance = axios.create({

            baseURL: config.upload.ip + config.base.uploadPort,
        });

        instance.defaults.headers.post['Content-Type'] = 'multipart/form-data';
        // console.log(axios.defaults.headers)
        return new Promise((resolve, reject) => {
            instance.post(url, params)
                .then(response => {
                    resolve(response.data);
                }, err => {
                    reject(err);
                })
                .catch((error) => {
                    reject(error)
                })
        })
    },

    uploadPhoto(url, params, callback1) {//表单提交，上传图片
        var instance = axios.create({
            // baseURL:config.upload.ip+config.base.uploadPort,
            baseURL: config.image.ip,
            onUploadProgress: function (progressEvent) { //原生获取上传进度的事件
                if (progressEvent.lengthComputable) {
                    //属性lengthComputable主要表明总共需要完成的工作量和已经完成的工作是否可以被测量
                    //如果lengthComputable为false，就获取不到progressEvent.total和progressEvent.loaded
                    callback1(progressEvent);
                }
            }
        });
        instance.defaults.headers.post['Content-Type'] = 'multipart/form-data';
        // console.log(axios.defaults.headers)
        return new Promise((resolve, reject) => {
            instance.post(url, params)
                .then(response => {
                    resolve(response.data);
                }, err => {
                    reject(err);
                })
                .catch((error) => {
                    reject(error)
                })
        })
    },
    exportExcel(url, params) {//导入文件
        var instance = axios.create();
        instance.defaults.headers.post['Content-Type'] = 'multipart/form-data';
        instance.interceptors.request.use((config) => {
            if (window.sessionStorage.getItem('Token') != '') {
                config.headers.Authorization = window.sessionStorage.getItem('Token');
            } else {
                window.location.href = 'index.html?'
            }
            return config;
        }, (error) => {
            return Promise.reject(error);
        });
        // console.log(axios.defaults.headers)
        return new Promise((resolve, reject) => {
            instance.post(url, params)
                .then(response => {
                    resolve(response.data);
                }, err => {
                    reject(err.response.data);
                })
                .catch((error) => {
                    reject(error.response.data)
                })
        })
    },
    downLoad(url, params) {
        var instance = axios.create({
            responseType: 'arraybuffer'
        });
        instance.defaults.headers.Authorization = window.sessionStorage.getItem('Token');
        return new Promise((resolve, reject) => {
            instance.get(url, {'params': params})
                .then(response => {
                    resolve(response);
                }, err => {
                    reject(err);
                })
                .catch((error) => {
                    reject(error)
                })
        })
    },
    downLoadPost(url, params) {
        var instance = axios.create({
            responseType: 'arraybuffer'
        });
        instance.defaults.headers.Authorization = window.sessionStorage.getItem('Token');
        return new Promise((resolve, reject) => {
            instance.post(url,params)
                .then(response => {
                    resolve(response);
                }, err => {
                    reject(err);
                })
                .catch((error) => {
                    reject(error)
                })
        })
    },
    // pos请求其他token时调用
    /**
     * @title post请求获取token时使用
     * @author tianbp
     * @param {string} url 请求地址 必填
     * @param {any} params  参数
     */
    POSinstancePosts(url, params) {
        var instance = axios.create({
            baseURL: config.identity.ip + config.base.identityPort
        });
        instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
        return new Promise((resolve, reject) => {
            instance.post(url, params)
                .then(response => {
                    resolve(response.data);
                }, err => {
                    reject(err);
                })
                .catch((error) => {
                    reject(error)
                })
        })
    },
    /**
     * @title post请求使用其他token时可使用
     * @author tianbp
     * @param {string} url 完整请求地址 必填
     * @param {string} tokens token 必填
     * @param {any} params  参数
     */
    POSposts(url,tokens,params) {
        var instance = axios.create();
        instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
        instance.defaults.headers.common['Authorization'] = tokens;// 添加响应拦截器
        return new Promise((resolve, reject) => {
            instance.post(url, params)
                .then(response => {
                    resolve(response);
                }, err => {
                    reject(err);
                })
                .catch((error) => {
                    reject(error)
                })
        })
    },

    /**
     * @title get请求使用其他token时可使用
     * @author tianbp
     * @param {string} url 完整请求地址 必填
     * @param {string} tokens token 必填
     * @param {any} params  参数
     */
    POSgets(url,tokens,params) {
        var instance = axios.create();
        instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
        instance.defaults.headers.common['Authorization'] = tokens;// 添加响应拦截器
        return new Promise((resolve, reject) => {
            instance.get(url, params)
                .then(response => {
                    resolve(response);
                }, err => {
                    reject(err);
                })
                .catch((error) => {
                    reject(error)
                })
        })
    },
}
