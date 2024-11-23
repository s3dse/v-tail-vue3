import { definePreset } from 'unocss'

const preset = definePreset(() => {
    return {
        name: 'v-tail-vue3-preset',
        theme: {
            colors: {
                moon: {
                    100: '#b6cbe7',
                    200: '#6b95d2',
                    300: '#4f76a7',
                    400: '#43648d',
                    500: '#3c597e',
                    600: '#293d57',
                    700: '#1f2e41',
                    800: '#182433',
                    900: '#151f2c'
                },
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
        }
    }
})

export { preset }
