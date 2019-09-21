var express = require('express');
var router = express.Router();


router.get('/list', function(req, res, next) {
    res.json({ // 类似 res.end(), 返回json格式
        errno: 0,
        data: [1,2,3]
    })
});
router.get('/detail', function(req, res, next) {
    res.json({
        errno: 0,
        data: 'ok'
    })
});

module.exports = router;
