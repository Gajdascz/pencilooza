import { updateFormValidation } from './updateFormValidation.js';

// POST data to url endpoint
const passPayload = (url, data, errors) => {
  const form = document.createElement('form');
  form.method = 'POST';
  form.action = url;

  const setHiddenInput = (name, value) => {
    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = name;
    input.value = value;
    form.append(input);
  };

  Object.keys(data).forEach((key) => setHiddenInput(key, data[key]));
  setHiddenInput('errors', JSON.stringify(errors));
  document.body.appendChild(form);

  form.submit();
};

// Request authentication from /admin-command endpoint
const fetchAdminCommand = (body) =>
  fetch('/admin-command', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  });

const fetchValidate = (body) =>
  fetch('/application/validate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  });

// Updates ui on admin authentication error
const handleAuthError = (form, errors) => {
  const inputContainer = form.querySelector('.input-with-button-container');
  const inputWrapper = inputContainer.querySelector('.input-with-button-wrapper');
  const errContainer = inputContainer.querySelector('.input-errors-container');

  errContainer.textContent = '';
  inputWrapper.classList.add('invalid');

  const appendErrorMessage = (msg) => {
    const msgElement = document.createElement('p');
    msgElement.textContent = msg;
    errContainer.append(msgElement);
  };

  errors.forEach((err) => appendErrorMessage(err.msg));

  return false;
};

// Handles initial submission request from user
const parseSubmission = (target) => {
  if (!target || target.nodeName !== 'FORM')
    throw new Error(`Submission target provided a: ${target.nodeName} when a FORM is required`);

  const formData = new FormData(target);
  if (!formData) throw new Error(`Could not create formData from form: ${target}`);

  const searchParamsInstance = new URLSearchParams(formData);
  if (!searchParamsInstance) throw new Error(`Could not create searchParamsInstance from formData: ${formData}`);

  return { form: target, formData, searchParamsInstance };
};

// Requests admin authentication and handles the response
const handleFormSubmit = async (e) => {
  e.preventDefault();

  try {
    const { form, searchParamsInstance } = parseSubmission(e.target);
    const res = await fetchAdminCommand(searchParamsInstance);
    const json = await res.json();
    const { status } = res;
    const { alert: alertMsg, redirect, errors, data } = json;

    if (alertMsg) alert(alertMsg);

    if (status === 401) return handleAuthError(form, errors);

    if (redirect) return data ? passPayload(redirect, data, errors) : location.replace(redirect);

    location.reload();
  } catch (err) {
    debug(`Error in adminForm handleFormSubmit: ${err}`);
  }
};

const validateForm = async (e) => {
  let form = null;
  if (e.target.tagName === 'FORM') form = e.target;
  else form = document.querySelector('.admin-form');
  try {
    const { searchParamsInstance } = parseSubmission(form);
    const response = await fetchValidate(searchParamsInstance);
    const json = await response.json();
    if (json.success) return updateFormValidation([], true);
    if (json.errors?.length > 0) return updateFormValidation(json.errors, false);
  } catch (err) {
    debug(`Error in adminForm validateForm: ${err}`);
  }
};

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.admin-form');
  const validateBtn = form.querySelector('.validate-button');
  if (validateBtn) validateBtn.addEventListener('click', validateForm);
  if (form) form.addEventListener('submit', handleFormSubmit);
  else debug(`adminForm imported but no form.admin-element found on the page`);
});
