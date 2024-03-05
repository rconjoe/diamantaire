export function getTextFromHTML(response: string) {
  const div = document.createElement('div');

  div.innerHTML = response;

  return div.textContent;
}
