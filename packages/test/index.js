import ZnTest from './src/test'

ZnTest.install = Vue => {
    Vue.component(ZnTest.name, ZnTest)
}

export default ZnTest