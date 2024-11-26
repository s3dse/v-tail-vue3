import { definePreset, presetIcons, presetUno } from 'unocss'
import { colors } from './colors.js'
import { icons } from './icons.js'
import presetTheme from 'unocss-preset-theme'
import { presetScrollbar } from 'unocss-preset-scrollbar'

const Theme = presetUno().theme

const preset = definePreset(({primary}) => {
    return {
        name: 'v-tail-vue3-preset',
        theme: { colors },
        shortcuts: {
            'border-base': 'un-border-border'
        },
        presets: [
            presetIcons({
                collections: {
                    custom: icons
                }
            }),
            presetTheme({
                theme: {
                    dark: {
                        colors: {
                            primary,
                            background: colors.moon[900],
                            border: colors.moon[700],
                            inputfield: colors.moon[900],
                            thead: colors.moon[900]
                        }
                    },
                    light: {
                        colors: {
                            primary,
                            background: Theme.colors.gray[50],
                            border: Theme.colors.gray[200],
                            inputfield: Theme.colors.white,
                            thead: Theme.colors.slate[100]
                        }
                    }
                }
            })
        ]
    }
})

export { preset }
