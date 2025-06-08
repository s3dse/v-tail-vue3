import { definePreset, presetIcons, presetUno } from 'unocss'
import { colors } from './colors.js'
import { icons } from './icons.js'
import { theme as t } from './theme.js'
import presetTheme from 'unocss-preset-theme'
import { presetScrollbar } from 'unocss-preset-scrollbar'

const Theme = presetUno().theme

const MATCHERS = Object.freeze({
    SELECTED_AND_HIGHLIGHTED: 'selected-and-highlighted:'
})

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
        },
        ...t
    }

    return {
        name: 'v-tail-vue3-preset',
        theme: { colors: theme.light.colors, fontFamily: { sans: '"Inter", system-ui, sans-serif'} },
        shortcuts: theme.light.shortcuts,
        presets: [
            presetIcons({
                collections: {
                    custom: icons
                }
            }),
            presetTheme({ theme })
        ],
        variants: [
            matcher => {
                if (!matcher.startsWith(MATCHERS.SELECTED_AND_HIGHLIGHTED)) {
                    return matcher
                }
                return {
                    matcher: matcher.slice(MATCHERS.SELECTED_AND_HIGHLIGHTED.length),
                    selector: s => `${s}[data-state="checked"][data-highlighted]`
                }
            }
        ],
        autocomplete: {
            templates: [
                MATCHERS.SELECTED_AND_HIGHLIGHTED
            ]
        }
    }
})

export default presetVTail
