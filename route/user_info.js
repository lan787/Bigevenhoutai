const express = require('express');
const route = express.Router();
//导入路由处理模块
const userInfo = require('../route_handler/user_info');
//导入验证规则的中间件
const expressJoi = require('@escook/express-joi');
//导入需要的验证规则
const { update_userinfo_schema, updatae_password_schema, update_avatar_schema } = require('../schema/user');
//获取用户信息
route.get('/userinfo', userInfo.getUserinfo);
//更新用户信息
route.post('/userinfo', expressJoi(update_userinfo_schema), userInfo.UpdataUserinfo);
//重置密码
route.post('/updatepwd', expressJoi(updatae_password_schema), userInfo.updatePassword);
//更新头像
route.post('/update/avatar', expressJoi(update_avatar_schema), userInfo.updateAvatar);
module.exports = route;