export const replacePlaceholders = (str: string, ...args: string[]) => {
  return str.replace(/{([0-9]+)}/g, (match, index) => {
    return typeof args[index] === 'undefined' ? match : args[index]!;
  });
};

export const convertCamelToSpace = (str: string) =>
  str.replaceAll(/[A-Z]/g, ' $1').toLowerCase();
