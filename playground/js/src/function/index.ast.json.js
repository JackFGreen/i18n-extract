function fn() {
  console.log($t("你好"));
}
function fnArg(a = $t("哈哈"), b = `${$t("嘿嘿")}`) {
  console.log($t("你好"), a, b);
}
const a = 1;
const b = $t("啊啊");
const c = a + `${$t("哈哈-")}${b}${$t("-")}${fnArg(`${$t("123")}`)}${$t("-哈哈")}`;
fnArg($t("函数调用string"));
fnArg(`${$t("函数调用string tpl")}`);