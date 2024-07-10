import type { Config } from 'tailwindcss';

import baseConfig from './tailwind-config';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}', ...baseConfig.content],
  presets: [baseConfig.preset],
  plugins: [...baseConfig.plugins],
  important: true,
  safelist: ['mb-5', 'mt-5']
};

export default config;
