import { defineConfig, presetUno } from 'unocss'

import transformerVariantGroup from '@unocss/transformer-variant-group'
import { preset } from './src/preset/index.mjs'
import { colors } from './src/preset/colors.js'
import { presetScrollbar } from 'unocss-preset-scrollbar'

const cutOffBrackets = v =>
    v.indexOf('[') === 0 && v.indexOf(']') === v.length - 1 ? v.slice(1, -1) : v
const allowedUnits =
    'cm,mm,Q,in,pc,pt,px,em,rem,ex,ch,lh,rlh,vw,vh,vmin,vmax,vb,vi,svw,svh,lvw,lvh,dvw,dvh'
const defaultUnit = 'rem'
const hasUnit = v => allowedUnits.split(',').some(u => v.endsWith(u))
const valWithUnit = v => {
    const withoutBrackets = cutOffBrackets(v)
    if (hasUnit(withoutBrackets)) {
        return withoutBrackets
    } else {
        return `${withoutBrackets}${defaultUnit}`
    }
}

export default defineConfig({
    rules: [
        [
            /^un-grid-auto-fill-([[.\d\w\]]+)$/,
            ([, d]) => ({
                'grid-template-columns': `repeat(auto-fill, minmax(${valWithUnit(d)}, 1fr))`
            })
        ],
        [
            /^un-grid-auto-fit-([[.\d\w\]]+)$/,
            ([, d]) => ({
                'grid-template-columns': `repeat(auto-fit, minmax(${valWithUnit(d)}, 1fr))`
            })
        ]
    ],
    theme: {
        colors
    },
    shortcuts: [
        [
            /^busy-text-(.*)$/,
            ([, c]) => `un-relative 
        un-select-none un-overflow-hidden un-border-rounded 
        before:un-animate-spin 
        before:un-border-opacity-90 
        before:un-border-t-transparent  
        before:un-border-r-${c} 
        before:un-border-b-${c} 
        before:un-border-l-${c} 
        before:un-border-rounded-full 
        before:un-border-solid 
        before:un-border-3 
        before:un-content-empty 
        before:un-h-1.5rem 
        before:un-w-1.5rem 
        before:un-left-50% 
        before:un-absolute 
        before:un-top-50% 
        before:un-m-t-[-0.75rem] 
        before:un-m-r-0 
        before:un-m-b-0 
        before:un-m-l-[-0.75rem]
        before:un-z-500 
        after:un-border-rounded-[3px] 
        after:un-content-empty 
        after:un-h-full 
        after:un-left-0 
        after:un-absolute 
        after:un-top-0 
        after:un-w-full 
        after:un-z-499`
        ],
        [/^busy-bg-(.*)$/, ([, c]) => `after:un-bg-${c}/70`],
        {
            'un-form-help':
                'un-inline-flex un-ml-2 un-items-center un-justify-center un-w-5 un-h-5 un-bg-slate-100 un-text-slate-600 un-rounded-full un-cursor-pointer un-transition un-duration-100 hover:un-text-slate-50 hover:un-bg-slate-600 hover:un-ease-linear',
            'un-page-header': 'un-text-xl un-font-semibold un-my-3',
            'un-card':
                'un-border un-border-solid un-border-gray-200 un-bg-white dark:un-bg-moon-800 dark:un-border-moon-700 un-rounded-sm',
            'un-card-title': 'un-text-base un-text-slate-600 dark:un-text-gray-100 un-font-medium'
        }
    ],
    presets: [
        presetUno({ prefix: 'un-' }),
        presetScrollbar({ prefix: 'un-' }),

        preset({ colors: { primary: colors.navy } })
    ],
    transformers: [transformerVariantGroup()]
})
