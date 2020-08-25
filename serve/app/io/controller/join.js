'use strict';

module.exports = app => {
    class Controller extends app.Controller {
        //加入
        async index() {
            const { ctx } = this;
            const socket = ctx.socket
            const message = ctx.args;
            const room = message[0];
            console.log(room);
            console.log(message);
            // console.log(socket)
            socket.join(room);
            socket.emit('join', room, message[1]);
            socket.to(room).emit('joined', room, message[1]);
        }
        async message() {
            const { ctx, app } = this;
            const message = ctx.args[0] || {};
            const socket = ctx.socket;
            const client = socket.id;
            try {
                const { target, payload, room } = message;
                if (!target) return;
                const msg = ctx.helper.parseMsg('message', payload, { client, target });
                socket.emit('receive', msg);
                socket.to(room).emit(target, msg);
                //将数据插入数据库
                let postData = {
                    // id: client,
                    type: payload.type,
                    msg: payload.msg,
                    userid: client,
                    name: payload.name,
                    msgid: payload.msgId
                }
                const result = await ctx.service.message.addMsg(postData);
                if (result.affectedRows === 1) {
                    app.logger.info('插入数据成功!');
                } else {
                    app.logger.info('插入数据失败!');
                }
                // console.log(result.affectedRows);
            } catch (error) {
                app.logger.error(error);
            }
        }
    }
    return Controller;
};
