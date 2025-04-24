// JSXText
const jsx1: React.JSX.Element = <div>{$t('这是div')}</div>;
// JSXExpressionContainer => StringLiteral
const jsx2: React.JSX.Element = <div>{$t('这是str div')}</div>;
// JSXExpressionContainer => TemplateLiteral => TemplateElement
const jsx3: React.JSX.Element = <div>{`${$t('这是str tpl div')}`}</div>;