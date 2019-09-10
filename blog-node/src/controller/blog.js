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

const getDetail = (id) => {
    return {
        id: 1,
        title: 'qqq',
        content: '内容',
        createTime: 1234567,
        author: 'zhangsan'
    }
}

const newBlog = (blogData = {}) => {
    // blogData 是一个博客对象，包含title content属性
    return {
        id: 3
    }
}

const updateBlog = (id, blogData = {}) => {
    return true
}

const delBlog = (id) => {
    return true
}

module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
}
