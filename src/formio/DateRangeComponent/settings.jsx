import baseEditForm from 'formiojs/components/_classes/component/Component.form';

export default (...extend) => {
  return baseEditForm(
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
            type: 'select',
            choices: ['utc', 'iso', 'timestamp'],
            defaultValue: 'iso',
            input: true,
            label: 'Date result mode',
            weight: 12,
            key: 'mode',
            data: {
              values: [
                {
                  label: 'iso',
                  value: 'iso'
                },
                {
                  label: 'utc',
                  value: 'utc'
                },
                {
                  label: 'timestamp',
                  value: 'timestamp'
                }
              ]
            }
          },
          {
            type: 'textfield',
            input: true,
            label: 'name',
            weight: 0,
            key: 'name'
          },
          {
            type: 'textfield',
            input: true,
            label: 'format',
            weight: 0,
            defaultValue: 'DD/MM/YYYY',
            key: 'format'
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
