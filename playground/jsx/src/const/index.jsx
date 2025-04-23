const s1 = ''
const s2 = ' '
const s3 = '换1\n行'
const s4 = '换2\\n行'
const s5 = `换1\n行`
const s6 = `换2\\n行`
const str = '测试'
const strCall = $t('测试 call')
const strOptionalCall = $t?.('测试 optional call')
const strTplCall = $t(`测试 tpl call`)
const strTplOptionalCall = $t?.(`测试 tpl optional call`)
// 这是注释1
// 这是注释2
/** 这是注释3 */
const a = 1
const b = '你好'
const c = a + `哈哈-${b} 哈哈`
const d = 0 || '二元 right 侧'
const e = '二元 left 侧' || 0
const f = true ? '三元 left 侧' : 0
const g = false ? 0 : `三元 right 侧`
const 中文变量 = '中文变量 value'

const st = `第一行 ${42} ${str}
第二行 ${'important'}`