const getErrorMessage = (errTxt) => {
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
const setInvalid = (inputField, errorMsg) => {
  inputField.classList.add('invalid');
  inputField.classList.remove('valid');
  inputField.classList.remove('pending');
  inputField.nextSibling.textContent = '';
  inputField.nextSibling.append(getErrorMessage(errorMsg)); // Selects div.input-field-wrapper-errors-container from inputField mixin
};
const findError = (id, errors) => errors.find((err) => err.selector === id);

const updateFormValidation = (errors, success = false) => {
  const inputFields = document.querySelectorAll('.input-field-wrapper-field');
  inputFields.forEach((field) => field.addEventListener('change', setPendingValidation));
  if (success) return inputFields.forEach(setValid);
  if (errors.length > 0)
    return inputFields.forEach((field) => {
      const err = findError(field.id, errors);
      if (err) setInvalid(field, err.msg);
      else setValid(field);
    });
};

export { updateFormValidation };
