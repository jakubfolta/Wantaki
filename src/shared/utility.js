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

export const setTheme = (type, init) => {
  const buttons = document.querySelectorAll('#authSubmit, #switch, #itemSubmit, #copy');
  console.log(buttons);

  if (init) {
    Array.from(buttons).forEach(el => el.className += " " + type);
  } else {
    if (type === "cyber") {
      document.documentElement.removeAttribute('data-theme');
      Array.from(buttons).forEach(el => el.classList.remove("cyber"));
      localStorage.setItem('data-theme', 'default');
    } else {
      document.documentElement.setAttribute('data-theme', 'cyber');
      Array.from(buttons).forEach(el => el.className += " cyber");
      localStorage.setItem('data-theme', 'cyber');
    }
  }
}