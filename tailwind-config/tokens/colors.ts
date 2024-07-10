const addDefault = (
  colorDefinition: { [key: string]: string },
  defaultKey = '500'
) => {
  return {
    DEFAULT: colorDefinition[defaultKey] as string,
    ...colorDefinition
  };
};

export const colorPalette = {
  'floral-white': '#FCF8F3',
  'primary-color': addDefault({ '500': '#1E3C57' }),
  'palette-white': addDefault({
    '400': '#FBFBFB',
    '500': '#FFFFFF'
  }),
  'palette-black': addDefault({
    '500': '#0D0D0D',
    '600': '#000000'
  }),
  'palette-dark-blue': addDefault({
    '400': '#002133',
    '500': '#111A1F'
  }),
  'palette-light-blue': addDefault({
    '300': '#CBFBFE',
    '500': '#6FCADB'
  }),
  'palette-light-gray': addDefault({
    '400': '#E6E6E6',
    '500': '#D9D9D9'
  }),
  'palette-info': addDefault({
    '500': '#0E68B9'
  }),
  'palette-success': addDefault({
    '500': '#0AA619'
  })
};
