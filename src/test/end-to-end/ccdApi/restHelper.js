const config = require('../../config.js');

const fetch = require('node-fetch');
const HttpProxyAgent = require('http-proxy-agent');
const HttpsProxyAgent = require('https-proxy-agent');

const {retry} = require('./retryHelper');

const PROXY_SERVER = `http://${config.proxyServer}`;
const PROXY_AGENT = url => {
    return config.proxyServer ? getProxyServer(url) : null;
};

const getProxyServer = (url) => {
    return url.startsWith('http:') ? new HttpProxyAgent(PROXY_SERVER) : new HttpsProxyAgent(PROXY_SERVER);
};

const request = (url, headers, body, method = 'POST') => fetch(url, {
    method: method,
    body: body ? JSON.stringify(body) : undefined,
    headers: headers,
    agent: PROXY_AGENT(url)
});

const retriedRequest = async (url, headers, body, method = 'POST', expectedStatus = 200) => {
    return await retry(() => {
        return request(url, headers, body, method).then(response => {
            if (response.status !== expectedStatus) {
                throw new Error(`Expected status: ${expectedStatus}, actual status: ${response.status}, ` +
          `message: ${response.statusText}, url: ${response.url}`);
            }
            return response;
        });
    });
};

module.exports = {request, retriedRequest};
