const db = require('../db/index');
const bcrypt = require('bcryptjs');
//获取用户信息的处理函数
exports.getUserinfo = (req, res) => {
        const sql = 'select id,username,nickname,email,user_pic from ev_users where id=?';
        db.query(sql, req.user.id, (err, result) => {
            if (err) return res.cc(err);
            if (result.length !== 1) return res.cc('获取信息失败')

            res.send({
                status: 0,
                message: '获取用户信息成功',
                data: result[0]
            })
        })

    }
    //跟新用户信息
exports.UpdataUserinfo = (req, res) => {
        //定义待执行的SQL语句
        const sql = 'update ev_users set ? where id=?';
        db.query(sql, [req.body, req.body.id], (err, results) => {
            if (err) return res.cc(err);
            if (results.affectedRows !== 1) return res.cc('更新用户信息失败');
            res.cc('更新用户信息成功', 0);
        })
    }
    //更新密码的处理函数
exports.updatePassword = (req, res) => {
        //定义根据id查询用户的数据
        const sql = 'select * from ev_users where id=?';
        //    查询用户是否存在
        db.query(sql, req.user.id, (err, results) => {
            //执行语句失败
            if (err) return res.cc(err)
                //检查指定的id是否存在
            if (results.length !== 1) return res.cc('用户不存在');
            //判断提交的旧密码是否正确
            const compareResult = bcrypt.compareSync(req.body.oldPwd, results[0].password);
            if (!compareResult) return res.cc('原密码错误')

            //定义更新用户密码的SQL语句
            const sql = 'update ev_users set password=? where id=?';
            //对新密码进行加密
            const newPwd = bcrypt.hashSync(req.body.newPwd, 10);
            //执行SQL语句，根据id更新用户密码
            db.query(sql, [newPwd, req.user.id], (err, result) => {
                if (err) return res.cc(err);
                if (result.affectedRows !== 1) return res.cc('跟新密码失败！');
                res.cc('更新密码成功', 0);
            })

        })
    }
    //更新头像的处理函数
exports.updateAvatar = (req, res) => {
    // 定义更新头像的SQL语句
    const sql = 'update ev_users set user_pic=? where id=?';
    //执行SQL语句
    db.query(sql, [req.body.avatar, req.user.id], (err, results) => {
        if (err) return res.cc(err);
        if (results.affectedRows !== 1) return res.cc('更换头像失败');
        res.cc('更换头像成功');
    })
}