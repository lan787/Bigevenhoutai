//导入验证规则的包
const joi = require('joi');
//定义name和alias的验证规则
const name = joi.string().required();
const alias = joi.string().alphanum().required();
//定义分类id的校验规则
const id = joi.number().integer().min(1).required();
//校验规则对象
exports.add_cate_schema = {
        body: {
            name: name,
            alias: alias
        }
    }
    //验证规则对象--删除分裂
exports.delete_cate_schema = {
        params: {
            id: id
        }
    }
    //验证对象--根据id获取文章类别
exports.get_cate_schema = {
        params: {
            id: id
        }
    }
    //验证对象--更新文章分类数据
exports.update_cate_schema = {
    body: {
        Id: id,
        name: name,
        alias: alias
    }
}