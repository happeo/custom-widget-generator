const templateScript: string = `
// Create a class for the element
class CustomWidget extends HTMLElement {
  constructor() {
    // Always call super first in constructor
    super();

    // Create a shadow root
    const shadow = this.attachShadow({ mode: "open" });

    // Create div
    const wrapper = document.createElement("div");
    wrapper.setAttribute("class", "wrapper");

    // you can change the width and height as necessary
    wrapper.innerHTML =
      '==script==';

    // Attach the created elements to the shadow dom
    shadow.appendChild(wrapper);
  }
}

// Define the new element
const slug = "enter-your-slug-within-these-quotes";

window.customElements.get(slug) ||
  window.customElements.define(slug, CustomWidget);

`;

export function generateTemplate(slug: string, scriptToInsert: string) {
  return templateScript
    .replace("enter-your-slug-within-these-quotes", slug)
    .replace("'==script=='", "`" + scriptToInsert + "`");
}
