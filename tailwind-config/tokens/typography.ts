import plugin from 'tailwindcss/plugin';

export enum FontType {
  BODY = 'body',
  CAPS = 'caps',
  HEADING = 'heading'
}

export enum FontWeights {
  BOLD = 700,
  EXTRA_BOLD = 800,
  MEDIUM = 500,
  REGULAR = 400,
  SEMI_BOLD = 600,
  THIN = 300
}

const generatePtSerifTextStyle = (
  fontType = FontType.BODY,
  fontSize = 14,
  fontWeight = FontWeights.REGULAR
) => {
  const LINE_HEIGHT_MULTIPLIER = {
    [FontType.BODY]: 1.5,
    [FontType.CAPS]: 1.25,
    [FontType.HEADING]: 1.325
  };

  let letterSpacing: string | number = (() => {
    switch (fontType) {
      case FontType.HEADING:
        return -6;
      default:
        return -6;
    }
  })();
  letterSpacing = `${(letterSpacing * fontSize) / 100}px`;

  return {
    fontFamily: 'PT Serif',
    fontSize,
    fontWeight,
    letterSpacing,
    lineHeight: LINE_HEIGHT_MULTIPLIER[fontType]
  };
};

const ptSerifTypographies = {
  ...[174, 25, 19, 18, 20].reduce(
    (accum: Record<string, object>, fontSize: number) => ({
      ...accum,
      [`.pt-serif-${fontSize}`]: generatePtSerifTextStyle(
        FontType.HEADING,
        fontSize,
        FontWeights.REGULAR
      )
    }),
    {}
  )
};

const generatePoppinsTextStyle = (
  fontSize: number = 14,
  fontWeight: FontWeights = FontWeights.REGULAR,
  lineHeight = 1.5
) => {
  let letterSpacing: string | number = (() => {
    switch (fontWeight) {
      case FontWeights.REGULAR:
        return fontSize >= 14 && fontSize < 24 ? -1 : 0;
      case FontWeights.SEMI_BOLD:
        return 0.5;
      case FontWeights.MEDIUM:
        return fontSize >= 16 ? 0.5 : 0;
      default:
        return 0;
    }
  })();
  letterSpacing = `${(letterSpacing * fontSize) / 100}px`;
  return {
    fontFamily: 'Poppins',
    fontSize,
    fontWeight,
    letterSpacing,
    lineHeight
  };
};

const poppinsTypographies = {
  ...[24, 20, 15, 14, 12, 11, 10].reduce(
    (accum: Record<string, object>, fontSize: number) => ({
      ...accum,
      [`.poppins-${fontSize}`]: generatePoppinsTextStyle(
        fontSize,
        FontWeights.REGULAR
      )
    }),
    {}
  ),
  ...[26, 17, 16, 15, 14, 13, 10].reduce(
    (accum: Record<string, object>, fontSize: number) => ({
      ...accum,
      [`.poppins-m-${fontSize}`]: generatePoppinsTextStyle(
        fontSize,
        FontWeights.MEDIUM
      )
    }),
    {}
  ),
  ...[23, 17, 16, 14, 13, 12, 10].reduce(
    (accum: Record<string, object>, fontSize: number) => ({
      ...accum,
      [`.poppins-sb-${fontSize}`]: generatePoppinsTextStyle(
        fontSize,
        FontWeights.SEMI_BOLD
      )
    }),
    {}
  )
};

const generateDmSansTextStyles = (
  fontSize: number = 14,
  fontWeight: FontWeights = FontWeights.REGULAR,
  lineHeight = 1.3
) => {
  let letterSpacing: string | number = (() => {
    switch (fontWeight) {
      case FontWeights.REGULAR:
        return fontSize <= 15 ? -1 : -5;
      case FontWeights.MEDIUM:
        return fontSize <= 15 ? -1 : -5;
      case FontWeights.BOLD:
        return fontSize <= 15 ? -1 : -5;
      default:
        return 0;
    }
  })();
  letterSpacing = `${(letterSpacing * fontSize) / 100}px`;
  return {
    fontFamily: 'DM Sans',
    fontSize,
    fontWeight,
    letterSpacing,
    lineHeight
  };
};

const dmSansTypographies = {
  ...[15, 13, 12, 10].reduce(
    (accum: Record<string, object>, fontSize: number) => ({
      ...accum,
      [`.dm-sans-${fontSize}`]: generateDmSansTextStyles(
        fontSize,
        FontWeights.REGULAR,
        1.3
      )
    }),
    {}
  ),
  ...[25, 24, 20, 16, 14, 11, 10].reduce(
    (accum: Record<string, object>, fontSize: number) => ({
      ...accum,
      [`.dm-sans-m-${fontSize}`]: generateDmSansTextStyles(
        fontSize,
        FontWeights.MEDIUM,
        1.3
      )
    }),
    {}
  ),
  ...[27, 25, 18, 17, 16, 14, 13, 12, 11, 10].reduce(
    (accum: Record<string, object>, fontSize: number) => ({
      ...accum,
      [`.dm-sans-b-${fontSize}`]: generateDmSansTextStyles(
        fontSize,
        FontWeights.BOLD,
        1.3
      )
    }),
    {}
  )
};

export const fontNameSpaces = plugin(function ({ addComponents }) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  addComponents({
    ...poppinsTypographies,
    ...dmSansTypographies,
    ...ptSerifTypographies
  } as any);
});
