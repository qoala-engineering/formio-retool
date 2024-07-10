import React, { useState } from 'react';
import { ReactComponent } from '@formio/react';
import ReactDOM from 'react-dom';
import settingsForm from './settings';
import RadioGroup from '../../base/RadioGroup';

const RadioGroupWrapper = (props) => {
  const [value, setValue] = useState(props.value || undefined);

  const updateValue = (e) => {
    const {
      target: { value }
    } = e;
    setValue(value);
    props.onChange(value);
  };

  const options =
    props.component?.data?.json || props.component?.data?.values || [];
  const label = props.component.hideComponentLabel ? '' : props.component.label;
  return (
    <RadioGroup
      {...props.component}
      label={label}
      options={options}
      value={value}
      onChange={updateValue}
    />
  );
};

export default class RadioGroupComponent extends ReactComponent {
  /**
   * This function tells the form builder about your component. It's name, icon and what group it should be in.
   *
   * @returns {{title: string, icon: string, group: string, documentation: string, weight: number, schema: *}}
   */
  static get builderInfo() {
    return {
      title: 'RadioGroupComponent',
      icon: 'calendar',
      group: 'Advanced',
      documentation: '',
      weight: 0,
      schema: RadioGroupComponent.schema()
    };
  }

  /**
   * This function is the default settings for the component. At a minimum you want to set the type to the registered
   * type of your component (i.e. when you call Components.setComponent('type', MyComponent) these types should match.
   *
   * @param sources
   * @returns {*}
   */
  static schema() {
    return ReactComponent.schema({
      type: 'radioGroupComponent',
      label: 'Default label',
      hideLabel: true
    });
  }

  /*
   * Defines the settingsForm when editing a component in the builder.
   */

  static editForm = settingsForm;

  /**
   * This function is called when the DIV has been rendered and added to the DOM. You can now instantiate the react component.
   *
   * @param DOMElement
   * #returns ReactInstance
   */
  attachReact(element) {
    return ReactDOM.render(
      <RadioGroupWrapper
        component={this.component} // These are the component settings if you want to use them to render the component.
        value={this.dataValue} // The starting value of the component.
        onChange={this.updateValue} // The onChange event to call when the value changes.
      />,
      element
    );
  }

  /**
   * Automatically detach any react components.
   *
   * @param element
   */
  detachReact(element) {
    if (element) {
      ReactDOM.unmountComponentAtNode(element);
    }
  }
}
