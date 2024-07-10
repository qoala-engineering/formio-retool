import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { ReactComponent } from '@formio/react';
import settingsForm from './settings';
import DateRangePicker from '../../base/DateRangePicker';

const DateRangeWrapper = (props) => {
  const [value, setValue] = useState(props.value || undefined);

  const updateValue = (e) => {
    const { value } = e.target;
    setValue(value);
    props.onChange(value);
  };

  const label = props.component.hideComponentLabel ? '' : props.component.label;
  return (
    <DateRangePicker
      {...props.component}
      label={label}
      value={value}
      onChange={updateValue}
    />
  );
};

export default class DateRangeComponent extends ReactComponent {
  constructor(component, options, data) {
    super(component, options, data);
  }

  /**
   * This function tells the form builder about your component. It's name, icon and what group it should be in.
   *
   * @returns {{title: string, icon: string, group: string, documentation: string, weight: number, schema: *}}
   */
  static get builderInfo() {
    return {
      title: 'DateRangeComponent',
      icon: 'calendar',
      group: 'Advanced',
      documentation: '',
      weight: 0,
      schema: DateRangeComponent.schema()
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
      type: 'dateRangeComponent',
      label: 'Default label',
      format: 'DD/MM/YYYY'
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
      <DateRangeWrapper
        component={this.component}
        value={this.dataValue}
        onChange={this.updateValue}
      />,
      element
    );
  }

  getValue() {
    return this.dataValue;
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

  setValue(value) {
    if (this.reactInstance) {
      this.reactInstance.setState({
        value: value
      });
      this.shouldSetValue = false;
      this.dataValue = value;
    } else {
      this.shouldSetValue = true;
      this.dataForSetting = value;
    }
  }

  /**
   * The second phase of component building where the component is rendered as an HTML string.
   *
   * @returns {string} - The return is the full string of the component
   */
  render() {
    // For react components, we simply render as a div which will become the react instance.
    // By calling super.render(string) it will wrap the component with the needed wrappers to make it a full component.
    return super.render(`<div ref="react-${this.id}"></div>`);
  }
}
