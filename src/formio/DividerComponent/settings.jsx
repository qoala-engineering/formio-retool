import baseEditForm from 'formiojs/components/number/Number.form';

export default (...extend) => {
  return baseEditForm(
    [
      {
        key: 'display',
        components: []
      },
      {
        key: 'data',
        components: []
      },
      {
        key: 'validation',
        components: []
      },
      {
        key: 'api',
        components: []
      },
      {
        key: 'conditional',
        components: []
      },
      {
        key: 'logic',
        components: []
      }
    ],
    ...extend
  );
};
