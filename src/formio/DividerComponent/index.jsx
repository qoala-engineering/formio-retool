import React from 'react';
import { ReactComponent } from '@formio/react';
import ReactDOM from 'react-dom';
import clsx from 'clsx';
import settingsForm from './settings';

export default class DividerComponent extends ReactComponent {
  /**
   * This function tells the form builder about your component. It's name, icon and what group it should be in.
   *
   * @returns {{title: string, icon: string, group: string, documentation: string, weight: number, schema: *}}
   */
  static get builderInfo() {
    return {
      title: 'DividerComponent',
      icon: 'calendar',
      group: 'Advanced',
      documentation: '',
      weight: 0,
      schema: DividerComponent.schema()
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
      type: 'dividerComponent',
      label: 'Default label',
      customClass: 'my-4',
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
      <div
        className={clsx(
          'w-full h-[1px] bg-palette-black-600/20',
          this?.component?.customClass
        )}
      ></div>,
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
