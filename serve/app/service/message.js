'use strict';

module.exports = app => {
    class Message extends app.Service {
        async addMsg(data) {
            const result = this.app.mysql.insert('message', data)
            return result;
        }
    }
    return Message;
};
