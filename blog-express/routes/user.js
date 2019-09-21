var express = require('express');
var router = express.Router();


router.post('/login', function(req, res, next) {
    const { username, password } = req.body
    res.json({ // 类似 res.end(), 返回json格式
        errno: 0,
        data: {
            username,
            password
        }
    })
});


module.exports = router;
