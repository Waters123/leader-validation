export const checkValidity = (value, rules, allValues) => {
  let isValid = true;

  if (rules.required) {
    isValid = value.trim() !== '' && isValid;
  }
  if (rules.minLength) {
    isValid = value.length >= rules.minLength && isValid;
  }

  if (rules.shouldMatch) {
    isValid = value === allValues.password.value && isValid;
  }
  return isValid;
};
