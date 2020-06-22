import React from 'react';
import styled from 'styled-components';

export function Input(props) {
  let inputElement = null;
  let inputClasses = ['input'];
  if (
    (props.invalid && props.shoudlValidate && props.dirty) ||
    (props.invalid && props.shoudlValidate && props.formSubmitted)
  ) {
    inputClasses.push('invalid');
  }

  const handleValue = () => {
    const updatedForm = {
      ...props.formConfig
    };

    const updatedFormElement = {
      ...updatedForm[props.indetifier]
    };

    updatedFormElement.value = '';
    updatedFormElement.dirty = false;
    updatedForm[props.indetifier] = updatedFormElement;

    props.handleForm({ updatedForm: { ...updatedForm } });
  };

  switch (props.elementType) {
    case 'input':
      inputElement = (
        <div className="input-box">
          <input
            className={inputClasses.join(' ')}
            onChange={props.changed}
            {...props.elementConfig}
            value={props.value}
          />

          {props.invalid && props.shoudlValidate && props.dirty ? (
            <div>
              <div onClick={handleValue} class="delete">
                &nbsp;
              </div>
              <div className="error-msg">
                {props.error && props.error != undefined ? <span>{props.error}</span> : null}
              </div>
            </div>
          ) : !props.invalid && props.touched ? (
            <div class="valid">&nbsp;</div>
          ) : null}
        </div>
      );
      break;
    case 'select':
      inputElement = (
        <select value={props.value} onChange={props.changed}>
          {props.elementConfig.options.map((option) => {
            return (
              <option key={option.value} value={option.value}>
                {option.displayValue}
              </option>
            );
          })}
        </select>
      );
      break;
    default:
      inputElement = <input {...props.elementConfig} value={props.value} />;
  }
  return <div>{inputElement}</div>;
}
