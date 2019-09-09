const getList = (author, keyword) => {
    // 先返回假数据（格式是正确的）
    return [
        {
            id: 1,
            title: 'qqq',
            content: '内容',
            createTime: 1234567,
            author: 'zhangsan'
        },
        {
            id: 2,
            title: 'qqq',
            content: '内容',
            createTime: 1234567,
            author: 'zhangsan'
        }
    ]
}

module.exports = {
    getList
}
