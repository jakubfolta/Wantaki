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

export const sortItems = (timestampsArray, items) => {
  const sortedItems = [];
  timestampsArray.sort().reverse();

  for (let number of timestampsArray) {
    let itemIndex = items.findIndex(el => el.timestamp === number);
    sortedItems.push(items[itemIndex]);
  }

  return sortedItems;
}

export const setTheme = (theme, init) => {
  const buttons = document.querySelectorAll('#authSubmit, #switch, #itemSubmit, #copy, #create');

  if (init) {
    Array.from(buttons).forEach(el => el.className += ` ${theme}`);
    return
  }

  if (theme === "cyber") {
    document.documentElement.setAttribute('data-theme', theme);
    Array.from(buttons).forEach(el => el.className += ` ${theme}`);
    localStorage.setItem('data-theme', theme);
  } else {
    document.documentElement.setAttribute('data-theme', theme);
    Array.from(buttons).forEach(el => el.classList.remove('cyber'));
    localStorage.setItem('data-theme', theme);
  }
}

export const setRequestData = (id, token, items = null) => {
  const queryParams = `${id}.json?auth=${token}`;
  const databaseUpdatedItems = items ? {} : null;

  if (items) {
    for (const item of items) {
      databaseUpdatedItems[item.id] = {...item}
    }
  }

  return {
    queryParams,
    databaseUpdatedItems
  };
}
