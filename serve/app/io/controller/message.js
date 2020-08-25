'use strict';

module.exports = app => {
    class Controller extends app.Controller {
        async index() {
            // const message = this.ctx.args;
            // console.log(this.ctx.args);

            const { ctx, app } = this;
            const nsp = app.io.of('/');
            console.log(ctx.args[0]);
            const message = ctx.args[0] || {};
            const socket = ctx.socket;
            const client = socket.id;
            console.log(message);
            try {
                const { target, payload } = message;
                console.log(target, payload);
                if (!target) return;
                const msg = ctx.helper.parseMsg('message', payload, { client, target });
                nsp.emit(target, msg);
            } catch (error) {
                app.logger.error(error);
            }

            // console.log('message :', message + ' : ' + process.pid);
            // const msg = ctx.helper.parseMsg('message', payload, { client, target });
            //   const say = await this.ctx.service.user.say();
            // this.ctx.socket.emit('message', message[0], message[1], this.ctx.socket.id)
            // app.io.of('/').emit('message', message[0], message[1], this.ctx.socket.id);
            // io.emit('joined', room, user);
            //   this.ctx.socket.emit('res', say);
        }
    }
    return Controller;
};
