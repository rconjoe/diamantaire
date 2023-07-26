export function updateUrlParameter(parameterName, newValue) {
  const urlParams = new URLSearchParams(window.location.search);

  urlParams.set(parameterName, newValue);

  const newUrl = window.location.pathname + '?' + urlParams.toString();

  window.history.pushState({ path: newUrl }, '', newUrl);
}

export function removeUrlParameter(parameterName) {
  const urlParams = new URLSearchParams(window.location.search);

  urlParams.delete(parameterName);

  const newUrl = window.location.pathname + '?' + urlParams.toString();

  window.history.pushState({ path: newUrl }, '', newUrl);
}
