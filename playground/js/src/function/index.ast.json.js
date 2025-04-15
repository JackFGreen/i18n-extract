function fn() {
    console.log('你好');
}
function fn(a = '哈哈', b = '嘿嘿') {
    console.log('你好', a, b);
}
const a = 1;
const b = '啊啊';
const c = a + `哈哈-${b}-${fn()}-哈哈`;
