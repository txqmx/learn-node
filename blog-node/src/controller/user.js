const { exec, escape } = require('../db/mysql' )
const { genPassword } = require('../utils/cryp')

const login = (userName, password) => {
    userName = escape(userName)  // 防止sql注入

    // 生成加密密码
    password = genPassword(password)
    password = escape(password)

    const sql = `select username, realname from users where username=${userName} and password=${password}`
    return exec(sql).then(rows => {
        return rows[0] || {}
    })
}

module.exports = {
    login
}
