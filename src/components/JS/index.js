import Vue from 'vue'
import Message from './MessageBox'

export let messageBox = (function () {
  // 组件默认值
  var defaults = {
    title: '',
    content: '',
    cancel: '',
    ok: '',
    handleCancel: null,
    handleOk: null
  }
  var MyComponent = Vue.extend(Message)
  return function (options) {
    for (var attr in options) {
      defaults[attr] = options[attr]
    }
    var vm = new MyComponent({
      el: document.createElement('div'),
      data: {
        title: defaults.title,
        content: defaults.content,
        cancel: defaults.cancel,
        ok: defaults.ok
      },
      methods: {
        handleCancel () {
          defaults.handleCancel && defaults.handleCancel.call(this)
          document.body.removeChild(vm.$el)
        },
        handleOk () {
          defaults.handleOk && defaults.handleOk.call(this)
          document.body.removeChild(vm.$el)
        }
      }
    })
    document.body.appendChild(vm.$el)
  }
})()
