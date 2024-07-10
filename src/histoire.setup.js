import { defineSetupVue3 } from "@histoire/plugin-vue";
import { busy } from '@/directives'
import '@unocss/reset/tailwind.css'
import 'virtual:uno.css'

export const setupVue3 = defineSetupVue3(({ app, story, variant }) => {
    app.directive('busy', busy)
})