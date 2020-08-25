'use strict';

module.exports = {
    io: {
        init: {
            path: '/ppz'
        },
        namespace: {
            // '/': {
            //     connectionMiddleware: ['auth'],
            //     packetMiddleware: ['filter'],
            // },
            '/': {
                connectionMiddleware: ['auth'],
                packetMiddleware: [],
            },
        }
    },
    cluster: {
        listen: {
            port: 3000,
            hostname: '127.0.0.1', // 不建议设置 hostname 为 '0.0.0.0'，它将允许来自外部网络和来源的连接，请在知晓风险的情况下使用
            // path: '/ppz',
        }
    },
    // redis: {
    //     client: {
    //         host: '',
    //         port: 14379,
    //         password: '',
    //         db: 0,
    //     },
    // },
    keys: 123456789
}

