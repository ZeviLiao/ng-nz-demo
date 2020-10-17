/* NUWA Cloud - Javascript SDK Version 0.0.11 */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('axios')) :
        typeof define === 'function' && define.amd ? define(['exports', 'axios'], factory) :
            (global = global || self, factory(global.nuwa = {}, global.axios));
}(this, function (exports, axios) {
    'use strict';

    axios = axios && axios.hasOwnProperty('default') ? axios['default'] : axios;

    var version = "0.0.11";

    const helper = {
        // private property
        _keyStr: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',
        // public method for encoding
        encode: (input) => {
            let output = '';
            let chr1, chr2, chr3, enc1, enc2, enc3, enc4;
            let i = 0;
            input = helper._utf8_encode(input);

            while (i < input.length) {
                chr1 = input.charCodeAt(i++);
                chr2 = input.charCodeAt(i++);
                chr3 = input.charCodeAt(i++);
                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63;

                if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
                } else if (isNaN(chr3)) {
                    enc4 = 64;
                }

                output = output +
                    helper._keyStr.charAt(enc1) + helper._keyStr.charAt(enc2) +
                    helper._keyStr.charAt(enc3) + helper._keyStr.charAt(enc4);
            }
            return output;
        },
        // public method for decoding
        decode: (input) => {
            let output = '';
            let chr1, chr2, chr3;
            let enc1, enc2, enc3, enc4;
            let i = 0;

            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, '');
            while (i < input.length) {
                enc1 = helper._keyStr.indexOf(input.charAt(i++));
                enc2 = helper._keyStr.indexOf(input.charAt(i++));
                enc3 = helper._keyStr.indexOf(input.charAt(i++));
                enc4 = helper._keyStr.indexOf(input.charAt(i++));
                chr1 = (enc1 << 2) | (enc2 >> 4);
                chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                chr3 = ((enc3 & 3) << 6) | enc4;

                output = output + String.fromCharCode(chr1);
                if (enc3 != 64) {
                    output = output + String.fromCharCode(chr2);
                }
                if (enc4 != 64) {
                    output = output + String.fromCharCode(chr3);
                }
            }
            output = helper._utf8_decode(output);
            return output;
        },
        // private method for UTF-8 encoding
        _utf8_encode: (string) => {
            string = string.replace(/\r\n/g, '\n');
            let utfText = '';

            for (let n = 0; n < string.length; n++) {
                let c = string.charCodeAt(n);
                if (c < 128) {
                    utfText += String.fromCharCode(c);
                } else if ((c > 127) && (c < 2048)) {
                    utfText += String.fromCharCode((c >> 6) | 192);
                    utfText += String.fromCharCode((c & 63) | 128);
                } else {
                    utfText += String.fromCharCode((c >> 12) | 224);
                    utfText += String.fromCharCode(((c >> 6) & 63) | 128);
                    utfText += String.fromCharCode((c & 63) | 128);
                }
            }
            return utfText;
        },
        // private method for UTF-8 decoding
        _utf8_decode: (utfText) => {
            let string = '';
            let i = 0;
            let c, c1, c2, c3;
            c = c1 = c2 = c3 = 0;

            while (i < utfText.length) {
                c = utfText.charCodeAt(i);
                if (c < 128) {
                    string += String.fromCharCode(c);
                    i++;
                } else if ((c > 191) && (c < 224)) {
                    c2 = utfText.charCodeAt(i + 1);
                    string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                    i += 2;
                } else {
                    c2 = utfText.charCodeAt(i + 1);
                    c3 = utfText.charCodeAt(i + 2);
                    string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                    i += 3;
                }
            }
            return string;
        }
    };

    const utils = {
        base64: helper
    };

    class PubSub {
        constructor() {
            this.cache = {};
            this.channel = {};
        }

        publish(topic, payload, scope = this) {
            if (this.cache[topic]) {
                let subs = this.cache[topic], i = subs.length - 1;
                console.log(subs, 'publish');
                for (i; i >= 0; i--) {
                    console.log(
                        subs[i].handler,
                        payload
                    );
                    if (subs[i]) {
                        if (typeof subs[i].handler === 'function') {
                            subs[i].handler.call(scope, payload);
                            if (subs[i].once) { // 单次
                                subs.splice(i, 1);
                            }
                        }
                    }
                }
            }
        }

        subscribe() {
            const [topic, handler, once] = Array.prototype.slice.call(arguments, 0);
            console.log('subscribe_arguments', topic, { ...arguments });
            if (!this.cache[topic]) this.cache[topic] = [];
            this.cache[topic].push({ topic, handler, once });
        }

        unsubscribe(topic, handler) {
            const targetHds = this.cache[topic];
            if (typeof handler === 'function') {
                const idx = targetHds.findIndex(tps => tps.handler === handler);
                if (idx > -1) {
                    targetHds.splice(idx, 1);
                }
            } else {
                this.cache[topic] = null;
            }
        }

        subscribeChannel(channel, handler = () => { }) {
            this.channel[channel] = handler;
        }

        unsubscribeChannel(channel) {
            console.log('退订 channel -> ', channel);
            this.channel[channel] = null;
        }
    }

    const helper$1 = {
        generator: (len, radix) => {
            let chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
            let uuid = [], i;
            radix = radix || chars.length;
            if (len) {
                for (i = 0; i < len; i++) {
                    uuid[i] = chars[0 | Math.random() * radix];
                }
            } else {
                let r;
                uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-'; uuid[14] = '4';
                for (i = 0; i < 36; i++) {
                    if (!uuid[i]) {
                        r = 0 | Math.random() * 16; uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
                    }
                }
            }
            return uuid.join('');
        }
    };

    class Request {
        async axiosAsync({ options, requestId, returnFull }) {
            console.log(`request api record - start id:[${requestId}]`, options);
            const start = new Date();

            if (options.retry) {
                axios.defaults.retry = options.retry || 3;
                axios.defaults.retryDelay = options.retryDelay || 2000;
                axios.interceptors.response.use(undefined, function axiosRetryInterceptor(err) {
                    var config = err.config;
                    if (!config || !config.retry) return Promise.reject(err);
                    config.__retryCount = config.__retryCount || 0;

                    if (config.__retryCount >= config.retry) {
                        return Promise.reject(err);
                    }

                    config.__retryCount += 1;

                    var backoff = new Promise(function (resolve) {
                        setTimeout(function () {
                            resolve();
                        }, config.retryDelay || 1);
                    });

                    return backoff.then(function () {
                        console.log(`request api record - retry id:[${requestId}] {"retryCount":${config.__retryCount}}`);
                        return axios(config);
                    });
                });
            }

            return await axios(options)
                .then(result => {
                    const responseTime = new Date() - start;
                    console.log(`request api record - end id:[${requestId}] duration:[${responseTime}ms]`, result);
                    if (returnFull === 'normal') {
                        return Promise.resolve(result);
                    }
                    if (returnFull) {
                        return Promise.resolve({
                            body: result.data,
                            statusCode: result.status,
                            headers: result.headers
                        });
                    }
                    return Promise.resolve(result.data);
                })
                .catch(err => {
                    const responseTime = new Date() - start;
                    console.log(`request api record - end id:[${requestId}] duration:[${responseTime}ms]`, err);

                    if (err.response) {
                        return Promise.reject({
                            status: err.response.status,
                            headers: err.response.headers,
                            data: err.response.data
                        });
                    }
                    return Promise.reject(err);
                });
        }
    }

    const utils$1 = { uuid: helper$1.generator };
    const request = new Request();
    const http = request.axiosAsync;

    function transportOfUnload({ topic, name, callBack, type, backOff, payload, state, timeoutCacheMark, unsubscribeMark }) {
        const message = { status: { state }, payload: payload || {} };
        //   console.log('transportOfUnload:', JSON.parse(JSON.stringify({ ...message, topic, name })));
        typeof callBack === 'function' && callBack(type, { ...message, topic, name });
        typeof backOff === 'function' && backOff({ ...message, name });
        unsubscribeMark && this.ps.unsubscribe(unsubscribeMark);
        timeoutCacheMark && this.removeTimeoutCache(timeoutCacheMark);
    }

    function cacheJudge(name, args) {
        if (this.needConnect) {
            if (this.ws.readyState !== this.ws.OPEN || !this.logined) {
                const mark = name;
                if (mark) {
                    this.addCacheSend({ message: name, args, mark });
                    return true
                }
            }
        }
    }

    const functionList = {
        codeLab: {
            rms: {
                sendFile() {
                    console.log('rms', this, 'sendFile');
                }
            },
            white: {
                sendFile() {
                    console.log('wihte', this, 'sendFile');
                }
            }
        },
        test: {
            test1: {
                sendFile(callBack) {
                    console.log('test1', this, 'sendFile', this.send);
                    callBack({ topic: '', payload: {} }); // 局部
                }
            },
            test2: {
                playFunc(callBack) {
                    console.log('test2', this, 'playFunc');
                }
            }
        },
        slide: {
            rms: {
                login() {
                    // {"cmd":"web_login","data":{"type": "codeLab/contentEditor/brainWar/slide", "webVersion": "1.2.3", "customerId":"", "requestId":"xxx" }}
                    const requestId = utils$1.uuid();
                    const { userId, customerId, webVersion, ver } = this.body;
                    console.log('slide rms', this, 'login', { userId, customerId, webVersion, ver });
                    const { sendTimeoutInterval } = this;
                    const topic = 'login', name = 'rms';
                    const callBack = this.callBack;
                    // this.connectState = 'pending'
                    // transportOfUnload.call(this, { callBack, topic, name, state: 'pending', type: 'connectStatus' })
                    let lockTimeout = false;
                    this.timeoutCache[requestId] = setTimeout(() => {
                        console.log('timeoutCache', requestId);
                        if (!lockTimeout) {
                            lockTimeout = true;
                            if (this.connectState !== 'reject') {
                                this.connectState = 'reject';
                                transportOfUnload.call(this, { callBack, topic, name, state: 'reject', type: 'connectStatus' });
                            }
                        }
                        transportOfUnload.call(this, { timeoutCacheMark: requestId, unsubscribeMark: requestId });
                    }, sendTimeoutInterval);

                    this.ps.subscribe(requestId, payload => {
                        console.log('login:', requestId, payload, payload.data);
                        if (!lockTimeout) {
                            this.connectState = 'reslove';
                            transportOfUnload.call(this, { callBack, payload, topic, name, state: 'reslove', type: 'connectStatus', unsubscribeMark: requestId, timeoutCacheMark: requestId });
                            this.callBack('connectStatus', { status: { code: this.statusCode, state: 'on' }, payload: { 'desc': 'nwk on' } });
                            this.loginedHandler();
                        } else {
                            transportOfUnload.call(this, { unsubscribeMark: requestId, timeoutCacheMark: requestId });
                        }
                    }, true);

                    this.send({
                        cmd: "web_login",
                        data: {
                            requestId: requestId,
                            userId: userId,
                            customerId: customerId,
                            webVersion: webVersion,
                            type: 'slide',
                        },
                        ver: ver
                    }, true);
                },
                async getDevice(backOff, params) {
                    const { token, customerId, ver, env } = this.body;
                    const topic = 'getDevice', name = 'rms';
                    const callBack = this.callBack;
                    const requestId = utils$1.uuid();
                    const { sendTimeoutInterval } = this;
                    transportOfUnload.call(this, { backOff, callBack, topic, name, state: 'pending', type: 'receiveData' });
                    const isCache = cacheJudge.call(this, 'getDevice', [backOff, params]);
                    if (isCache) {
                        return
                    }
                    let lockTimeout = false;
                    this.timeoutCache[requestId] = setTimeout(() => {
                        console.log('timeoutCache', requestId);
                        lockTimeout = true;
                        transportOfUnload.call(this, { callBack, backOff, topic, name, state: 'reject', type: 'receiveData', timeoutCacheMark: requestId });
                    }, sendTimeoutInterval);

                    const domain = env == 'prod' ? '' : env + '-';
                    const [data, error] = await http({
                        options: {
                            url: "https://" + domain + "api.nuwarobotics.com/" + ver + "/rms/groups",
                            method: "get",
                            headers: {
                                Authorization: 'Bearer ' + token,
                                customerid: customerId
                            },
                            params: params || {
                                limit: 20,
                                page: 1
                            }
                        }, requestId: requestId, returnFull: 'normal'
                    }).then(o => [o, null]).catch(err => [null, err]);
                    transportOfUnload.call(this, { timeoutCacheMark: requestId });
                    if (lockTimeout) {
                        return
                    }
                    if (data && data.status == 200) {
                        console.log(JSON.parse(
                            JSON.stringify(data)
                        ));
                        transportOfUnload.call(this, { callBack, payload: data.data.data, backOff, topic, name, state: 'reslove', type: 'receiveData', timeoutCacheMark: requestId });
                    } else {
                        transportOfUnload.call(this, { callBack, payload: error, backOff, topic, name, state: 'reject', type: 'receiveData', timeoutCacheMark: requestId });
                    }

                    console.log('getDevice:=> ', { data, error });
                },
                async connectDevice(backOff, { deviceIds }) {
                    console.log(deviceIds);
                    const requestId = utils$1.uuid();
                    const { customerId, clientId, ver, token } = this.body;
                    const { sendTimeoutInterval } = this;
                    const topic = 'connectDevice', name = 'rms';
                    const callBack = this.callBack;
                    let lockTimeout = false;
                    this.timeoutCache[requestId] = setTimeout(() => {
                        console.log('timeoutCache', requestId);
                        lockTimeout = true;
                        transportOfUnload.call(this, { callBack, backOff, topic, name, state: 'reject', type: 'receiveData', timeoutCacheMark: requestId });
                    }, sendTimeoutInterval);
                    const [data, error] = await this.api.addDevices({
                        headers: { Authorization: "Bearer " + token, customerid: customerId },
                        body: { sessionToken: token, deviceIds }
                    }).then(o => [o, null]).catch(err => [null, err]);
                    console.log('addDevices', [data, error]);
                    if (!lockTimeout) {
                        if (error) {
                            transportOfUnload.call(this, { payload: error, callBack, backOff, topic, name, state: 'reject', type: 'receiveData', timeoutCacheMark: requestId });
                            return
                        } else {
                            transportOfUnload.call(this, { timeoutCacheMark: requestId });
                        }
                    } else {
                        transportOfUnload.call(this, { timeoutCacheMark: requestId });
                    }
                    this.timeoutCache[requestId] = setTimeout(() => {
                        console.log('timeoutCache', requestId);
                        lockTimeout = true;
                        transportOfUnload.call(this, { callBack, backOff, topic, name, state: 'reject', type: 'receiveData', timeoutCacheMark: requestId });
                    }, sendTimeoutInterval);

                    const [data2, error2] = await this.api.getCurrentDevices({
                        headers: { Authorization: "Bearer " + token, customerid: customerId },
                        query: { sessionToken: token }
                    }).then(o => [o, null]).catch(err => [null, err]);
                    if (!lockTimeout) {
                        if (error2) {
                            transportOfUnload.call(this, { payload: error2, callBack, backOff, topic, name, state: 'reject', type: 'receiveData', timeoutCacheMark: requestId });
                            return
                        } else {
                            transportOfUnload.call(this, { payload: data2, callBack, backOff, topic, name, state: 'reslove', type: 'receiveData', timeoutCacheMark: requestId });
                        }
                    } else {
                        transportOfUnload.call(this, { timeoutCacheMark: requestId });
                    }
                    console.log('getCurrentDevices', [data2, error2]);
                },
                async sendFile(backOff, params) {
                    const { token, customerId, clientId, env, ver } = this.body;
                    console.log('sendFile', params, http);
                    const requestId = utils$1.uuid();
                    const topic = 'sendFile', name = 'rms';
                    const callBack = this.callBack;

                    transportOfUnload.call(this, { backOff, callBack, topic, name, state: 'pending', type: 'receiveData' });
                    const isCache = cacheJudge.call(this, 'sendFile', [backOff, params]);
                    if (isCache) {
                        return
                    }
                    let lockTimeout = false;
                    const { sendTimeoutInterval } = this;

                    this.timeoutCache[requestId] = setTimeout(() => {
                        console.log('timeoutCache', requestId);
                        if (!lockTimeout) {
                            lockTimeout = true;
                            transportOfUnload.call(this, { callBack, backOff, topic, name, state: 'reject', type: 'receiveData', unsubscribeMark: requestId, timeoutCacheMark: requestId });
                        }
                    }, sendTimeoutInterval);
                    let result = [], resloveCount = 0, rejectCount = 0;
                    this.ps.subscribe(requestId, payload => {
                        console.log("set_slide_install:", payload, requestId, lockTimeout);
                        if (!lockTimeout) {

                            if (payload.cmd === 'slide_install_result') {
                                if (payload.data.result) {
                                    resloveCount++;
                                    if (resloveCount >= result.filter(item => item.status === 'active').length) {
                                        lockTimeout = true;
                                        transportOfUnload.call(this, { callBack, payload, backOff, topic, name, state: 'reslove', type: 'receiveData', unsubscribeMark: requestId, timeoutCacheMark: requestId });
                                    }
                                } else {
                                    rejectCount++;
                                    if (!result.length || rejectCount >= result.length) {
                                        lockTimeout = true;
                                        transportOfUnload.call(this, { callBack, backOff, topic, name, state: 'reject', type: 'receiveData', unsubscribeMark: requestId, timeoutCacheMark: requestId });
                                    }
                                }
                            }

                            if (payload.cmd === 'set_slide_install') {
                                result = JSON.parse(JSON.stringify(payload.data.result));
                                console.log('zevi_rms', payload.data)
                                rejectCount = result.filter(item => item.status === 'offline').length;
                                if (!result.length || result.length === rejectCount) {
                                    console.log('timeoutCache', requestId);
                                    lockTimeout = true;
                                    transportOfUnload.call(this, { callBack, backOff, topic, name, state: 'reject', type: 'receiveData', unsubscribeMark: requestId, timeoutCacheMark: requestId });
                                }
                                else{
                                    transportOfUnload.call(this, { callBack, payload, backOff, topic, name, state: 'reslove', type: 'receiveData', unsubscribeMark: requestId, timeoutCacheMark: requestId });
                                }
                            }
                            // if (!lockTimeout) {
                            //     transportOfUnload.call(this, { callBack, payload, backOff, topic, name, state: 'pending', type: 'receiveData', unsubscribeMark: requestId, timeoutCacheMark: requestId });
                            // }
                        } else {
                            transportOfUnload.call(this, { timeoutCacheMark: requestId, unsubscribeMark: requestId, });
                        }
                    });
                    const { to, url } = params
                    // {"cmd":"set_slide_install","data":{"url":"xxx.zip", "project": {}, "projectId":"xxx", "lastUpdateTime": 123456, "from":"server","to":["ooo", "xxxx"], "requestId": "xxx", "projectName":"xxx" }}
                    let cmd = {
                        cmd: "set_slide_install",
                        data: {
                            from: "server",
                            requestId: requestId,
                            to, url
                            // to: robotClientIds,
                            // url: destinationName,
                            // md5, size
                            // clientId: clientId
                        }
                    }
                    
                    this.send({
                        cmd: "set_slide_install",
                        data: {
                            from: "server",
                            requestId: requestId,
                            to, url
                            // to: robotClientIds,
                            // url: destinationName,
                            // md5, size
                            // clientId: clientId
                        }
                    }, true);

                    // this.send({
                    //     "cmd": "set_slide_install",
                    //     "data": {
                    //       "projectId": 2,
                    //       "lastUpdateTime": 123456,
                    //       "from": "server",
                    //       "requestId": "xxx",
                    //       "projectName": "xxx",
                    //       ...params
                    //     }
                    //   }, true);
                    console.log('slide rms', cmd, 'sendFile');
                },
            },
            white: {
                login() {
                    console.log('brainWar wihte', this, 'login');
                    const requestId = utils$1.uuid();
                    const { userId, customerId, webVersion, ver } = this.body;
                    const { sendTimeoutInterval } = this;
                    const topic = 'login', name = 'white';
                    const callBack = this.callBack;
                    // this.connectState = 'pending'
                    // transportOfUnload.call(this, { callBack, topic, name, state: 'pending', type: 'connectStatus' })
                    let lockTimeout = false;
                    this.timeoutCache[requestId] = setTimeout(() => {
                        console.log('timeoutCache', requestId);
                        if (!lockTimeout) {
                            lockTimeout = true;
                            if (this.connectState !== 'reject') {
                                this.connectState = 'reject';
                                transportOfUnload.call(this, { name, callBack, topic, state: 'reject', type: 'connectStatus' });
                            }
                        }
                        transportOfUnload.call(this, { timeoutCacheMark: requestId, unsubscribeMark: requestId });
                    }, sendTimeoutInterval);

                    this.ps.subscribe(requestId, payload => {
                        console.log('login:', requestId, payload, payload.data);
                        if (!lockTimeout) {
                            this.setState({ clientId: payload.data.clientId }, 'body');
                            transportOfUnload.call(this, { name, callBack, payload, topic, state: 'reslove', type: 'connectStatus', unsubscribeMark: requestId, timeoutCacheMark: requestId });
                            this.connectState = 'reslove';
                            this.callBack('connectStatus', { status: { code: this.statusCode, state: 'on' }, payload: { 'desc': 'nwk on' } });
                            this.loginedHandler();
                        } else {
                            transportOfUnload.call(this, { unsubscribeMark: requestId, timeoutCacheMark: requestId });
                        }
                    }, true);

                    this.send({
                        cmd: "login",
                        data: {
                            requestId: requestId,
                            userId: userId,
                            customerId: customerId,
                            webVersion: webVersion,
                            type: 'slide',
                        },
                        ver: ver
                    }, true);
                },
                getDevice(backOff) {
                    const requestId = utils$1.uuid();
                    const { customerId, clientId, ver } = this.body;
                    const { sendTimeoutInterval } = this;
                    const topic = 'getDevice', name = 'white';
                    const callBack = this.callBack;

                    transportOfUnload.call(this, { backOff, callBack, topic, name, state: 'pending', type: 'receiveData' });
                    const isCache = cacheJudge.call(this, 'getDevice', [backOff]);
                    if (isCache) {
                        return
                    }
                    let lockTimeout = false;
                    this.timeoutCache[requestId] = setTimeout(() => {
                        lockTimeout = true;
                        console.log('timeoutCache', requestId);
                        transportOfUnload.call(this, { callBack, backOff, topic, name, state: 'reject', type: 'receiveData', unsubscribeMark: 'get_white_list', timeoutCacheMark: requestId });
                    }, sendTimeoutInterval);

                    this.ps.subscribe('get_white_list', payload => {
                        if (lockTimeout) {
                            transportOfUnload.call(this, { unsubscribeMark: 'get_white_list', timeoutCacheMark: requestId });
                            return
                        }
                        console.log('get_white_list:', payload);
                        transportOfUnload.call(this, { callBack, payload, backOff, topic, name, state: 'reslove', type: 'receiveData', unsubscribeMark: 'get_white_list', timeoutCacheMark: requestId });
                    }, true);

                    this.send({
                        cmd: "get_white_list",
                        data: {
                            clientId: clientId,
                            customerId: customerId,
                            requestId: requestId
                        },
                        ver: ver
                    }, true);
                },
                connectDevice(backOff, { robotClientIds }) {
                    // {"cmd":"set_white_list", "data":{"clientId":"xxx","to": ["robot clientId 1", "robot clientId 2"] ,"customerId":"NB123", "requestId":"xxxx"}}
                    const requestId = utils$1.uuid();
                    const { customerId, clientId, ver } = this.body;
                    const { sendTimeoutInterval } = this;
                    const topic = 'connectDevice', name = 'white';
                    const callBack = this.callBack;

                    transportOfUnload.call(this, { backOff, callBack, topic, name, state: 'pending', type: 'receiveData' });
                    const isCache = cacheJudge.call(this, 'connectDevice', [backOff]);
                    if (isCache) {
                        return
                    }
                    this.timeoutCache[requestId] = setTimeout(() => {
                        console.log('timeoutCache', requestId);
                        transportOfUnload.call(this, { callBack, backOff, topic, name, state: 'reject', type: 'receiveData', unsubscribeMark: requestId, timeoutCacheMark: requestId });
                    }, sendTimeoutInterval);

                    this.ps.subscribe(requestId, payload => {
                        console.log('get_white_list:', payload);
                        transportOfUnload.call(this, { callBack, payload, backOff, topic, name, state: 'reslove', type: 'receiveData', unsubscribeMark: requestId, timeoutCacheMark: requestId });
                    }, true);

                    this.send({
                        cmd: "set_white_list",
                        data: {
                            clientId: clientId,
                            customerId: customerId,
                            requestId: requestId,
                            to: robotClientIds
                        },
                        ver: ver
                    }, true);
                },
                async sendFile(backOff, params) {
                    const { token, customerId, clientId, env, ver } = this.body;
                    console.log('sendFile', params, http);
                    const requestId = utils$1.uuid();
                    const topic = 'sendFile', name = 'white';
                    const callBack = this.callBack;

                    transportOfUnload.call(this, { backOff, callBack, topic, name, state: 'pending', type: 'receiveData' });
                    const isCache = cacheJudge.call(this, 'sendFile', [backOff, params]);
                    if (isCache) {
                        return
                    }
                    let lockTimeout = false;
                    const { sendTimeoutInterval } = this;
                    this.timeoutCache[requestId] = setTimeout(() => {
                        console.log('timeoutCache', requestId);
                        if (!lockTimeout) {
                            lockTimeout = true;
                            transportOfUnload.call(this, { callBack, backOff, topic, name, state: 'reject', type: 'receiveData', unsubscribeMark: requestId, timeoutCacheMark: requestId });
                        } else {
                            transportOfUnload.call(this, { unsubscribeMark: requestId, timeoutCacheMark: requestId });
                        }
                    }, sendTimeoutInterval);
                    let result = [], resloveCount = 0, rejectCount = 0;
                    this.ps.subscribe(requestId, payload => {
                        console.log("set_slide_install:", payload, requestId, lockTimeout);
                        if (!lockTimeout) {

                            if (payload.cmd === 'slide_install_result') {
                                if (payload.data.result) {
                                    resloveCount++;
                                    if (resloveCount >= result.filter(item => item.status === 'active').length) {
                                        lockTimeout = true;
                                        transportOfUnload.call(this, { callBack, payload, backOff, topic, name, state: 'reslove', type: 'receiveData', unsubscribeMark: requestId, timeoutCacheMark: requestId });
                                    }
                                } else {
                                    rejectCount++;
                                    if (!result.length || rejectCount >= result.length) {
                                        lockTimeout = true;
                                        transportOfUnload.call(this, { callBack, backOff, topic, name, state: 'reject', type: 'receiveData', unsubscribeMark: requestId, timeoutCacheMark: requestId });
                                    }
                                }
                            }

                            if (payload.cmd === 'set_slide_install') {
                                result = JSON.parse(JSON.stringify(payload.data.result));
                                console.log('zevi_white', payload.data)
                                rejectCount = result.filter(item => item.status === 'offline').length;
                                if (!result.length || result.length === rejectCount) {
                                    console.log('timeoutCache', requestId);
                                    lockTimeout = true;
                                    transportOfUnload.call(this, { callBack, backOff, topic, name, state: 'reject', type: 'receiveData', unsubscribeMark: requestId, timeoutCacheMark: requestId });
                                } 
                                else{
                                    transportOfUnload.call(this, { callBack, payload, backOff, topic, name, state: 'reslove', type: 'receiveData', unsubscribeMark: requestId, timeoutCacheMark: requestId });
                                }
                            }
                            // if (!lockTimeout) {
                            //     transportOfUnload.call(this, { callBack, payload, backOff, topic, name, state: 'pending', type: 'receiveData', unsubscribeMark: requestId, timeoutCacheMark: requestId });
                            // }
                        } else {
                            transportOfUnload.call(this, { unsubscribeMark: requestId, timeoutCacheMark: requestId });
                        }
                    });
                    // {"cmd":"set_slide_install","data":{"url":"xxx.zip", "project": {}, "projectId":"xxx", "lastUpdateTime": 123456, "from":"server","to":["ooo", "xxxx"], "requestId": "xxx", "projectName":"xxx" }}
                    this.send({
                        cmd: "set_slide_install",
                        data: {
                            from: "server",
                            requestId: requestId,
                            ...params
                            // url: destinationName,
                            // to: robotClientIds,
                            // md5, size
                            // clientId: clientId
                        },
                        ver: ver
                    }, true);

                    //   console.log('slide wihte', this, 'sendFile');
                }
            }
        },
        brainWar: {
            rms: {
                login() {
                    // {"cmd":"web_login","data":{"type": "codeLab/contentEditor/brainWar/slide", "webVersion": "1.2.3", "customerId":"", "requestId":"xxx" }}
                    const requestId = utils$1.uuid();
                    const { userId, customerId, webVersion, ver } = this.body;
                    console.log('brainWar rms', this, 'login', { userId, customerId, webVersion, ver });
                    const { sendTimeoutInterval } = this;
                    const topic = 'login', name = 'rms';
                    const callBack = this.callBack;
                    // this.connectState = 'pending'
                    // transportOfUnload.call(this, { callBack, topic, name, state: 'pending', type: 'connectStatus' })
                    let lockTimeout = false;
                    this.timeoutCache[requestId] = setTimeout(() => {
                        console.log('timeoutCache', requestId);
                        if (!lockTimeout) {
                            lockTimeout = true;
                            if (this.connectState !== 'reject') {
                                this.connectState = 'reject';
                                transportOfUnload.call(this, { callBack, topic, name, state: 'reject', type: 'connectStatus' });
                            }
                        }
                        transportOfUnload.call(this, { timeoutCacheMark: requestId, unsubscribeMark: requestId });
                    }, sendTimeoutInterval);

                    this.ps.subscribe(requestId, payload => {
                        console.log('login:', requestId, payload, payload.data);
                        if (!lockTimeout) {
                            this.connectState = 'reslove';
                            transportOfUnload.call(this, { callBack, payload, topic, name, state: 'reslove', type: 'connectStatus', unsubscribeMark: requestId, timeoutCacheMark: requestId });
                            this.loginedHandler();
                        } else {
                            transportOfUnload.call(this, { unsubscribeMark: requestId, timeoutCacheMark: requestId });
                        }
                    }, true);

                    this.send({
                        cmd: "web_login",
                        data: {
                            requestId: requestId,
                            userId: userId,
                            customerId: customerId,
                            webVersion: webVersion,
                            type: 'brainWar',
                        },
                        ver: ver
                    }, true);
                },
                async getDevice(backOff, params) {
                    const { token, customerId, ver, env } = this.body;
                    const topic = 'getDevice', name = 'rms';
                    const callBack = this.callBack;
                    const requestId = utils$1.uuid();
                    const { sendTimeoutInterval } = this;
                    transportOfUnload.call(this, { backOff, callBack, topic, name, state: 'pending', type: 'receiveData' });
                    const isCache = cacheJudge.call(this, 'getDevice', [backOff, params]);
                    if (isCache) {
                        return
                    }
                    let lockTimeout = false;
                    this.timeoutCache[requestId] = setTimeout(() => {
                        console.log('timeoutCache', requestId);
                        lockTimeout = true;
                        transportOfUnload.call(this, { callBack, backOff, topic, name, state: 'reject', type: 'receiveData', timeoutCacheMark: requestId });
                    }, sendTimeoutInterval);

                    const domain = env == 'prod' ? '' : env + '-';
                    const [data, error] = await http({
                        options: {
                            url: "https://" + domain + "api.nuwarobotics.com/" + ver + "/rms/groups",
                            method: "get",
                            headers: {
                                Authorization: 'Bearer ' + token,
                                customerid: customerId
                            },
                            params: params || {
                                limit: 20,
                                page: 1
                            }
                        }, requestId: requestId, returnFull: 'normal'
                    }).then(o => [o, null]).catch(err => [null, err]);
                    transportOfUnload.call(this, { timeoutCacheMark: requestId });
                    if (lockTimeout) {
                        return
                    }
                    if (data && data.status == 200) {
                        console.log(JSON.parse(
                            JSON.stringify(data)
                        ));
                        transportOfUnload.call(this, { callBack, payload: data.data.data, backOff, topic, name, state: 'reslove', type: 'receiveData', timeoutCacheMark: requestId });
                    } else {
                        transportOfUnload.call(this, { callBack, payload: error, backOff, topic, name, state: 'reject', type: 'receiveData', timeoutCacheMark: requestId });
                    }

                    console.log('getDevice:=> ', { data, error });
                },
                async sendFile(backOff, params) {
                    const { token, customerId, clientId, env, ver } = this.body;
                    console.log('sendFile', params);
                    const requestId = utils$1.uuid();
                    const topic = 'sendFile', name = 'rms';
                    const callBack = this.callBack;

                    transportOfUnload.call(this, { backOff, callBack, topic, name, state: 'pending', type: 'receiveData' });
                    const isCache = cacheJudge.call(this, 'sendFile', [backOff, params]);
                    if (isCache) {
                        return
                    }
                    let lockTimeout = false;
                    const { sendTimeoutInterval } = this;

                    this.timeoutCache[requestId] = setTimeout(() => {
                        console.log('timeoutCache', requestId);
                        if (!lockTimeout) {
                            lockTimeout = true;
                            transportOfUnload.call(this, { callBack, backOff, topic, name, state: 'reject', type: 'receiveData', unsubscribeMark: requestId, timeoutCacheMark: requestId });
                        }
                    }, sendTimeoutInterval);
                    let result = [], resloveCount = 0, rejectCount = 0;
                    this.ps.subscribe(requestId, payload => {
                        console.log("set_brain_war_install:", payload, requestId, lockTimeout);
                        if (!lockTimeout) {

                            if (payload.cmd === 'brain_war_install_result') {
                                if (payload.data.result) {
                                    resloveCount++;
                                    if (resloveCount >= result.filter(item => item.status === 'active').length) {
                                        lockTimeout = true;
                                        transportOfUnload.call(this, { callBack, payload, backOff, topic, name, state: 'reslove', type: 'receiveData', unsubscribeMark: requestId, timeoutCacheMark: requestId });
                                    }
                                } else {
                                    rejectCount++;
                                    if (!result.length || rejectCount >= result.length) {
                                        lockTimeout = true;
                                        transportOfUnload.call(this, { callBack, backOff, topic, name, state: 'reject', type: 'receiveData', unsubscribeMark: requestId, timeoutCacheMark: requestId });
                                    }
                                }
                            }

                            if (payload.cmd === 'set_brain_war_install') {
                                result = JSON.parse(JSON.stringify(payload.data.result));
                                rejectCount = result.filter(item => item.status === 'offline').length;
                                if (!result.length || result.length === rejectCount) {
                                    console.log('timeoutCache', requestId);
                                    lockTimeout = true;
                                    transportOfUnload.call(this, { callBack, backOff, topic, name, state: 'reject', type: 'receiveData', unsubscribeMark: requestId, timeoutCacheMark: requestId });
                                }
                            }

                            if (!lockTimeout) {
                                transportOfUnload.call(this, { callBack, payload, backOff, topic, name, state: 'pending', type: 'receiveData', unsubscribeMark: requestId, timeoutCacheMark: requestId });
                            }

                        } else {
                            transportOfUnload.call(this, { timeoutCacheMark: requestId, unsubscribeMark: requestId, });
                        }
                    });
                    this.send({
                        cmd: "set_brain_war_install",
                        data: {
                            from: "server",
                            requestId: requestId,
                            ...params
                        },
                        ver: ver
                    }, true);
                    console.log('brainWar wihte', this, 'sendFile');
                },
                async connectDevice(backOff, { deviceIds }) {
                    console.log(deviceIds);
                    const requestId = utils$1.uuid();
                    const { customerId, clientId, ver, token } = this.body;
                    const { sendTimeoutInterval } = this;
                    const topic = 'connectDevice', name = 'rms';
                    const callBack = this.callBack;
                    let lockTimeout = false;
                    this.timeoutCache[requestId] = setTimeout(() => {
                        console.log('timeoutCache', requestId);
                        lockTimeout = true;
                        transportOfUnload.call(this, { callBack, backOff, topic, name, state: 'reject', type: 'receiveData', timeoutCacheMark: requestId });
                    }, sendTimeoutInterval);
                    const [data, error] = await this.api.addDevices({
                        headers: { Authorization: "Bearer " + token, customerid: customerId },
                        body: { sessionToken: token, deviceIds }
                    }).then(o => [o, null]).catch(err => [null, err]);
                    console.log('addDevices', [data, error]);
                    if (!lockTimeout) {
                        if (error) {
                            transportOfUnload.call(this, { payload: error, callBack, backOff, topic, name, state: 'reject', type: 'receiveData', timeoutCacheMark: requestId });
                            return
                        } else {
                            transportOfUnload.call(this, { timeoutCacheMark: requestId });
                        }
                    } else {
                        transportOfUnload.call(this, { timeoutCacheMark: requestId });
                    }
                    this.timeoutCache[requestId] = setTimeout(() => {
                        console.log('timeoutCache', requestId);
                        lockTimeout = true;
                        transportOfUnload.call(this, { callBack, backOff, topic, name, state: 'reject', type: 'receiveData', timeoutCacheMark: requestId });
                    }, sendTimeoutInterval);

                    const [data2, error2] = await this.api.getCurrentDevices({
                        headers: { Authorization: "Bearer " + token, customerid: customerId },
                        query: { sessionToken: token }
                    }).then(o => [o, null]).catch(err => [null, err]);
                    if (!lockTimeout) {
                        if (error2) {
                            transportOfUnload.call(this, { payload: error2, callBack, backOff, topic, name, state: 'reject', type: 'receiveData', timeoutCacheMark: requestId });
                            return
                        } else {
                            transportOfUnload.call(this, { payload: data2, callBack, backOff, topic, name, state: 'reslove', type: 'receiveData', timeoutCacheMark: requestId });
                        }
                    } else {
                        transportOfUnload.call(this, { timeoutCacheMark: requestId });
                    }
                    console.log('getCurrentDevices', [data2, error2]);
                },
            },
            white: {
                login() {
                    console.log('brainWar wihte', this, 'login');
                    const requestId = utils$1.uuid();
                    const { userId, customerId, webVersion, ver } = this.body;
                    const { sendTimeoutInterval } = this;
                    const topic = 'login', name = 'white';
                    const callBack = this.callBack;
                    // this.connectState = 'pending'
                    // transportOfUnload.call(this, { callBack, name, topic, state: 'pending', type: 'connectStatus' })
                    let lockTimeout = false;
                    this.timeoutCache[requestId] = setTimeout(() => {
                        console.log('timeoutCache', requestId);
                        if (!lockTimeout) {
                            lockTimeout = true;
                            if (this.connectState !== 'reject') {
                                this.connectState = 'reject';
                                transportOfUnload.call(this, { name, callBack, topic, state: 'reject', type: 'connectStatus' });
                            }
                        }
                        transportOfUnload.call(this, { timeoutCacheMark: requestId, unsubscribeMark: requestId });
                    }, sendTimeoutInterval);

                    this.ps.subscribe(requestId, payload => {
                        console.log('login:', requestId, payload, payload.data);
                        if (!lockTimeout) {
                            this.setState({ clientId: payload.data.clientId }, 'body');
                            transportOfUnload.call(this, { callBack, payload, name, topic: 'login', state: 'reslove', type: 'connectStatus', unsubscribeMark: requestId, timeoutCacheMark: requestId });
                            this.connectState = 'reslove';
                            this.loginedHandler();
                        } else {
                            transportOfUnload.call(this, { unsubscribeMark: requestId, timeoutCacheMark: requestId });
                        }
                    }, true);

                    this.send({
                        cmd: "login",
                        data: {
                            requestId: requestId,
                            userId: userId,
                            customerId: customerId,
                            webVersion: webVersion,
                            type: 'brainWar',
                        },
                        ver: ver
                    }, true);
                },
                getDevice(backOff) {
                    const requestId = utils$1.uuid();
                    const { customerId, clientId, ver } = this.body;
                    const { sendTimeoutInterval } = this;
                    const topic = 'getDevice', name = "white";
                    const callBack = this.callBack;

                    transportOfUnload.call(this, { backOff, callBack, name, topic, state: 'pending', type: 'receiveData' });
                    const isCache = cacheJudge.call(this, 'getDevice', [backOff]);
                    if (isCache) {
                        return
                    }
                    let lockTimeout = false;
                    this.timeoutCache[requestId] = setTimeout(() => {
                        console.log('timeoutCache', requestId);
                        if (!lockTimeout) {
                            lockTimeout = true;
                            transportOfUnload.call(this, { callBack, backOff, name, topic, state: 'reject', type: 'receiveData', unsubscribeMark: 'get_white_list', timeoutCacheMark: requestId });
                        } else {
                            transportOfUnload.call(this, { unsubscribeMark: 'get_white_list', timeoutCacheMark: requestId });
                        }
                    }, sendTimeoutInterval);

                    this.ps.subscribe('get_white_list', payload => {
                        console.log('get_white_list:', payload);
                        if (!lockTimeout) {
                            transportOfUnload.call(this, { callBack, payload, name, backOff, topic, state: 'reslove', type: 'receiveData', unsubscribeMark: 'get_white_list', timeoutCacheMark: requestId });
                        } else {
                            transportOfUnload.call(this, { unsubscribeMark: 'get_white_list', timeoutCacheMark: requestId });
                        }
                    }, true);

                    this.send({
                        cmd: "get_white_list",
                        data: {
                            clientId: clientId,
                            customerId: customerId,
                            requestId: requestId
                        },
                        ver: ver
                    }, true);
                },
                async sendFile(backOff, params) { // { projectId, robotClientIds }
                    const { token, customerId, clientId, env, ver } = this.body;
                    console.log('sendFile', params, http);
                    const requestId = utils$1.uuid();
                    const topic = 'sendFile', name = "white";
                    const callBack = this.callBack;

                    transportOfUnload.call(this, { backOff, callBack, name, topic, state: 'pending', type: 'receiveData' });
                    const isCache = cacheJudge.call(this, 'sendFile', [backOff, params]);
                    if (isCache) {
                        return
                    }
                    let lockTimeout = false;
                    const { sendTimeoutInterval } = this;
                    this.timeoutCache[requestId] = setTimeout(() => {
                        console.log('timeoutCache', requestId);
                        if (!lockTimeout) {
                            lockTimeout = true;
                            transportOfUnload.call(this, { callBack, backOff, topic, name, state: 'reject', type: 'receiveData', unsubscribeMark: requestId, timeoutCacheMark: requestId });
                        } else {
                            transportOfUnload.call(this, { timeoutCacheMark: requestId });
                        }
                    }, sendTimeoutInterval);
                    let result = [], resloveCount = 0, rejectCount = 0;
                    this.ps.subscribe(requestId, payload => {
                        console.log("set_brain_war_install:", payload, requestId, lockTimeout);
                        if (!lockTimeout) {

                            if (payload.cmd === 'brain_war_install_result') {
                                if (payload.data.result) {
                                    resloveCount++;
                                    if (resloveCount >= result.filter(item => item.status === 'active').length) {
                                        lockTimeout = true;
                                        transportOfUnload.call(this, { callBack, payload, backOff, topic, name, state: 'reslove', type: 'receiveData', unsubscribeMark: requestId, timeoutCacheMark: requestId });
                                    }
                                } else {
                                    rejectCount++;
                                    if (!result.length || rejectCount >= result.length) {
                                        lockTimeout = true;
                                        transportOfUnload.call(this, { callBack, backOff, topic, name, state: 'reject', type: 'receiveData', unsubscribeMark: requestId, timeoutCacheMark: requestId });
                                    }
                                }
                            }

                            if (payload.cmd === 'set_brain_war_install') {
                                result = JSON.parse(JSON.stringify(payload.data.result));
                                rejectCount = result.filter(item => item.status === 'offline').length;
                                if (!result.length || result.length === rejectCount) {
                                    console.log('timeoutCache', requestId);
                                    lockTimeout = true;
                                    transportOfUnload.call(this, { callBack, backOff, topic, name, state: 'reject', type: 'receiveData', unsubscribeMark: requestId, timeoutCacheMark: requestId });
                                }
                            }
                            if (!lockTimeout) {
                                transportOfUnload.call(this, { callBack, payload, name, backOff, topic, state: 'pending', type: 'receiveData', unsubscribeMark: requestId, timeoutCacheMark: requestId });
                            }
                        } else {
                            transportOfUnload.call(this, { unsubscribeMark: requestId, timeoutCacheMark: requestId });
                        }
                    });

                    this.send({
                        cmd: "set_brain_war_install",
                        data: {
                            // ...obs,
                            // to: robotClientIds,
                            ...params,
                            from: "server",
                            requestId: requestId,
                            clientId: clientId
                        },
                        ver: ver
                    }, true);

                    console.log('brainWar wihte', this, 'sendFile');
                },
                connectDevice(backOff, { robotClientIds }) {
                    // {"cmd":"set_white_list", "data":{"clientId":"xxx","to": ["robot clientId 1", "robot clientId 2"] ,"customerId":"NB123", "requestId":"xxxx"}}
                    const requestId = utils$1.uuid();
                    const { customerId, clientId, ver } = this.body;
                    const { sendTimeoutInterval } = this;
                    const topic = 'connectDevice', name = 'white';
                    const callBack = this.callBack;

                    transportOfUnload.call(this, { backOff, callBack, topic, name, state: 'pending', type: 'receiveData' });
                    const isCache = cacheJudge.call(this, 'connectDevice', [backOff]);
                    if (isCache) {
                        return
                    }
                    this.timeoutCache[requestId] = setTimeout(() => {
                        console.log('timeoutCache', requestId);
                        transportOfUnload.call(this, { callBack, backOff, topic, name, state: 'reject', type: 'receiveData', unsubscribeMark: requestId, timeoutCacheMark: requestId });
                    }, sendTimeoutInterval);

                    this.ps.subscribe(requestId, payload => {
                        console.log('get_white_list:', payload);
                        transportOfUnload.call(this, { callBack, payload, backOff, topic, name, state: 'reslove', type: 'receiveData', unsubscribeMark: requestId, timeoutCacheMark: requestId });
                    }, true);

                    this.send({
                        cmd: "set_white_list",
                        data: {
                            clientId: clientId,
                            customerId: customerId,
                            requestId: requestId,
                            to: robotClientIds
                        },
                        ver: ver
                    }, true);
                },
            }
        }
    };

    const request$1 = new Request();
    const callApiGenerator = (pool = {}, services = [], env = '') => {
        services.map((service) => {
            if (!service.url) {
                return;
            }
            Object.keys(service.url).map((api) => {
                pool[api] = async ({ headers, params, body, query, options }) => {
                    if (params) {
                        Object.keys(params).map(param => {
                            service.url[api] = service.url[api].replace(':' + param, params[param]);
                        });
                    }
                    if (service.url[api].includes(':')) {
                        let errMsg = 'call api failed - url params is wrong.';
                        console.error(errMsg);
                        return Promise.reject(errMsg);
                    }
                    let requestObj = {
                        url: `${service.domain[env]}${service.url[api].split('_')[1]}`,
                        method: service.url[api].split('_')[0],
                        headers,
                        data: body || undefined,
                        params: query
                    };
                    let optionObj;
                    if (options) {
                        optionObj = Object.assign({}, options);
                        delete optionObj.url;
                        delete optionObj.method;
                        delete optionObj.headers;
                        delete optionObj.data;
                        delete optionObj.query;
                        delete optionObj.params;
                    }
                    return await request$1.axiosAsync({
                        options: Object.assign(requestObj, optionObj),
                        requestId: helper$1.generator(16), returnFull: true
                    });
                };
            });
            return pool
        });
    };

    const rms = {
        domain: {
            local: 'http://localhost:7300',
            dev: 'https://dev-api.nuwarobotics.com',
            uat: 'https://uat-api.nuwarobotics.com',
            staging: 'https://stg-api.nuwarobotics.cn',
            prod: 'https://api.nuwarobotics.cn'
        },
        url: {
            getAllDevices: 'get_/v1/rms/session/devices',
            addDevices: 'post_/v1/rms/session/devices',
            getCurrentDevices: 'get_/v1/rms/session/current/devices',
            getAllGroups: "get_/v1/rms/groups"
        }
    };

    const utils$2 = { uuid: helper$1.generator };
    class WebSocketState {
        constructor({ domain, name }, body, callBack = () => { }) {
            this.url = '';
            this.ws = null;
            this.cache = [];
            this.body = body;
            this.name = name;
            this.connectId = '';
            this.statusCode = 0; // 4999: 超过最大重连次数
            this.connectState = ''; // pending reslove reject
            this.needConnect = false;
            this.logined = false;
            this.domain = domain;
            this.callBack = callBack;
            this.protocol = "wss://";
            this.reconnectCount = 0;
            this.maxReconnectCount = 5;
            this.reconnectInterval = 3000;
            this.sendPingInterval = 1000;
            this.receivePongInterval = 10000;
            this.sendTimeoutInterval = 60000;
            this.ps = new PubSub();
            this.timeoutCache = {};
            this.cacheSend = [];
            this.setUrl();
            this.reciveWsEvent(this.connect());
            this.initSubscribe();
            this.watchNetwork();

            this.api = {};
            this.initApi();
        }

        initApi() {
            console.log('initApi', rms, this.body.env);
            if (this.name === 'rms') {
                callApiGenerator(this.api, [rms], this.body.env);
            }
        }

        removeCacheSend(mark) {
            const cacheIdx = this.cacheSend.findIndex(item => item.mark === mark);
            if (cacheIdx > -1) {
                this.cacheSend.splice(cacheIdx, 1);
            }
        }

        addCacheSend(cache) {
            const cacheIdx = this.cacheSend.findIndex(item => item.mark === cache.mark);
            cacheIdx > -1 && this.cacheSend.splice(cacheIdx, 1);
            this.cacheSend.push(cache);
        }

        loginedHandler() {
            this.logined = true;
            this.statusCode = 0;

            this.callBack('overMaxReconnectHandler', [this.name, true]);
            this.cacheSend.forEach((cache, cacheIdx) => {
                const { message, args } = cache;
                this.cacheSend[cacheIdx] = null;
                if (typeof message === 'string') {
                    typeof this.getChannel[message] === 'function' && this.getChannel[message].call(this, ...args);
                } else if (typeof message === 'object') {
                    this.send(message);
                }
            });
            this.cacheSend = this.cacheSend.filter(cache => cache);
        }

        watchNetwork() {
            const eventsConfig = {
                add(target, type, handler) {
                    if (target.addEventListener) {
                        target.addEventListener(type, handler, false);
                    } else if (target.attachEvent) {
                        target.attachEvent("on" + type, handler);
                    } else {
                        target["on" + type] = handler;
                    }
                }
            };

            eventsConfig.add(window, "online", (evt) => {
                if (this.ws instanceof WebSocket && this.ws.readyState === this.ws.CLOSED) {
                    if (this.needConnect) {
                        this.reconnect();
                    }
                }
                this.callBack('connectStatus', { status: { code: this.statusCode, state: 'on' }, payload: { 'desc': 'nwk on' } });
                console.log('online 在线: =>', evt, this.connectState, this, this.ws.readyState);
            });

            eventsConfig.add(window, "offline", (evt) => {
                this.close(undefined, true);
                this.callBack('connectStatus', { status: { code: this.statusCode, state: 'off' }, payload: { 'desc': 'nwk off' } });
                console.log('offline 离线: =>', evt, this.connectState, this, this.ws.readyState);
            });
        }

        setState(payload, scope) {
            console.log('setState:', payload, scope);
            const target = scope ? this[scope] : this;
            Object.assign(target, payload);
        }

        initSubscribe() {
            const funcs = functionList[this.body.type][this.name];
            console.log(funcs);
            if (funcs) {
                Object.entries(funcs).forEach(([key, func]) => {
                    console.log(key, func);
                    if (typeof func === 'function') {
                        this.ps.subscribeChannel(key, func.bind(this));
                    }
                });
            }
        }

        get getChannel() {
            return this.ps.channel
        }

        reciveWsEvent(ws) {
            if (!(ws instanceof WebSocket)) {
                console.log('ws', ws);
                return
            }
            const connectId = this.connectId;
            ws.onclose = payload => {
                if (ws.readyState === ws.CLOSED) {
                    console.log('销毁: => ', connectId);
                    this.destroy(connectId);
                }
                console.log('关闭连接 close: => ', connectId, ws);
                if (connectId !== this.connectId) {
                    console.warn('不是当前websocket实例');
                    return
                }
                this.logined = false;
                this.connectState = 'reject';
                this.callBack('connectStatus', { status: { code: this.statusCode, state: 'reject' }, payload: {} });
                if (payload.wasClean || payload.code == 1000) {
                    console.log('正常关闭');
                    this.removeInterval('reconnectTimer');
                    this.keep('pause');
                    this.reconnectCount = 0;
                    this.reconnectLock = false;
                    this.connectState = '';
                } else {
                    console.log('非正常关闭');
                    this.reconnect();
                }
                console.log(payload, 'onclose', connectId, this.connectId);
            };
            ws.onerror = payload => {
                if (ws.readyState === ws.CLOSED) {
                    console.log('销毁: => ', connectId);
                    this.destroy(connectId);
                }
                if (connectId !== this.connectId) {
                    console.warn('不是当前websocket实例');
                    return
                }
                this.logined = false;
                this.connectState = 'reject';
                this.callBack('connectStatus', { status: { code: this.statusCode, state: 'reject' }, payload: {} });
                this.reconnect();
                console.log(payload, 'onerror', connectId, this.connectId);
            };
            ws.onopen = payload => {
                if (connectId !== this.connectId) {
                    console.warn('不是当前websocket实例');
                    return
                }
                console.log(payload, 'onopen', connectId, this.connectId);
                typeof this.getChannel.login === 'function' && this.getChannel.login();
                this.removeInterval('reconnectTimer');
                this.keep();
                this.reconnectCount = 0;
                this.reconnectLock = false;
            };
            ws.onmessage = payload => {
                if (connectId !== this.connectId) {
                    console.warn('不是当前websocket实例');
                    return
                }
                this.keep();
                console.log('onmessage => ', payload);
                if (payload.data === 'pong') {
                    return
                }
                if (!payload.data) {
                    return
                }
                try {
                    const pakage = JSON.parse(payload.data);
                    console.log(pakage, 'pakage: =>');
                    if (pakage.data.requestId) {
                        this.ps.publish(pakage.data.requestId, pakage);
                    } else if (pakage.cmd) {
                        this.ps.publish(pakage.cmd, pakage);
                    }
                    this.callBack("receiveData", { payload: pakage });
                } catch (err) {
                    console.error('parse error: ' + err + '');
                }
                console.log(payload, 'onmessage', connectId, this.connectId);
            };
        }

        removeTimeoutCache(timeoutCacheId) {
            const timer = this.timeoutCache[timeoutCacheId];
            if (timer) {
                clearTimeout(timer);
                delete this.timeoutCache[timeoutCacheId];
            }
        }

        removeTimeout(name) {
            const arr = Array.isArray(name) ? name : [name];
            arr.forEach(key => {
                if (this[key]) {
                    clearTimeout(this[key]);
                    this[key] = null;
                }
            });
        }

        removeInterval(name) {
            if (this[name]) {
                clearInterval(this[name]);
                this[name] = null;
            }
        }

        close({ code = 1000, reason = '' } = {}, activeClose) {
            console.log('close');
            this.removeInterval('reconnectTimer');
            this.reconnectCount = 0;
            this.reconnectLock = false;
            if (typeof activeClose === 'boolean') {
                this.needConnect = activeClose;
            }
            this.keep('pause');
            if (this.ws instanceof WebSocket) {
                if (this.ws.readyState < this.ws.CLOSING) {
                    this.ws.close(code, reason);
                }
            }
        }

        destroy(connectId) {
            const wsInsTance = this.cache.find((item) => item.connectId === connectId);
            if (wsInsTance && wsInsTance.webSocket instanceof WebSocket) {
                if (wsInsTance.webSocket.readyState === wsInsTance.webSocket.CLOSED) {
                    const idxWs = this.cache.findIndex((item) => item.connectId === connectId);
                    idxWs > -1 && this.cache.splice(idxWs, 1);
                }
            }
        }

        reconnect(forced) {
            if (this.statusCode === 4999 && !forced) {
                console.warn('超过最大重连次数');
                this.callBack('connectStatus', { status: { code: this.statusCode, state: 'reject' }, payload: {} });
                return
            }
            if (this.reconnectLock && !forced) {
                console.warn('正在重连中');
                return
            }
            if (forced) this.reconnectCount = 0;
            this.keep('pause');
            this.reconnectLock = true;
            const { reconnectInterval } = this;
            if (this.ws instanceof WebSocket) {
                if (this.reconnectCount === 0 && this.ws.readyState < this.ws.CLOSING) {
                    console.log('重连前先关闭连线');
                    this.close();
                }
            }
            this.removeInterval('reconnectTimer');
            this.reconnectTimer = setInterval(() => {
                this.reciveWsEvent(this.connect());
                this.reconnectCount++;
            }, reconnectInterval);
        }

        keep(data) {
            console.log('心跳检测');
            this.removeTimeout(['webSendTimer', 'serverSendTimer']);
            if (data === 'pause') {
                console.log('暂停 心跳检测');
                return
            }
            const { sendPingInterval, receivePongInterval } = this;
            this.webSendTimer = setTimeout(() => {
                //   console.log('发送 ping');
                if (this.ws instanceof WebSocket) {
                    if (this.ws.readyState === this.ws.OPEN) {
                        this.ws.send('ping');
                    } else {
                        this.reconnect();
                    }
                }
                this.serverSendTimer = setTimeout(() => {
                    this.reconnect();
                }, receivePongInterval);
            }, sendPingInterval);
        }

        send(message, notCache) {
            console.log('send', message);
            if (this.ws instanceof WebSocket) {
                try {
                    if (!notCache) {
                        if (this.needConnect) {
                            if (!this.logined || this.ws.readyState !== this.ws.OPEN) {
                                const mark = (message.data && message.data.requestId) || message.cmd;
                                if (mark) {
                                    this.addCacheSend({ message, mark });
                                }
                            }
                        }
                    }
                    if (this.ws.readyState === this.ws.OPEN) {
                        this.ws.send(JSON.stringify(message));
                    } else {
                        this.reconnect();
                    }
                } catch (err) {
                    console.error('parse error: ' + err + '');
                }
            }
        }

        setUrl() {
            const { token } = this.body;
            if (this.name == 'rms') {
                this.url = this.protocol + this.domain + "?sessionToken=" + token;
            }
            if (this.name == 'tool') {
                this.url = this.protocol + this.domain;
            }
            if (this.name == 'white') {
                this.url = this.protocol + this.domain + "?token=" + token;
            }
            if (this.name == 'quick') {
                this.url = this.protocol + this.domain + "?token=" + token;
            }
            if (/^test/.test(this.name)) {
                this.url = this.protocol + this.domain;
            }
            console.log('callBack', this.name, this.callBack, this.url);
        }

        connect() {
            if (this.reconnectCount >= this.maxReconnectCount) {
                console.log('暂停重连 超过最大重连次数', this.reconnectCount);
                this.removeInterval('reconnectTimer');
                this.callBack('overMaxReconnectHandler', [this.name]);
                this.statusCode = 4999;
                return
            }
            console.log('connect: =>', this);
            this.cache.forEach(wsIns => {
                console.log(wsIns,
                    wsIns.webSocket.readyState,
                    wsIns.connectId,
                    wsIns.connectId === this.connectId,
                    'cache ws: =>');
            });
            this.needConnect = true;
            if (!this.url) return
            this.connectState = 'pending';
            this.callBack('connectStatus', { status: { state: 'pending' }, payload: {} });
            const ws = this.ws = new WebSocket(this.url);
            const connectId = this.connectId = utils$2.uuid();
            this.cache.push({ webSocket: ws, connectId: connectId });
            return ws
        }
    }

    const wsDomain = {
        codeLab: {
            tool: 'developtool-connection.nuwarobotics.com',
            quick: 'mibo-connection.nuwarobotics.com',
            white: 'mibo-connection.nuwarobotics.com',
            rms: 'rms-connection.nuwarobotics.com'
        },
        brainWar: {
            white: 'mibo-connection.nuwarobotics.com',
            rms: 'rms-connection.nuwarobotics.com'
        },
        test: {
            test1: '192.168.31.102:9001',
            test2: '192.168.31.102:9002'
        },
        slide: {
            white: 'mibo-connection.nuwarobotics.com',
            rms: 'rms-connection.nuwarobotics.com',
            // tool: 'developtool-connection.nuwarobotics.com',
        }
    };
    const featureWebsocketSpaced = {
        codeLab: ({ type, isRmsScope, isBiz, teachFeature, env }) => {
            const payload = { func: [], wsUrl: [] };
            if (teachFeature) {
                payload.func.push('playFunc');
            }
            if (isRmsScope) {
                payload.wsUrl.push({
                    name: 'rms',
                    domain: env + '-' + wsDomain[type].rms
                });
                payload.func.push('setFunc');
                payload.func.push('sendFile');
            }
            if (isBiz) {
                payload.wsUrl.push({
                    domain: env + '-' + wsDomain[type].white,
                    name: 'white'
                });
                payload.func.push('sendFile');
            }
            payload.wsUrl.push({
                name: 'tool',
                domain: env + '-' + wsDomain[type].tool
            });
            return payload
        },
        brainWar: ({ type, isRmsScope, isBiz, env }) => {
            const payload = { func: [], wsUrl: [] };
            if (isRmsScope) {
                payload.wsUrl.push({
                    name: 'rms',
                    domain: env + '-' + wsDomain[type].rms
                });
                payload.func.push('sendFile');
            }
            if (isBiz) {
                payload.wsUrl.push({
                    domain: env + '-' + wsDomain[type].white,
                    name: 'white'
                });
                payload.func.push('sendFile');
            }
            return payload
        },
        slide: ({ type, isRmsScope, isBiz, env }) => {
            const payload = { func: [], wsUrl: [] };
            if (isRmsScope) {
                payload.wsUrl.push({
                    name: 'rms',
                    domain: env + '-' + wsDomain[type].rms
                });
                payload.func.push('sendFile');
                payload.func.push('getDevice');
            }
            if (isBiz) {
                payload.wsUrl.push({
                    domain: env + '-' + wsDomain[type].white,
                    name: 'white'
                });
                payload.func.push('sendFile');
                payload.func.push('getDevice');
            }
            return payload
        },
        test: ({ type, isRmsScope, teachFeature }) => {
            const payload = { func: [], wsUrl: [] };
            if (teachFeature) {
                payload.func.push('playFunc');
            }
            if (isRmsScope) {
                payload.wsUrl.push({
                    name: 'test2',
                    domain: wsDomain[type].test2
                });
                payload.func.push('setFunc');
                payload.func.push('sendFile');
            }
            payload.wsUrl.push({
                name: 'test1',
                domain: wsDomain[type].test1
            });
            return payload
        }
    };

    class WebSocketProccess {
        constructor(body = {}, events = {}, config = {}) {
            this.body = body;
            this.wsCache = {};
            this.events = {};
            this.config = config;
            this.close = this.close;
            this.subscribe = {};
            this.overMaxReconnect = {};
            this.initEvents(events);
            this.init();
            return this.getInstance
        }

        initEvents(events) {
            this.events = { overMaxReconnectHandler: this.overMaxReconnectHandler.bind(this), ...events };
        }

        overMaxReconnectHandler([name, del]) {
            if (del) {
                // debugger 
                if (this.overMaxReconnect[name]) delete this.overMaxReconnect[name];
                return
            }
            this.overMaxReconnect[name] = true;
        }

        reconnectForced() {
            Object.keys(this.wsCache).forEach(k => {
                // if (this.wsCache[k].statusCode === 4999) {
                this.wsCache[k].reconnect(true);
                // }
            });
        }

        send(name, args) {
            const wsIns = this.wsCache[name];
            if (wsIns) {
                wsIns.send(...args);
            }
        }

        removeCacheSend(sendEvtName) {
            Object.keys(this.wsCache).forEach(k => {
                this.wsCache[k].removeCacheSend(sendEvtName);
            });
        }

        close(type = 'all') {
            console.log('关闭连线', type);
            const wsIns = this.wsCache[type];
            if (type !== 'all' && !wsIns) {
                return
            }
            if (type == 'all') {
                Object.entries(this.wsCache).forEach(([name, wsIns]) => {
                    console.log(name, wsIns);
                    wsIns.close();
                });
            } else {
                wsIns.close();
            }
        }

        init() {
            const { wsUrl } = this.getWsSpaced();
            wsUrl.forEach(({ name, domain }) => {
                console.log([name, domain]);
                this.wsCache[name] = new WebSocketState({ name, domain }, this.body, this.reciveBack.bind(this));
                console.log(this.wsCache[name].getChannel);
                this.subscribe = { ...this.subscribe, ...this.wsCache[name].getChannel };
            });
        }

        reciveBack(eventName, payload) {
            const fn = this.events[eventName];
            if (typeof fn === 'function') {
                fn(payload);
            }
            //   console.log(payload, 'reciveBack', this);
        }

        getWsSpaced() {
            const { type, isRmsScope, isBiz, teachFeature, env } = this.body;
            return featureWebsocketSpaced[type]({ type, isRmsScope, isBiz, teachFeature, env })
        }

        get getInstance() {
            if (!WebSocketProccess.instance) {
                WebSocketProccess.instance = this;
            }
            return WebSocketProccess.instance
        }
    }

    exports.WebSocketProccess = WebSocketProccess;
    exports.utils = utils;
    exports.version = version;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
/* ©2019 NUWA Robotics Corp. All Rights Reserved. */
