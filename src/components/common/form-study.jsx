import React, { Component } from 'react'
// --- step - 1

export class Form extends Component {
  constructor(props) {
    super(props)
    this.state = props.defaultValue || {}
  }
  componentDidUpdate() {
    console.log('Form实例每次更新后的this', this)
    console.log('测试这两个element是同一个对象吗', this.props.test.element === this)
  }
  handleChange({ target: input }) {
    const { name, value } = input
    this.setState({ [name]: value })
  }
  render() {
    console.log('这里是Form上的this', this)
    const control = Object.assign({}, this.props.children)
    control.props = Object.assign({
      value: this.state[control.props.name],
      onChange: (e) => this.handleChange(e),
    }, control.props)
    // console.log(control)
    return (
      <form>
        {control}
      </form>
    )
  }
}

export function Field(props) {
  return <input {...props} />
}

export default {
  Form,
  Field, 
}
