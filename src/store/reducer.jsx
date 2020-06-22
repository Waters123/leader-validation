const initialState = {
  formConfig: {
    userName: {
      name: 'userName',
      elementType: 'input',
      label: 'მომხმარებლის სახელი',
      elementConfig: {
        type: 'text',
        placeholder: 'You Name'
      },
      value: '',
      validation: {
        required: true,
        minLength: 4
      },
      error: 'სახელი უნდა შედგებოდეს 4 სიმბოლოსგან',
      valid: false,
      touched: false,
      dirty: false
    },
    birthDay: {
      name: 'birthDay',
      label: 'birthDay',
      elementType: 'select',
      elementConfig: {
        options: [
          { value: '1', displayValue: '1' },
          { value: '2', displayValue: '2' }
        ]
      },
      value: '',
      validation: { required: true },
      valid: true,
      touched: false
    },
    birthMonth: {
      name: 'birthMonth',
      label: 'birthDay',
      elementType: 'select',
      elementConfig: {
        options: [
          { value: '01', displayValue: 'იანვარი' },
          { value: '02', displayValue: 'თებერვალი' }
        ]
      },
      value: '',
      validation: { required: true },
      valid: true,
      touched: false
    },
    birthYear: {
      name: 'birthYear',
      label: 'birthDay',
      elementType: 'select',
      elementConfig: {
        options: [
          { value: '1990', displayValue: '1990' },
          { value: '1991', displayValue: '1991' }
        ]
      },
      value: '',
      validation: { required: true },
      valid: true,
      touched: false
    },
    password: {
      name: 'password',
      label: 'პაროლი',
      elementType: 'input',
      elementConfig: {
        type: 'password',
        placeholder: 'password'
      },
      value: '',
      error: 'პაროლი უნდა შედგებოდეს 6 ასოსგან',
      validation: {
        required: true,
        minLength: 6
      },
      valid: false,
      touched: false
    },
    passwordConfirm: {
      name: 'passwordConfirm',
      label: 'გაიმეორე პაროლი',
      elementType: 'input',
      elementConfig: {
        type: 'password',
        placeholder: 'password'
      },
      value: '',
      error: 'პაროლები არ ემთხვევა',
      validation: {
        required: true,
        shouldMatch: true
      },
      valid: false,
      touched: false
    },
    country: {
      name: 'country',
      label: 'country',
      elementType: 'select',
      elementConfig: {
        options: [
          { value: 'Georgia', displayValue: 'Georgia' },
          { value: 'Armenia', displayValue: 'Armenia' }
        ]
      },
      value: '',
      validation: { required: true },
      valid: true,
      touched: false
    },
    residenceId: {
      name: 'residenceId',
      label: 'პირადობა',
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'ID'
      },
      value: '',
      error: 'პირადობა უნდა შედგებოდეს 11 ასოსგან',
      validation: {
        required: true,
        minLength: 11
      },
      valid: false,
      touched: false
    },
    name: {
      name: 'name',
      label: 'სახელი',
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'სახელი'
      },
      value: '',
      validation: {
        required: true
      },
      valid: false,
      touched: false
    },
    surName: {
      name: 'surName',
      label: 'გვარი',
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'გვარი'
      },
      value: '',
      validation: {
        required: true
      },
      valid: false,
      touched: false
    },
    email: {
      name: 'email',
      label: 'ელ-ფოსტა',
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'ელ-ფოსტა'
      },
      value: '',
      validation: {},
      valid: true,
      touched: false
    },
    phonePrefix: {
      name: 'phonePrefix',
      label: 'phonePrefix',
      elementType: 'select',
      elementConfig: {
        options: [
          { value: '+995', displayValue: '+995 ' },
          { value: '+90', displayValue: '+90 ' }
        ]
      },
      value: '',
      validation: { required: true },
      valid: false,
      touched: false
    },
    phone: {
      name: 'phone',
      label: 'ტელეფონი',
      elementType: 'input',
      elementConfig: {
        type: 'text'
      },
      value: '',
      error: 'შეიყვანეთ შესაბამისი რაოდენობის ციფრები',
      validation: {
        required: true,
        minLength: 9
      },
      valid: false,
      touched: false
    }
  },

  formIsValid: false
};

const formReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'handleForm':
      return {
        ...state,
        formConfig: action.payload.updatedForm,
        formIsValid: action.payload.formIsValid
      };
  }

  return state;
};

export default formReducer;
