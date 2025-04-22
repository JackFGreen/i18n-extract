function fn() {
  console.log('你好')
}

function fnArg(a = '哈哈', b = `嘿嘿`) {
  console.log('你好', a, b)
}

const a = 1
const b = '啊啊'
const c = a + `哈哈-${b}-${fnArg(`123`)}-哈哈`

fnArg('函数调用string')
fnArg(`函数调用string tpl`)
