import selectEditForm from 'formiojs/components/select/Select.form';

export default (...extend) => {
  return selectEditForm(
    [
      {
        key: 'display',
        components: [
          {
            type: 'textfield',
            input: true,
            label: 'placeholder',
            weight: 0,
            key: 'placeholder'
          },
          {
            input: true,
            label: 'max height',
            weight: 0,
            key: 'maxHeight',
            type: 'number'
          },
          {
            type: 'checkbox',
            input: true,
            label: 'searchable',
            weight: 0,
            key: 'searchable'
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
