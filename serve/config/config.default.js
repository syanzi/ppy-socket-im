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
        },
    },
    cluster: {
        listen: {
            port: 3000,
            hostname: '127.0.0.1', // 不建议设置 hostname 为 '0.0.0.0'，它将允许来自外部网络和来源的连接，请在知晓风险的情况下使用
        }
    },
    // redis: {
    //     client: {
    //         host: '',
    //         port: 14379,
    //         password: 'znq@lhy1314520',
    //         db: 0,
    //     },
    // },
    // mysql数据库配置
    mysql: {
        client: {
            host: '',
            port: '3306',
            user: 'root',
            password: 'znq@lhy',
            database: 'socket',
        },
    },
    keys: 123456789
}

