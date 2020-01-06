import ZnTest from './test'
import ZnButton from './button'

const components = [
    ZnTest,
    ZnButton
]

const install = (Vue) => {
    if (install.installed) return
    install.installed = true
    // 注册使用组件
    components.map(component => Vue.component(component.name, component))
    // or
    // components.map(component => Vue.use(component))
}

// 检查到Vue才执行
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue)
}

export default {
    install,
    // 所有组件，必须具有 install，才能使用 Vue.use()
    ...components
}