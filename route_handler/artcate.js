const db = require('../db/index');
//获取文章分类列表的处理函数
exports.getArticleCates = (req, res) => {
        //定义查询分类列表数据的SQL语句
        const sql = 'select * from ev_article_cate where is_delete=0 order by id asc';

        db.query(sql, (err, result) => {
            if (err) return res.cc(err);

            res.send({
                status: 0,
                message: '获取文章分类列表成功！',
                data: result
            })
        })
    }
    //新增文章分类的处理函数
exports.addArticleCates = (req, res) => {
        //定义查重的SQL语句
        const sql = 'select * from ev_article_cate where name=? or alias=?';
        //执行SQL语句
        db.query(sql, [req.body.name, req.body.alias], (err, results) => {
            //执行SQL语句失败
            if (err) return res.cc(err);
            //分类名称和分类别名都被占用
            if (results.length === 2) return res.cc('分类名称与别名被占用，请更换后重试')
            if (results.length === 1 && results[0].name === req.body.name && results[0].alias === req.body.alias)
                return res.cc('分类名称与别名被占用，请更换后重试');
            if (results.length === 1 && results[0].name === req.body.name) return res.cc('分类名称被占用，请更换后重试');
            if (results.length === 1 && results[0].alias === req.body.alias) return res.cc('分类别名被占用，请更换后重试');
            //TODO 执行添加
            //定义增加文章分类的SQL语句
            const sql = 'insert into ev_article_cate set ?';
            db.query(sql, req.body, (err, result) => {
                if (err) return res.cc(err);
                if (result.affectedRows !== 1) return res.cc('新增文章分类失败');
                res.cc('新增文章分类成功', 0);
            })
        })
    }
    //根距id删除文章分类的处理函数
exports.deleteCateById = (req, res) => {
        //定义标记删除的SQL语句
        const sql = 'update ev_article_cate set is_delete=1 where id=?';
        db.query(sql, req.params.id, (err, results) => {
            if (err) return res.cc(err);
            if (results.affectedRows !== 1) return res.cc('删除文章分类失败！');
            res.cc('删除文章分类成功', 0);
        })
    }
    //根据id获取文章分类列表处理函数
exports.getArtCateById = (req, res) => {
        //定义SQL语句
        const sql = 'select * from ev_article_cate where id=?';
        db.query(sql, req.params.id, (err, result) => {
            if (err) return res.cc(err);
            if (result.length !== 1) return res.cc('获取文章分类失败');
            res.send({
                status: 0,
                message: '获取文章分类数据成功',
                data: result[0]
            })
        })
    }
    //更新文章分类的处理函数
exports.updateCateById = (req, res) => {
    //定义查重的SQL语句
    const sql = 'select * from ev_article_cate where id<>? and(name=? or alias=?)';

    db.query(sql, [req.body.Id, req.body.name, req.body.alias], (err, results) => {
        if (err) return res.cc(err);
        //分类名称和分类别名都被占用
        if (results.length === 2) return res.cc('分类名称与别名被占用，请更换后重试');
        if (results.length === 1 && results[0].name === req.body.name && results[0].alias === req.body.alias)
            return res.cc('分类名称与别名被占用，请更换后重试');
        if (results.length === 1 && results[0].name === req.body.name) return res.cc('分类名称被占用，请更换');
        if (results.length === 1 && results[0].alias === req.body.alias) return res.cc('分类别名被占用，请更换');
        //定义更新分类的语句
        const sql = 'update ev_article_cate set ? where Id=?';
        db.query(sql, [req.body, req.body.Id], (err, results) => {
            if (err) return res.cc(err);
            if (results.affectedRows !== 1) return res.cc('更新文章分类失败')
            res.cc('更新文章分类成功', 0);
        })
    })
}