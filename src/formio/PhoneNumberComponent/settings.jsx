import baseEditForm from 'formiojs/components/textfield/TextField.form';

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
