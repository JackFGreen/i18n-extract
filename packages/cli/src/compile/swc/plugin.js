const { Visitor } = require('@swc/core/Visitor')

// 使用继承的方式来 override 自定义 visit 函数，需要返回修改后的节点（所以实际上可能是 Fold）
class MyVisitor extends Visitor {
  // 重载函数表示覆盖默认行为
  visitIdentifier(id) {
    console.log(`>>>identifier = ${id.value}`)
    return id
  }
  // visitStatement(stmt) {
  //   console.log('>>>comment',stmt.leadingComments,stmt.trailingComments)
  //   console.log(`>>>statement = ${stmt.type}`)
  //   return stmt
  // }
  visitExpression(stmt) {
    console.log('>>>comment',stmt.leadingComments,stmt.trailingComments)
    console.log(`>>>statement = ${stmt.type}`)
    return stmt
  }
  // 如果没有重载函数，默认就是递归访问 children 的逻辑
  // visitProgram(program) {
  //   // 当然也可以使用 super 来手动调用访问 children 的逻辑
  //   return super.visitProgram(program)
  // }
}

module.exports = {
  MyVisitor,
}
