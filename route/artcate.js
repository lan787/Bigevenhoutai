const express = require('express');
const router = express.Router();
//导入文章分类的路由处理函数
const artCate_handler = require('../route_handler/artcate');
//导入验证规则的包
const expressJoi = require('@escook/express-joi');
//导入需要的验证规则对象
const { add_cate_schema, delete_cate_schema, get_cate_schema, update_cate_schema } = require('../schema/artcate');
//获取文章分类的列表数据
router.get('/cates', artCate_handler.getArticleCates);
//新增文章分类的路由
router.post('/addcates', expressJoi(add_cate_schema), artCate_handler.addArticleCates)
    //根距id删除文章分类
router.get('/deletecate/:id', expressJoi(delete_cate_schema), artCate_handler.deleteCateById)
    //根据id获取文章分类
router.get('/cates/:id', expressJoi(get_cate_schema), artCate_handler.getArtCateById);
//更新文章分类数据路由
router.post('/updatecate', expressJoi(update_cate_schema), artCate_handler.updateCateById)
module.exports = router;