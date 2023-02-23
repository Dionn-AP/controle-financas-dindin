export function setItem(key, value) {
  return localStorage.setItem(key, value);
}

export function getItem(key) {
  return localStorage.getItem(key);
}

export function removeItem(key) {
  return localStorage.removeItem(key);
}

export function clear() {
  return localStorage.clear();
}

export function convertValues(value) {
  const newValue = value / 100;
  return Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(newValue)
};

export function getHeaders(iToken) {
  const headers = {
    headers: {
      Authorization: `Bearer ${iToken}`
    }
  };
  return headers;
}

export function messaErroTreatment(message) {
  const erroTreatment = message.replace('ser', 'ter');
  const erroMessage = erroTreatment.substring(0, 1)
    .toUpperCase() + erroTreatment.substring(1, erroTreatment.length)
      .toLocaleLowerCase();
  return erroMessage;
}

export function messaErroTreatmentCategoriesAddRegister(message) {
  const erroTreatment = message.replace('categoria_id', 'Categoria');
  const erroMessage = erroTreatment.substring(0, 1)
    .toUpperCase() + erroTreatment.substring(1, erroTreatment.length)
      .toLocaleLowerCase();
  return erroMessage;
}

function dateFormat(date) {
  date = date.slice(0, date.indexOf('T')).split('-');
  const newDate = new Date(date);
  return newDate.toLocaleDateString(newDate.getTimezoneOffset());
}

function formatEditDate(date) {
  return date.slice(0, date.indexOf('T'));
}

function money(value) {
    value = String(value).replace(/^(0+)/g, "")
    value = value.replace(/[^\w\s]|\s|[A-Z]/gi, '')
    var len = value.length;
    if(len === 1) {
      value = value.replace(/(\d)/, "0,0$1")
      return value;
    }

    if(len === 2) {
      value = value.replace(/(\d)/, "0,$1")
      return value;
    }

    if(len > 2) {
      value = value.replace(/(\d{2})$/, ',$1')
      return value;
    }
}

export function convertDate(value) {
  return Intl.DateTimeFormat(['ban', 'id']).format(value)
};

export function convertDayOfWeek(value) {
  let dayOfWeek = Intl.DateTimeFormat('pt-BR', { weekday: 'short' })
  .format(new Date()
  .setDate(value.getDate() + 1));
  
  return dayOfWeek = dayOfWeek.substring(0, 1)
    .toUpperCase() + dayOfWeek
      .substring(1, dayOfWeek.length)
      .toLocaleLowerCase();
};



export {
  dateFormat,
  formatEditDate,
  money
}