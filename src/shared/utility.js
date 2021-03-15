export const updateObject = (oldObject, updatedValues) => {
  return {
    ...oldObject,
    ...updatedValues
  };
}

export const checkValidity = (value, rules) => {
  let valid = true;

  if (!rules) {
    return valid;
  }
  if (rules.required) {
    valid = value.trim() !== '' && valid;
  }
  if (rules.minLength) {
    valid = value.trim().length >= rules.minLength && valid;
  }
  if (rules.isEmail) {
    const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    valid = pattern.test(value);
  }

  return valid;
}