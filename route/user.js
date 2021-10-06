const express = require('express');
const router = express.Router();
//导入路由处理模块
const user_handler = require('../route_handler/user')
    //导入数据验证中间件
const expressjoi = require('@escook/express-joi');
//导入需要的验证规则对象
const { reg_login_schema } = require('../schema/user');
//注册新用户
router.post('/reguser', expressjoi(reg_login_schema), user_handler.regUser)
    //登录
router.post('/login', expressjoi(reg_login_schema), user_handler.loginUser)


module.exports = router;