var express = require('express');
var router = express.Router();
const { getList, getDetail, newBlog, updateBlog, delBlog } = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const loginCheck = require('../middleware/loginCheck')


router.get('/list', function(req, res, next) {
    let author = req.query.author || ''
    const keyword = req.query.keyword || ''

    if (req.query.isadmin) {
        console.log('is admin')  // PM2 写入日志
        // 管理员页面
        if(req.session.username == null){
            console.error('is admin, but no login')
            // 未登录
            res.json(
                new ErrorModel('未登录')
            )
            return
        }
        // 强制查询自己的博客
        author = req.session.username
    }

    const result = getList(author, keyword)
    return result.then( listDate => {
        res.json(
            new SuccessModel(listDate)
        )
    })
});
router.get('/detail', function(req, res, next) {
    const result = getDetail(req.query.id);
    return result.then(data => {
        res.json(
            new SuccessModel(data)
        );
    })
});
router.post('/new', loginCheck, function(req, res, next) {
    req.body.author = req.session.username
    const result = newBlog(req.body)
    return result.then(data => {
        res.json(
            new SuccessModel(data)
        );
    })
});
router.post('/update', loginCheck, function(req, res, next) {
    const result = updateBlog(req.query.id, req.body)
    return result.then(val => {
        if(val){
            res.json(
                new SuccessModel()
            );
        } else {
            res.json(
                new ErrorModel('更新失败')
            );
        }
    })
});
router.post('/del', loginCheck, function(req, res, next) {
    const result = delBlog(req.query.id, req.session.username)
    return result.then(val => {
        if(val){
            res.json(new SuccessModel())
        }else {
            res.json(new ErrorModel('删除失败'))
        }
    })
});

module.exports = router;
