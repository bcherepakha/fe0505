export class Component {};

export function createElement (tagName, props, text) {
  const el = document.createElement(tagName);

  el.innerText = text;
  el.className = props.className;

  return el;
}
