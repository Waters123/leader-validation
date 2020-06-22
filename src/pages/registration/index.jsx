import React, { useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Input } from '../../components/input';
import { handleForm } from '../../store/actions';
import { getFormsArray } from '../../helpers/getFormsArray';
import { checkValidity } from '../../helpers/checkValidity';

const Wrapped = styled.div`
  padding: 30px 50px 30px 50px;
  color: #fff;
  background-color: #424242;
  border-radius: 10px;
  box-shadow: 0px 0px 1px 1px rgba(0, 0, 0, 0.2);
  .invalid {
    border-bottom: 1px solid red;
  }
  .input-wrapper {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    @media (max-width: 948px) {
      justify-content: center;
    }
  }

  .input-box {
    position: relative;
    width: 425px;
  }
  .error-msg {
    position: absolute;
    content: 'dfsdf';
    width: 200px;
    border-radius: 2px;
    background: #fff;
    left: 104%;
    z-index: 99;
    top: 0;
    padding: 10px;
    color: #a21d1d;
  }
  input {
    display: block;
    height: 38px;
    outline: none;
    background: #616161;
    border: none;
    font-size: 14px;
    text-indent: 20px;
    width: 100%;
    position: relative;
    transition: all 0.2s;
    &:focus {
      background-color: #fff;
    }
  }
  .delete {
    position: absolute;
    width: 38px;
    height: 38px;
    top: 0;
    right: 0;
    z-index: 99999;
    background-image: url(https://www.lider-bet.com/gui/web/css/images/field_error.png);
    background-repeat: no-repeat;
    background-position: center center;
    cursor: pointer;
  }
  .valid {
    position: absolute;
    width: 38px;
    height: 38px;
    top: 0;
    right: 0;
    z-index: 99999;
    background-color: #bdbdbd;
    background: url(https://lider-bet.com/gui/web/css/images/field_status_accept.png) no-repeat
      center center;
  }
  label {
    display: block;
    font-family: 'lbet-mt', sans-serif;
    font-size: 18px;
    font-weight: normal;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    height: 25px;
    margin-bottom: 5px;
    margin-top: 20px;
    span {
      color: red;
    }
  }
  .birthDate {
    .birthDate-inputs {
      display: flex;
      width: 425px;
      div:not(:first-child) {
        margin-left: 24px;
      }
    }
    select {
      height: 37px;
      background: #616161;
      border: none;
      text-indent: 20px;
      font-size: 14px;
      width: 122px;
      outline: none;
      color: #fff;
      text-indent: 20px;
    }
  }
  select {
    height: 37px;
    background: #616161;
    border: none;
    text-indent: 20px;
    font-size: 14px;
    width: 425px;
    outline: none;
    color: #fff;
    text-indent: 20px;
  }
  .new_reg_fild {
    margin: 45px 0 30px;
    width: 100%;
    padding: 0 50px;
    border-bottom: 1px solid #616161;
  }

  .phone {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    width: 426px;
    select {
      width: 100px !important;
      align-self: stretch;
    }
    .input-box {
      width: 316px;
    }
    input {
      display: block;
      height: 38px;
      outline: none;
      background: #616161;
      border: none;
      font-size: 14px;
      text-indent: 20px;

      position: relative;
      -webkit-transition: all 0.2s;
      transition: all 0.2s;
    }
  }

  .form-footer {
    display: flex;
    justify-content: space-between;
    margin: 20px 0;
    button {
      background-color: #ebc340;
      background-size: 100%;
      background-image: linear-gradient(to bottom, #eb9540 0%, #ebc340 100%);
      color: #482800 !important;
      padding: 10px 25px;
      outline: none;
      cursor: pointer;
      border-radius: 5px;
    }
    input {
      width: 25px;
      height: 25px;
      margin-right: 5px;
    }
    .chekbox {
      display: flex;
      align-items: center;
    }
  }

  h2 {
    color: green;
    font-size: 15px;
  }

  h3 {
    color: red;
    font-size: 15px;
  }
`;

export function Form({ formConfig, handleForm, formIsValid }) {
  const [isValidated, setIsValidated] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const handleChekbox = () => {
    setIsChecked((prev) => !prev);
  };

  const inputChangeHandler = (event, indetifier) => {
    const updatedForm = {
      ...formConfig
    };

    const updatedFormElement = {
      ...updatedForm[indetifier]
    };
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation,
      formConfig
    );
    updatedFormElement.touched = true;
    updatedFormElement.dirty = updatedFormElement.value.length > 0;
    updatedForm[indetifier] = updatedFormElement;

    let formIsValid = true;
    for (let inputIdentifier in updatedForm) {
      formIsValid = updatedForm[inputIdentifier].valid && formIsValid;
    }
    handleForm({ updatedForm: { ...updatedForm }, formIsValid: formIsValid });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (formIsValid && isChecked) {
      setIsValidated(true);
      const formData = {
        userName: formConfig.userName.value,
        name: formConfig.name.value,
        surName: formConfig.surName.value,
        country: formConfig.country.value,
        residenceID: formConfig.residenceId.value,
        phone: `(${formConfig.phonePrefix.value})${formConfig.phone.value}`,
        password: formConfig.password.value,
        email: formConfig.email.value,
        birthDate: `${formConfig.birthDay.value}/${formConfig.birthMonth.value}/${formConfig.birthYear.value}`
      };

      console.log(formData);
    }
    setFormSubmitted(true);
  };

  return (
    <Wrapped>
      <form onSubmit={handleSubmit}>
        <div className="input-wrapper">
          <div>
            <label>
              მომხმარებლის სახელი<span>*</span>
            </label>
            <Input
              invalid={!formConfig.userName.valid}
              shoudlValidate={formConfig.userName.validation}
              elementType={formConfig.userName.elementType}
              elementConfig={formConfig.userName.elementConfig}
              value={formConfig.userName.value}
              touched={formConfig.userName.touched}
              dirty={formConfig.userName.dirty}
              formIsValid={formIsValid}
              formSubmitted={formSubmitted}
              changed={(event) => inputChangeHandler(event, formConfig.userName.name)}
              error={formConfig.userName.error}
              handleForm={handleForm}
              indetifier={formConfig.userName.name}
              formConfig={formConfig}
            />
          </div>
          <div className="birthDate">
            <div>
              <label>
                დაბადების თარიღი <span>*</span>
              </label>
            </div>
            <div className="birthDate-inputs">
              <Input
                invalid={!formConfig.birthDay.valid}
                shoudlValidate={formConfig.birthDay.validation}
                elementType={formConfig.birthDay.elementType}
                elementConfig={formConfig.birthDay.elementConfig}
                value={formConfig.birthDay.value}
                touched={formConfig.birthDay.touched}
                dirty={formConfig.birthDay.dirty}
                formIsValid={formIsValid}
                formSubmitted={formSubmitted}
                changed={(event) => inputChangeHandler(event, formConfig.birthDay.name)}
                error={formConfig.birthDay.error}
              />
              <Input
                invalid={!formConfig.birthMonth.valid}
                shoudlValidate={formConfig.birthMonth.validation}
                elementType={formConfig.birthMonth.elementType}
                elementConfig={formConfig.birthMonth.elementConfig}
                value={formConfig.birthMonth.value}
                touched={formConfig.birthMonth.touched}
                dirty={formConfig.birthMonth.dirty}
                formIsValid={formIsValid}
                formSubmitted={formSubmitted}
                changed={(event) => inputChangeHandler(event, formConfig.birthMonth.name)}
                error={formConfig.birthMonth.error}
              />
              <Input
                invalid={!formConfig.birthYear.valid}
                shoudlValidate={formConfig.birthYear.validation}
                elementType={formConfig.birthYear.elementType}
                elementConfig={formConfig.birthYear.elementConfig}
                value={formConfig.birthYear.value}
                touched={formConfig.birthYear.touched}
                dirty={formConfig.birthYear.dirty}
                formIsValid={formIsValid}
                formSubmitted={formSubmitted}
                changed={(event) => inputChangeHandler(event, formConfig.birthYear.name)}
                error={formConfig.birthYear.error}
              />
            </div>
          </div>
          <div>
            <label>
              პაროლი <span>*</span>
            </label>
            <Input
              invalid={!formConfig.password.valid}
              shoudlValidate={formConfig.password.validation}
              elementType={formConfig.password.elementType}
              elementConfig={formConfig.password.elementConfig}
              value={formConfig.password.value}
              label={formConfig.password.label}
              touched={formConfig.password.touched}
              dirty={formConfig.password.dirty}
              formIsValid={formIsValid}
              formSubmitted={formSubmitted}
              changed={(event) => inputChangeHandler(event, formConfig.password.name)}
              error={formConfig.password.error}
              handleForm={handleForm}
              indetifier={formConfig.password.name}
              formConfig={formConfig}
            />
          </div>
          <div>
            <label>
              გაიმეორე პაროლი <span>*</span>
            </label>

            <Input
              invalid={!formConfig.passwordConfirm.valid}
              shoudlValidate={formConfig.passwordConfirm.validation}
              elementType={formConfig.passwordConfirm.elementType}
              elementConfig={formConfig.passwordConfirm.elementConfig}
              label={formConfig.passwordConfirm.label}
              value={formConfig.passwordConfirm.value}
              touched={formConfig.passwordConfirm.touched}
              dirty={formConfig.passwordConfirm.dirty}
              formIsValid={formIsValid}
              formSubmitted={formSubmitted}
              changed={(event) => inputChangeHandler(event, formConfig.passwordConfirm.name)}
              error={formConfig.passwordConfirm.error}
              handleForm={handleForm}
              indetifier={formConfig.passwordConfirm.name}
              formConfig={formConfig}
            />
          </div>
          <div class="new_reg_fild" style={{ marginTop: '20px 20px;width: 100%' }}></div>
          <div>
            <label>
              ქვეყანა <span>*</span>
            </label>
            <Input
              invalid={!formConfig.country.valid}
              shoudlValidate={formConfig.country.validation}
              elementType={formConfig.country.elementType}
              elementConfig={formConfig.country.elementConfig}
              value={formConfig.country.value}
              touched={formConfig.country.touched}
              dirty={formConfig.country.dirty}
              formIsValid={formIsValid}
              formSubmitted={formSubmitted}
              changed={(event) => inputChangeHandler(event, formConfig.country.name)}
              error={formConfig.country.error}
            />
          </div>
          <div>
            <label>
              პირადობა <span>*</span>
            </label>

            <Input
              invalid={!formConfig.residenceId.valid}
              shoudlValidate={formConfig.residenceId.validation}
              elementType={formConfig.residenceId.elementType}
              elementConfig={formConfig.residenceId.elementConfig}
              label={formConfig.residenceId.label}
              value={formConfig.residenceId.value}
              touched={formConfig.residenceId.touched}
              dirty={formConfig.residenceId.dirty}
              formIsValid={formIsValid}
              formSubmitted={formSubmitted}
              changed={(event) => inputChangeHandler(event, formConfig.residenceId.name)}
              error={formConfig.residenceId.error}
              handleForm={handleForm}
              indetifier={formConfig.residenceId.name}
              formConfig={formConfig}
            />
          </div>
          <div>
            <label>
              სახელი <span>*</span>
            </label>
            <Input
              invalid={!formConfig.name.valid}
              shoudlValidate={formConfig.name.validation}
              elementType={formConfig.name.elementType}
              elementConfig={formConfig.name.elementConfig}
              label={formConfig.name.label}
              value={formConfig.name.value}
              touched={formConfig.name.touched}
              dirty={formConfig.name.dirty}
              formIsValid={formIsValid}
              formSubmitted={formSubmitted}
              changed={(event) => inputChangeHandler(event, formConfig.name.name)}
              error={formConfig.name.error}
              handleForm={handleForm}
              indetifier={formConfig.name.name}
              formConfig={formConfig}
            />
          </div>
          <div>
            <label>
              გვარი <span>*</span>
            </label>
            <Input
              invalid={!formConfig.surName.valid}
              shoudlValidate={formConfig.surName.validation}
              elementType={formConfig.surName.elementType}
              elementConfig={formConfig.surName.elementConfig}
              label={formConfig.surName.label}
              value={formConfig.surName.value}
              touched={formConfig.surName.touched}
              dirty={formConfig.surName.dirty}
              formIsValid={formIsValid}
              formSubmitted={formSubmitted}
              changed={(event) => inputChangeHandler(event, formConfig.surName.name)}
              error={formConfig.surName.error}
              handleForm={handleForm}
              indetifier={formConfig.surName.name}
              formConfig={formConfig}
            />
          </div>
          <div>
            <label>ელ-ფოსტა</label>
            <Input
              invalid={!formConfig.email.valid}
              shoudlValidate={formConfig.email.validation}
              elementType={formConfig.email.elementType}
              elementConfig={formConfig.email.elementConfig}
              label={formConfig.email.label}
              value={formConfig.email.value}
              touched={formConfig.email.touched}
              dirty={formConfig.email.dirty}
              formIsValid={formIsValid}
              formSubmitted={formSubmitted}
              changed={(event) => inputChangeHandler(event, formConfig.email.name)}
              error={formConfig.email.error}
            />
          </div>
          <div>
            <label>
              ტელეფონი <span>*</span>
            </label>

            <div className="phone">
              <Input
                invalid={!formConfig.phonePrefix.valid}
                shoudlValidate={formConfig.phonePrefix.validation}
                elementType={formConfig.phonePrefix.elementType}
                elementConfig={formConfig.phonePrefix.elementConfig}
                label={formConfig.phonePrefix.label}
                value={formConfig.phonePrefix.value}
                touched={formConfig.phonePrefix.touched}
                dirty={formConfig.phonePrefix.dirty}
                formIsValid={formIsValid}
                formSubmitted={formSubmitted}
                changed={(event) => inputChangeHandler(event, formConfig.phonePrefix.name)}
                error={formConfig.phonePrefix.error}
              />
              <Input
                invalid={!formConfig.phone.valid}
                shoudlValidate={formConfig.phone.validation}
                elementType={formConfig.phone.elementType}
                elementConfig={formConfig.phone.elementConfig}
                value={formConfig.phone.value}
                touched={formConfig.phone.touched}
                dirty={formConfig.phone.dirty}
                formIsValid={formIsValid}
                formSubmitted={formSubmitted}
                changed={(event) => inputChangeHandler(event, formConfig.phone.name)}
                error={formConfig.phone.error}
                handleForm={handleForm}
                indetifier={formConfig.phone.name}
                formConfig={formConfig}
              />
            </div>
          </div>
        </div>
        <div className="form-footer">
          <div className="chekbox">
            <input
              onClick={handleChekbox}
              type="checkbox"
              name="checked"
              id="checked"
              checked={isChecked}
            ></input>
            <span>
              მე შემისრულდა 18 წელი, ვეთახმები ონლაინ ტოტალიზატორ LEADER-BET.COM -ის წესებს და
              პირობებს
            </span>
          </div>

          <button type="submit">Submit</button>
        </div>
      </form>
      {isValidated && formIsValid ? (
        <h2>წარმატებით გაიარეთ რეგისტრაცია, კონსოლში დაილოგა ობიექტი</h2>
      ) : formSubmitted && !formIsValid ? (
        <h3>გაასწორეთ შეცდომები</h3>
      ) : null}
    </Wrapped>
  );
}

const mapStateToProps = (state) => {
  return {
    formConfig: state.formConfig,
    formIsValid: state.formIsValid
  };
};

export default connect(mapStateToProps, { handleForm })(Form);
