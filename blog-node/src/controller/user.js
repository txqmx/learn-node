const { exec } = require('../db/mysql' )

const loginCheck = (userName, password) => {
    const sql = `select username, realname from users where username='${userName}' and password='${password}'`
    return exec(sql).then(rows => {
        return rows[0] || {}
    })
}

module.exports = {
    loginCheck
}
