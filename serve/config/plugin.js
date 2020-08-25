'use strict';

module.exports = {
    io: {
        enable: true,
        package: 'egg-socket.io',
    },
    redis: {
        enable: false,
        package: 'egg-redis'
    },
    mysql: {
        enable: true,
        package: 'egg-mysql',
    }
}

