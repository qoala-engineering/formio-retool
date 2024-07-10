import React, { useState } from 'react';
import { ReactComponent } from '@formio/react';
import ReactDOM from 'react-dom';
import settingsForm from './settings';
import PhoneNumberInput from '../../base/PhoneNumberInput';

const PhoneNumberInputWrapper = (props) => {
  const [value, setValue] = useState(props.value || '');

  const updateValue = (e) => {
    const {
      target: { value }
    } = e;
    setValue(value);
    props.onChange(value);
  };

  const label = props.component.hideComponentLabel ? '' : props.component.label;
  return (
    <PhoneNumberInput
      {...props.component}
      label={label}
      value={value}
      onChange={updateValue}
    />
  );
};

export default class PhoneNumberComponent extends ReactComponent {
  /**
   * This function tells the form builder about your component. It's name, icon and what group it should be in.
   *
   * @returns {{title: string, icon: string, group: string, documentation: string, weight: number, schema: *}}
   */
  static get builderInfo() {
    return {
      title: 'PhoneNumberComponent',
      icon: 'calendar',
      group: 'Advanced',
      documentation: '',
      weight: 0,
      schema: PhoneNumberComponent.schema()
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
      type: 'phoneNumberComponent',
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
      <PhoneNumberInputWrapper
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
