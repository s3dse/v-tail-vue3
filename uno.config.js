import {
    defineConfig,
    presetIcons,
    presetUno
} from 'unocss'

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
            /^tw-grid-auto-fill-([[.\d\w\]]+)$/,
            ([, d]) => ({
                'grid-template-columns': `repeat(auto-fill, minmax(${valWithUnit(d)}, 1fr))`
            })
        ],
        [
            /^tw-grid-auto-fit-([[.\d\w\]]+)$/,
            ([, d]) => ({
                'grid-template-columns': `repeat(auto-fit, minmax(${valWithUnit(d)}, 1fr))`
            })
        ]
    ],
    theme: {
        colors: {
            navy: {
                100: '#d2dee4',
                200: '#a5bdc9',
                300: '#789cae',
                400: '#4b7b93',
                500: '#1e5a78',
                600: '#184860',
                700: '#123648',
                800: '#0c2430',
                900: '#061218'
            }
        }
    },
    shortcuts: {
        'tw-form-help': 'tw-inline-flex tw-ml-2 tw-items-center tw-justify-center tw-w-5 tw-h-5 tw-bg-slate-100 tw-text-slate-600 tw-rounded-full tw-cursor-pointer tw-transition tw-duration-100 hover:tw-text-slate-50 hover:tw-bg-slate-600 hover:tw-ease-linear',
        'tw-page-header': 'tw-text-xl tw-font-semibold tw-my-3',
        'tw-card': 'tw-border tw-border-solid tw-border-gray-200 tw-bg-white tw-rounded-sm'
        
    },
    presets: [presetUno({ prefix: 'tw-' }), presetIcons()]
})
