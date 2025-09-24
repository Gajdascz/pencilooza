const getErrorMessageElement = (errTxt) => {
  const el = document.createElement('span');
  el.classList.add('error-message', 'input-field-wrapper-error-message');
  el.textContent = errTxt;
  return el;
};
const setPendingValidation = (e) => {
  const field = e.target;
  field.classList.remove('valid');
  field.classList.remove('invalid');
  if (field.value.trim() === '') field.classList.remove('pending-validation');
  else field.classList.add('pending-validation');
};
const setValid = (inputField) => {
  inputField.classList.add('valid');
  inputField.classList.remove('invalid');
  inputField.classList.remove('pending');
  inputField.nextSibling.textContent = '';
};
const setInvalid = (inputField, errorMsgs) => {
  inputField.classList.add('invalid');
  inputField.classList.remove('valid');
  inputField.classList.remove('pending');
  const errContainer = inputField.nextSibling;
  errorMsgs.forEach((msg) => errContainer.append(getErrorMessageElement(msg)));
};
const getErrorMessages = (id, errors) =>
  errors.reduce((acc, curr) => {
    if (curr.selector === id) acc.push(curr.msg);
    return acc;
  }, []);

const updateFormValidation = (errors, success = false) => {
  const inputFields = document.querySelectorAll('.input-field-wrapper-field');
  inputFields.forEach((field) => field.addEventListener('change', setPendingValidation));
  if (success) return inputFields.forEach(setValid);
  if (errors.length > 0)
    return inputFields.forEach((field) => {
      field.nextSibling.textContent = '';
      const errMsgs = getErrorMessages(field.id, errors);
      if (errMsgs && errMsgs.length > 0) setInvalid(field, errMsgs);
      else setValid(field);
    });
};

document.addEventListener('DOMContentLoaded', () => {
  const runValidate = document.querySelector('span[data-run-validate="true"]');
  if (!runValidate) return;
  const errors = runValidate.dataset.errors;
  if (errors === 'false') return updateFormValidation([], true);
  else return updateFormValidation(JSON.parse(errors), false);
});

export { updateFormValidation };
