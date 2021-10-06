const express = require('express');
const router = express.Router();
//导入文章的路由处理函数
const article_handler = require('../route_handler/article');
//导入验证数据中间件
const expressJoi = require('@escook/express-joi');
//导入需要的验证规则对象
const { add_article_schema } = require('../schema/article');
//导入multer 和 path
const multer = require('multer');
const path = require('path');
//创建multer的实例
const uploads = multer({ dest: path.join(__dirname, '../uploads') });
//发布文章
router.post('/add', uploads.single('cover_img'), expressJoi(add_article_schema), article_handler.AddArticle);
module.exports = router;