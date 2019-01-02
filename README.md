# 用来放UI组件代码和图片的地方。 


Login实例的props就是一个空对象，因为我在APP.js里就没有给它传什么字段，Login被调用的地方：
class App extends Component { // create-react-app 自带的APP.js
  render() {
    return (
      <div className="App">
        <Login />
      </div>
    )
  }
}

原来props指的并不是单纯的在JSX语法里给的字段集合，其中的children字段代表的是在JSX语法中组件实例的子元素。看看编译后的JS吧。
function render() {
  return React.createElement(
    Form,
    { defaultValue: { username: '' } },
    React.createElement(Field, { name: 'username', placeholder: '请输入用户名')
  );
}

// createElement代码猜想
React.createElement = function(Element, props, ...children) {
  const Component = new Element(props)
  Component.props = { ...props } // 复制一份props
  if (children.length !== 0）{
    if (children.length === 1)
      Component.props.children = children[0]
    else
      Component.props.children = children
  }
  ...
}

怪不得JSX语法限定组件返回的ReactElement直系子元素必须只能有一个，Form实例，只是作为Login实例调用render最终返回的值而已，自身并没有和它有什么关系，写到这里发现，什么框架原理深究下去就只是一些程序的常识，写完后……第二天发现在Reconciliation – React也提到了render所做的事情（props之类的没有，也许作者认为这不需要特地去讲，我之前对props.children这个就有偏差），现在如果这个createElement最终返回的就是这个实例对象的话那就好办了 ，只要在render中保留Form实例的引用就可以了，嗯……看起来似乎可行，我这里还是直接提前说了吧，render返回的并不是而是经过包装过的Component对象。


log记录

不过我在字段中发现了，_self这个字段通常保存的的不就是this吗，然而后面紧跟着的Login字符却打消了我的念头……保存的是Login的this，外部在渲染返回的虚拟Dom和Component实例是。 只要React不刻意暴露出来，除非修改源码，否则开发者应该是拿不到的，
在这里我就大胆地假设，React进行DOM-DIFF对比是以有状态组件为单位进行的。 component对外是不透明的，外面的这层包装的作用就是最终把各个Component拼成一个整体，不过如果开了子元素state的口子，可能在实际开发中，React应用就会被开发者变成“双向数据流”了。因为setState本身是异步执行，奇技淫巧的方法并没有什么办法能够保证是在最后一次调用setState执行完成后，再去取state，很容易就造成滞后。
