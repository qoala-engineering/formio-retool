import plugin from 'tailwindcss/plugin';

const safeArea = plugin(({ matchUtilities, theme }) => {
  const offsetUtilities = {
    'bottom-safe': (x: number) => ({
      bottom: `calc(${x} + max(env(safe-area-inset-bottom), 20px))`
    }),
    'left-safe': (x: number) => ({
      left: `calc(${x} + env(safe-area-inset-left))`
    }),
    'm-safe': (x: number) => ({
      marginBottom: `calc(${x} + max(env(safe-area-inset-bottom), 20px))`,
      marginLeft: `calc(${x} + env(safe-area-inset-left))`,
      marginRight: `calc(${x} + env(safe-area-inset-right))`,
      marginTop: `calc(${x} + env(safe-area-inset-top))`
    }),
    'mb-safe': (x: number) => ({
      marginBottom: `calc(${x} + max(env(safe-area-inset-bottom), 20px))`
    }),
    'ml-safe': (x: number) => ({
      marginLeft: `calc(${x} + env(safe-area-inset-left))`
    }),
    'mr-safe': (x: number) => ({
      marginRight: `calc(${x} + env(safe-area-inset-right))`
    }),
    'mt-safe': (x: number) => ({
      marginTop: `calc(${x} + env(safe-area-inset-top))`
    }),
    'mx-safe': (x: number) => ({
      marginLeft: `calc(${x} + env(safe-area-inset-left))`,
      marginRight: `calc(${x} + env(safe-area-inset-right))`
    }),
    'my-safe': (x: number) => ({
      marginBottom: `calc(${x} + max(env(safe-area-inset-bottom), 20px))`,
      marginTop: `calc(${x} + env(safe-area-inset-top))`
    }),
    'p-safe': (x: number) => ({
      paddingBottom: `calc(${x} + max(env(safe-area-inset-bottom), 20px))`,
      paddingLeft: `calc(${x} + env(safe-area-inset-left))`,
      paddingRight: `calc(${x} + env(safe-area-inset-right))`,
      paddingTop: `calc(${x} + env(safe-area-inset-top))`
    }),
    'pb-safe': (x: number) => ({
      paddingBottom: `calc(${x} + max(env(safe-area-inset-bottom), 20px))`
    }),
    'pl-safe': (x: number) => ({
      paddingLeft: `calc(${x} + env(safe-area-inset-left))`
    }),
    'pr-safe': (x: number) => ({
      paddingRight: `calc(${x} + env(safe-area-inset-right))`
    }),
    'pt-safe': (x: number) => ({
      paddingTop: `calc(${x} + env(safe-area-inset-top))`
    }),
    'px-safe': (x: number) => ({
      paddingLeft: `calc(${x} + env(safe-area-inset-left))`,
      paddingRight: `calc(${x} + env(safe-area-inset-right))`
    }),
    'py-safe': (x: number) => ({
      paddingBottom: `calc(${x} + max(env(safe-area-inset-bottom), 20px))`,
      paddingTop: `calc(${x} + env(safe-area-inset-top))`
    }),
    'right-safe': (x: number) => ({
      right: `calc(${x} + env(safe-area-inset-right))`
    }),
    'top-safe': (x: number) => ({
      top: `calc(${x} + env(safe-area-inset-top))`
    })
  };

  matchUtilities(offsetUtilities as any, {
    supportsNegativeValues: true,
    values: theme('spacing')
  });
});

export default safeArea;
