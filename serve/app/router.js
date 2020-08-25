'use strict';

module.exports = app => {
  // app.io.of('/')
//   app.io.route('chat', app.io.controller.chat.index);

  // app.io.of('/chat')
  app.io.of('/').route('join', app.io.controller.join.index);
  app.io.of('/').route('message', app.io.controller.join.message);

};
