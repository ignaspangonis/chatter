const SPACING_VALUES = {
  'x-small': '2px',
  small: '4px',
  regular: '8px',
  medium: '12px',
  large: '16px',
  'x-large': '24px',
  'x2-large': '32px',
  'x3-large': '48px',
  'x4-large': '64px',
  'x5-large': '96px',
  'x6-large': '128px',

  // NOT PART OF DESIGN SYSTEM
  'x7-large': '256px',
  'x8-large': '512px',
}

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],

  theme: {
    colors: {
      primary: '#570DF8',
      secondary: '#F000B8',
      accent: '#37CDBE',
      neutral: '#3D4451',
      'base-100': '#FFFFFF',
      info: '#3ABFF8',
      success: '#36D399',
      warning: '#FBBD23',
      error: '#F87272',

      // Grayscale
      cg1: '#171717',
      cg2: '#4D4D4D',
      cg3: '#757575',
      cg4: '#999999',
      cg5: '#C9C9C9',
      cg6: '#F2F2F2',
      cg7: '#FFFFFF',
    },
    spacing: SPACING_VALUES,
    maxWidth: SPACING_VALUES,
    screens: {
      phones: { max: '720px' },
      portables: { max: '959px' },
      tablets: { min: '721px', max: '959px' },
      'tablets-up': { min: '721px' },
      desktops: { min: '960px' },
      wide: { min: '1200px' },
    },
    boxShadow: {
      regular: '0 0 2px rgba(17, 17, 17, 0.24)',
      lifted: '0 1px 4px rgba(17, 17, 17, 0.16)',
      elevated: '0 8px 24px rgba(17, 17, 17, 0.24)',
    },
    extend: {
      fontSize: {
        h01: ['21px', '28px'],
        h02: ['24px', '36px'],
        h03: ['32px', '43px'],
        h04: ['42px', '58px'],
        h05: ['64px', '85px'],

        body: ['20px', '31px'],
        title: ['16px', '22px'],
        caption: ['12px', '16px'],

        // Mobile web sizes
        'm-h01': ['21px', '28px'],
        'm-h02': ['20px', '28px'],
        'm-h03': ['24px', '36px'],
        'm-h04': ['32px', '48px'],
        'm-h05': ['46px', '58px'],
        'm-body': ['16px', '24px'],
      },

      aspectRatio: {
        '4/3': '4 / 3',
      },

      outline: {
        default: '1px solid #09B1BA80',
      },

      zIndex: {
        below: -1,
        none: 0,
        bump: 1,
        small: 5,
        medium: 10,
        large: 20,
        dropdown: 100000,
        header: 100010,
        'above-header': 100015,
        overlay: 100020,
        'above-overlay': 100025,
      },
    },
  },
  plugins: [require('daisyui')],
}
