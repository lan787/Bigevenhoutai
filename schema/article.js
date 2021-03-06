const joi = require('joi');
//定义标题分类id内容发布状态的验证规则
const title = joi.string().required();
const cate_id = joi.number().integer().min(1).required();
const content = joi.string().required().allow('');
const state = joi.string().valid('已发布', '草稿').required();
//验证规则对象--发布文章
exports.add_article_schema = {
    body: {
        title: title,
        cate_id: cate_id,
        content: content,
        state: state
    }
}