//导入密码加密模块
const bcrypt = require('bcryptjs');
//导入数据模块
const db = require('../db/index');
//导入生成Took的包
const jwt = require('jsonwebtoken');
//导入全局的秘钥
const config = require('../config');
// 注册的处理函数
exports.regUser = (req, res) => {
    //获取表单信息
    const userinfo = req.body;
    //判断用户名是否合法
    // if (!userinfo.username || !userinfo.password) {
    //     // return res.send({ status: 1, message: '用户名或密码不合法！' })
    //     return res.cc('用户名或密码不合法！');
    // }


    //定义sql语句
    const sql = 'select * from ev_users where username=?';
    db.query(sql, userinfo.username, (err, result) => {
        //执行sql语句失败
        if (err) {
            // return res.send({ status: 1, message: err.message })
            return res.cc(err);
        }
        //用户名重复
        if (result.length > 0) {
            // return res.send({ status: 1, message: '用户名被占用，请更换其他用户名！' })
            return res.cc('用户名被占用，请更换其他用户名！');
        }
        userinfo.password = bcrypt.hashSync(userinfo.password, 10);
        const sqlstr = 'insert into ev_users set ?';
        db.query(sqlstr, { username: userinfo.username, password: userinfo.password }, (err, result) => {
            //sql语句执行失败
            if (err) {
                // return res.send({ status: 1, message: err.message })
                return res.cc(err);
            }
            //判断影响行数是否为1
            if (result.affectedRows !== 1)
            // return res.send({ status: 1, message: '注册用户失败，请稍后再试！' });
                return res.cc('注册用户失败，请稍后再试！');
            //注册成功
            // res.send({ status: 0, message: '注册成功' });
            res.cc('注册成功', 0);
        })
    })
}

// 登录的处理函数
exports.loginUser = (req, res) => {
    const userInfo = req.body;
    //定义sql语句
    const sql = 'select * from ev_users where username=?';
    //执行SQL语句查询用户信息
    db.query(sql, userInfo.username, (err, result) => {
        //执行SQL语句失败
        if (err) return res.cc(err);
        //返回结果不等于1
        if (result.length !== 1) {
            return res.cc('登录失败');
        }
        //判断密码是否正确
        const compareResult = bcrypt.compareSync(userInfo.password, result[0].password)
        if (!compareResult) return res.cc('登录失败')
            //在服务器端生成Took字符串
        const user = {...result[0], password: '', user_pic: '' }
            //对用户信息进行加密，生成took字符串
        const tokenstr = jwt.sign(user, config.jwtSecretKey, { expiresIn: '10h' });

        res.send({
            status: 0,
            message: '登陆成功',
            token: 'Bearer ' + tokenstr
        })

    })


}