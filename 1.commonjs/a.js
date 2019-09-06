function add(a, b) {
    return a + b
}

function mul(a, b){
    return a * b
}

// module.exports = add  // 导出一个
module.exports = { // 导出一个对象
    add,
    mul
}
