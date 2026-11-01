/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
    colors: {
        primary: {
            '50': 'hsl(248, 98%, 97%)',
            '100': 'hsl(248, 98%, 94%)',
            '200': 'hsl(248, 98%, 86%)',
            '300': 'hsl(248, 98%, 76%)',
            '400': 'hsl(248, 98%, 64%)',
            '500': 'hsl(248, 98%, 50%)',
            '600': 'hsl(248, 98%, 40%)',
            '700': 'hsl(248, 98%, 32%)',
            '800': 'hsl(248, 98%, 24%)',
            '900': 'hsl(248, 98%, 16%)',
            '950': 'hsl(248, 98%, 10%)',
            DEFAULT: '#533afd'
        },
        secondary: {
            '50': 'hsl(237, 100%, 97%)',
            '100': 'hsl(237, 100%, 94%)',
            '200': 'hsl(237, 100%, 86%)',
            '300': 'hsl(237, 100%, 76%)',
            '400': 'hsl(237, 100%, 64%)',
            '500': 'hsl(237, 100%, 50%)',
            '600': 'hsl(237, 100%, 40%)',
            '700': 'hsl(237, 100%, 32%)',
            '800': 'hsl(237, 100%, 24%)',
            '900': 'hsl(237, 100%, 16%)',
            '950': 'hsl(237, 100%, 10%)',
            DEFAULT: '#e8e9ff'
        },
        accent: {
            '50': 'hsl(20, 100%, 97%)',
            '100': 'hsl(20, 100%, 94%)',
            '200': 'hsl(20, 100%, 86%)',
            '300': 'hsl(20, 100%, 76%)',
            '400': 'hsl(20, 100%, 64%)',
            '500': 'hsl(20, 100%, 50%)',
            '600': 'hsl(20, 100%, 40%)',
            '700': 'hsl(20, 100%, 32%)',
            '800': 'hsl(20, 100%, 24%)',
            '900': 'hsl(20, 100%, 16%)',
            '950': 'hsl(20, 100%, 10%)',
            DEFAULT: '#ffe0d1'
        },
        'neutral-50': '#000000',
        'neutral-100': '#50617a',
        'neutral-200': '#ffffff',
        'neutral-300': '#64748d',
        'neutral-400': '#101010',
        'neutral-500': '#f2f7fe',
        background: '#ffffff',
        foreground: '#000000'
    },
    fontFamily: {
        sans: [
            'sohne-var',
            'sans-serif'
        ]
    },
    fontSize: {
        '8': [
            '8px',
            {
                lineHeight: '8.96px'
            }
        ],
        '9': [
            '9px',
            {
                lineHeight: 'normal'
            }
        ],
        '10': [
            '10px',
            {
                lineHeight: '15px',
                letterSpacing: '0.1px'
            }
        ],
        '11': [
            '11px',
            {
                lineHeight: '16px'
            }
        ],
        '12': [
            '12px',
            {
                lineHeight: 'normal'
            }
        ],
        '14': [
            '14px',
            {
                lineHeight: '20px'
            }
        ],
        '16': [
            '16px',
            {
                lineHeight: 'normal'
            }
        ],
        '18': [
            '18px',
            {
                lineHeight: '18px'
            }
        ],
        '20': [
            '20px',
            {
                lineHeight: '22.4px',
                letterSpacing: '-0.2px'
            }
        ],
        '22': [
            '22px',
            {
                lineHeight: 'normal'
            }
        ],
        '26': [
            '26px',
            {
                lineHeight: '29.9px',
                letterSpacing: '-0.52px'
            }
        ],
        '28': [
            '28px',
            {
                lineHeight: '29.96px',
                letterSpacing: '-0.28px'
            }
        ],
        '34': [
            '34px',
            {
                lineHeight: '35.7px',
                letterSpacing: '-0.68px'
            }
        ],
        '36': [
            '36px',
            {
                lineHeight: '41.4px',
                letterSpacing: '-0.72px'
            }
        ],
        '48': [
            '48px',
            {
                lineHeight: '49.44px',
                letterSpacing: '-0.96px'
            }
        ]
    },
    spacing: {
        '16': '32px',
        '20': '40px',
        '24': '48px',
        '26': '52px',
        '28': '56px',
        '32': '64px',
        '36': '72px',
        '56': '112px',
        '170': '340px',
        '1px': '1px'
    },
    borderRadius: {
        xs: '1px',
        sm: '4px',
        md: '8px',
        lg: '16px',
        full: '100px'
    },
    boxShadow: {
        md: 'rgba(23, 23, 23, 0.06) 0px 3px 6px 0px',
        lg: 'rgba(0, 55, 112, 0.1) 0px 6px 22px 0px, rgba(0, 59, 137, 0.02) 0px 4px 8px 0px',
        xl: 'rgba(0, 0, 0, 0.1) 0px 20.187px 40.374px -20.187px'
    },
    screens: {
        '400px': '400px',
        sm: '640px',
        md: '768px',
        '840px': '840px',
        '940px': '940px',
        '1115px': '1115px',
        xl: '1300px'
    },
    transitionDuration: {
        '0': '0s',
        '100': '0.1s',
        '120': '0.12s',
        '150': '0.15s',
        '200': '0.2s',
        '240': '0.24s',
        '250': '0.25s',
        '300': '0.3s',
        '400': '0.4s',
        '500': '0.5s',
        '600': '0.6s',
        '800': '0.8s',
        '1000': '1s'
    },
    transitionTimingFunction: {
        custom: 'cubic-bezier(0.3, 0, 0.2, 1)',
        default: 'ease',
        linear: 'linear'
    },
    container: {
        center: true,
        padding: '16px'
    },
    maxWidth: {
        container: '1266px'
    }
},
  },
};
