export function getFormsArray(formConfig) {
  const formElementsArray = [];
  for (let key in formConfig) {
    formElementsArray.push({
      id: key,
      config: formConfig[key]
    });
  }

  return formElementsArray;
}
