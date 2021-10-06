//文章处理模块
const path = require('path');
const db = require('../db/index');
// 发布文章的处理函数
exports.AddArticle = (req, res) => {
    if (!req.file || req.file.fieldname !== 'cover_img') return res.cc('文章封面是必选参数');
    //处理文章信息对象
    const articleInfo = {
        ...req.body,
        cover_img: path.join('/uploads', req.file.filename),
        pub_date: new Date(),
        author_id: req.user.id
    }
    const sql = 'insert into ev_articles set ?';

    db.query(sql, articleInfo, (err, result) => {
        if (err) return res.cc(err);
        if (result.affectedRows !== 1) return res.cc('发布文章失败');
        res.cc('发布文章成功', 0);
    })
}