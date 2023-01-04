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
  return Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value)
};

export function convertDate(value) {
  return Intl.DateTimeFormat(['ban', 'id']).format(value)
};

export function convertDayOfWeek(value) {
  let dayOfWeek = Intl.DateTimeFormat('pt-BR', { weekday: 'short' }).format(value);
  return dayOfWeek = dayOfWeek.substring(0, 1)
    .toUpperCase() + dayOfWeek
      .substring(1, dayOfWeek.length)
      .toLocaleLowerCase();
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