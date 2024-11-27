import { definePreset, presetIcons, presetUno } from 'unocss'
import { colors } from './colors.js'
import { icons } from './icons.js'
import presetTheme from 'unocss-preset-theme'
import { presetScrollbar } from 'unocss-preset-scrollbar'

const Theme = presetUno().theme

const presetVTail = definePreset(options => {
    const givenColors = options?.colors || {}
    const mergedColors = { ...colors, ...givenColors }
    if (!mergedColors.primary) {
        mergedColors.primary = colors.navy
    }

    const theme = {
        dark: {
            colors: {
                primary: mergedColors.primary,
                background: colors.moon[900],
                border: colors.moon[700],
                inputfield: colors.moon[900],
                thead: colors.moon[900]
            }
        },
        light: {
            colors: {
                primary: mergedColors.primary,
                background: Theme.colors.gray[50],
                border: Theme.colors.gray[200],
                inputfield: Theme.colors.white,
                thead: Theme.colors.slate[100]
            }
        }
    }

    return {
        name: 'v-tail-vue3-preset',
        theme: { colors: mergedColors },
        shortcuts: {
            'border-base': 'un-border-border'
        },
        presets: [
            presetIcons({
                collections: {
                    custom: icons
                }
            }),
            presetTheme({ theme })
        ]
    }
})

export default presetVTail
