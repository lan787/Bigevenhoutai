const express = require('express');
//创建服务器
const app = express();
//导入验证规则
const joi = require('joi');
//导入解析token包
const config = require('./config');
const expressJwt = require('express-jwt');
//解决跨域问题
const cors = require('cors');
app.use(cors());


//配置表单解析的中间件，只能解析application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))


//托管静态资源文件
app.use('/uploads', express.static('./uploads'));


//注册res.cc中间件
app.use((req, res, next) => {

    res.cc = (err, status = 1) => {
        // status默认值为1，表示失败的情况
        //err的值，可能是一个错误对象
        res.send({
            status: status,
            message: err instanceof Error ? err.message : err,
        })
    }
    next();
})

//一定要在路由之前配置解析TOOK的中间件
app.use(expressJwt({ secret: config.jwtSecretKey }).unless({ path: [/^\/api\//] }));

//注册路由模块
const userRouter = require('./route/user');
const { UnauthorizedError } = require('express-jwt');
app.use('/api', userRouter);


//导入并使用信息的路由模块
const userInfoRouter = require('./route/user_info');
app.use('/my', userInfoRouter);


//导入文章分类的路由模块
const artCateRoute = require('./route/artcate');
app.use('/my/article', artCateRoute);


//文章的路由模块
const articleRoute = require('./route/article');
app.use('/my/article', articleRoute);
app.use((err, req, res, next) => {
    //数据验证失败
    if (err instanceof joi.ValidationError) return res.cc(err);
    //捕获身份验证失败的错误
    if (err.name === 'UnauthorizedError') return res.cc('身份认证失败')
        //未知错误
    res.cc(err);
})


app.listen(3007, () => {
    console.log('htpp:127.0.0.1:3007');
})