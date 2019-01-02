import React, { Component } from 'react'
import { Form, Field } from './common/form-study'

// import { Form, Field, Button } from './common/form'

const api = 'http://localhost:3001/auth/login'

class Login extends Component {
  render() {
    console.log("这里是 Login 的 this", this)
    const test = {}
    const element = (
      <Form defaultValue={{ username: '' }} test={test}>
        <Field name="username" placeholder="请输入用户名" />
      </Form>)
    test.look = element
    console.log('这个是在Login上的Form', element)
    return (element
      // <Form defaultValue={{ username: '' }}>
      //   <Field name="username" placeholder="请输入用户名" />
      // </Form>
    );
  }
}

// class Login extends Component {
//   render() {
//     const config = {
//       api,
//       success: function(res) {
//         res.json()
//         .then(({ userInfo }) => {
//           localStorage.setItem('user', JSON.stringify(userInfo))
//           window.location = '/'
//         })
//       },
//       error: function(error) {
//         return { errors: {
//           [error.type]: error.message,
//         }}
//       }
//     };
//     return (
//       <h1>你好,</h1>
//       <Form
//         defaultValue={{ username: '', password: '' }}
//         config={config}
//       >
//         <Field name="username" placeholder="请输入用户名" />
//         <Field name="password" type="password" placeholder="请输入密码" />
//         <Button label="提交" />
//       </Form>
//     );
//   }
// }

export default Login;