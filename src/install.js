import * as components from './components'

const VTail = {
    install(Vue) {
        Object.keys(components).forEach(key => {
            Vue.component(key, components[key])
        })
    }
}

export default VTail

export * from './components'
export * from './directives'