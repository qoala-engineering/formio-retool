const generateSizeVariant = (start: number, end: number, step = 1) => {
  const variants: { [key: string]: string } = {};
  for (let i = start; i <= end; i++) {
    variants[i] = `${i * step}`;
  }
  return variants;
};

export const spacingVariants = Object.entries(
  generateSizeVariant(0, 30, 5)
).reduce<{ [key: string]: string }>((acc, [key, value]) => {
  acc[key] = `${value}px`;
  return acc;
}, {});

export const radiusVariants = Object.entries(
  generateSizeVariant(0, 30, 2)
).reduce<{ [key: string]: string }>((acc, [key, value]) => {
  acc[key] = `${value}px`;
  return acc;
}, {});

export const sizingVariants = Object.entries(
  generateSizeVariant(0, 300, 2)
).reduce<{ [key: string]: string }>((acc, [key, value]) => {
  acc[key] = `${value}px`;
  return acc;
}, {});

export const zIndexVariants = generateSizeVariant(-100, 100, 1);
