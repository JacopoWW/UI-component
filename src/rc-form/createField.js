class FieldStore { // 生成一个储存表单数据的结构
  constructor(fields) {
    this.fields = fields.slice() // 复制一份数组，表格字段
    this.fieldsMeta = {}
  }
  updateFields(fields) { // 更新数据
    this.fields = fields
  }
  
}