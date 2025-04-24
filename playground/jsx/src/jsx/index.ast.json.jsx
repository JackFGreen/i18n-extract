// JSXText
const jsx1 = <div>{$t('这是div')}</div>;
// JSXExpressionContainer => StringLiteral
const jsx2 = <div>{$t('这是str div')}</div>;
// JSXExpressionContainer => TemplateLiteral => TemplateElement
const jsx3 = <div>{`${$t('这是str tpl div')}`}</div>;