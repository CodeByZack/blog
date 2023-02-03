---
title: VUE之自定义指令（Vue.directive）
url: 'https://www.yuque.com/zackdk/web/ipkgxl'
created_at: '2019-03-13 11:02'
updated_at: '2023-02-02 17:07'
---

vue有许多内部指令，比如v-on,v-bind,v-model。
当内部指令不能满足我们时，我们也可以定义一些属于自己的指令。 <a name="39e43c78"></a>

### 如何定义

    // 注册一个全局自定义指令 `v-empty`
    Vue.directive('empty', {
        bind:function(){//被绑定
             console.log('1 - bind');
        },
        inserted:function(){//绑定到节点
              console.log('2 - inserted');
        },
        update:function(){//组件更新
              console.log('3 - update');
        },
        componentUpdated:function(){//组件更新完成
              console.log('4 - componentUpdated');
        },
        unbind:function(){//解绑
              console.log('1 - bind');
        }
    });

    //有时候可能想在 bind 和 update 时触发相同行为，而不关心其它的钩子。可以进行简写。

    Vue.directive('empty', function (el, binding) {
      console.log("---简写---");
    })

<a name="416cabe3"></a>

### 钩子函数的参数

- `el`：指令所绑定的元素，可以用来直接操作 DOM 。
- `binding`：一个对象，包含以下属性：
  - `name`：指令名，不包括 v- 前缀。
  - `value`：指令的绑定值，例如：v-my-directive="1 + 1" 中，绑定值为 2。
  - `oldValue`：指令绑定的前一个值，仅在 update 和 componentUpdated 钩子中可用。无论值是否改变都可用。
  - `expression`：字符串形式的指令表达式。例如 v-my-directive="1 + 1" 中，表达式为 "1 + 1"。
  - `arg`：传给指令的参数，可选。例如 v-my-directive:foo 中，参数为 "foo"。
  - `modifiers`：一个包含修饰符的对象。例如：v-my-directive.foo.bar 中，修饰符对象为 { foo: true, bar: true }。
- `vnode`：Vue 编译生成的虚拟节点。移步 VNode API 来了解更多详情。
- `oldVnode`：上一个虚拟节点，仅在 update 和 componentUpdated 钩子中可用。

<a name="481feccf"></a>

### 如何使用

<a name="85a33544"></a>

#### 常见使用场景一

在图片未完成加载前，用随机的背景色占位，图片加载完成后才直接渲染出来。

    Vue.directive('img', function (el, binding) {
      let color = Math.floor(Math.random()*1000000);
      el.style.backgroundColor = "#"+color;
      let img = new Image();
      img.src = binding.value;
      img.onload = function(){
          el.style.backgroundImage = "url("+binding.value+")";   
      }
    })

    <div v-img="url" id="demo">
                
    </div>

<a name="489f921b"></a>

#### 常见使用场景二

常见的 tip 提示弹框的功能，鼠标移入元素，可以在元素的上下左右显示 tip，鼠标移出则隐藏 tip。

    //简单演示，正式使用，请自行完善。
    Vue.directive('tip', function (el, binding) {
      let span = document.createElement("span");
      span.style.position = "absolute";
      span.innerHTML = binding.value;
      span.style.backgroundColor = "#333333";
      span.style.borderRadius = "5px"; 
      span.style.color = "#fff"; 
      span.style.padding = "10px";
      el.onmouseover = function(){
      	el.style.position = "relative";
            el.appendChild(span);
            span.style.right = -span.clientWidth+"px";
      	span.style.top = (el.clientHeight/2-span.clientHeight/2)+"px";
      }
      el.onmouseout = function(){
        el.removeChild(span);
      }
    })

    <div v-img="url" v-tip="tip" id="demo">
                
    </div>
