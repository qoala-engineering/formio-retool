import baseEditForm from 'formiojs/components/_classes/component/Component.form';

export default (...extend) => {
  return baseEditForm(
    [
      {
        key: 'display',
        components: [
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
