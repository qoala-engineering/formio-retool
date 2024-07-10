import baseEditForm from 'formiojs/components/number/Number.form';

export default (...extend) => {
  return baseEditForm(
    [
      {
        key: 'display',
        components: [
          {
            type: 'textfield',
            input: true,
            label: 'Sub Label',
            weight: 0,
            key: 'sublabel'
          },
          {
            input: true,
            label: 'Minimum value',
            weight: 0,
            key: 'min',
            type: 'number'
          },
          {
            input: true,
            label: 'Maximum value',
            weight: 0,
            key: 'max',
            type: 'number'
          },
          {
            input: true,
            label: 'hide component label',
            weight: 0,
            key: 'hideComponentLabel',
            type: 'checkbox'
          }
        ]
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
