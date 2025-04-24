const s1: string = ''
const s2: string = ' '
const s3: string = '换1\n行'
const s4: string = '换2\\n行'
const s5: string = `换1\n行`
const s6: string = `换2\\n行`
const str: string = '测试'
const strCall: string = $t('测试 call')
const strOptionalCall: string = $t?.('测试 optional call')
const strTplCall: string = $t(`测试 tpl call`)
const strTplOptionalCall: string = $t?.(`测试 tpl optional call`)
// 这是注释1
// 这是注释2
/** 这是注释3 */
/**
 * 这是注释4
 */
const a: string = 1
const b: string = '你好'
const c: string = a + `哈哈-${b} 哈哈`
const d: string = 0 || '二元 right 侧'
const e: string = '二元 left 侧' || 0
const f: string = true ? '三元 left 侧' : 0
const g: string = false ? 0 : `三元 right 侧`
const 中文变量: string = '中文变量 value'

const st: string = `第一行 ${42} ${str}
第二行 ${'important'}`
