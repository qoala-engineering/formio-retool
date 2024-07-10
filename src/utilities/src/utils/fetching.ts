type VALID_TYPES = boolean | null | number | string | undefined;

export const buildQueryParameters = (data: {
  [key: number | string]: Array<VALID_TYPES> | VALID_TYPES;
}) => {
  const params = new URLSearchParams();

  Object.entries(data).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((subValue) => {
        if (subValue !== '' && subValue !== null && subValue !== undefined) {
          params.append(key, subValue.toString());
        }
      });
    } else if (value !== '' && value !== null && value !== undefined) {
      params.append(key, value.toString());
    }
  });

  return params.toString();
};

export const generateUrlWithParams = (
  url: string,
  data: { [key: number | string]: Array<VALID_TYPES> | VALID_TYPES }
) => {
  if (!url) return url;
  const queryParams = buildQueryParameters(data);
  return `${url}?${queryParams}`;
};

export const separateURLAndParams = (url: string = '') => {
  if (!url) return null;
  const [path, searchParams] = url.split('?');
  return { url: path, searchParams };
};
