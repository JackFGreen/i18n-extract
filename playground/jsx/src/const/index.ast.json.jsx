const s1 = $t('');
const s2 = $t(' ');
const s3 = $t('换1\n行');
const s4 = $t('换2\\n行');
const s5 = `${$t('换1\\n行')}`;
const s6 = `${$t('换2\\\\n行')}`;
const str = $t('测试');
const strCall = $t('测试 call');
const strOptionalCall = $t?.('测试 optional call');
const strTplCall = $t(`测试 tpl call`);
const strTplOptionalCall = $t?.(`测试 tpl optional call`);
// 这是注释1
// 这是注释2
/** 这是注释3 */
const a = 1;
const b = $t('你好');
const c = a + `${$t('哈哈-')}${b}${$t(' 哈哈')}`;
const d = 0 || $t('二元 right 侧');
const e = $t('二元 left 侧') || 0;
const f = true ? $t('三元 left 侧') : 0;
const g = false ? 0 : `${$t('三元 right 侧')}`;
const 中文变量 = $t('中文变量 value');
const st = `${$t('第一行 ')}${42} ${str}${$t('\n第二行 ')}${$t('important')}`;