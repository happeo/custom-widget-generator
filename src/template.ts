const templateScript: string = `
//========================== Create a class for the element=============================
class CustomWidgetClassName extends HTMLElement {
  nodeScriptReplace(node) {
    if (this.nodeScriptIs(node) === true) {
      node.parentNode.replaceChild(this.nodeScriptClone(node), node);
    } else {
      var i = -1,
        children = node.childNodes;
      while (++i < children.length) {
        this.nodeScriptReplace(children[i]);
      }
    }

    return node;
  }

  nodeScriptIs(node) {
    return node.tagName === "SCRIPT";
  }

  nodeScriptClone(node) {
    var script = document.createElement("script");
    script.text = node.innerHTML;

    var i = -1,
      attrs = node.attributes,
      attr;
    while (++i < attrs.length) {
      script.setAttribute((attr = attrs[i]).name, attr.value);
    }
    return script;
  }

  constructor() {
    // Always call super first in constructor
    super();

    // Create a shadow root
    const shadow = this.attachShadow({ mode: "open" });

    // Create div
    const wrapper = document.createElement("div");
    wrapper.setAttribute("class", "wrapper");

    // you can change the width and height as necessary
    wrapper.innerHTML = '==script==';

    // Attach the created elements to the shadow dom
    shadow.appendChild(wrapper);

    this.nodeScriptReplace(wrapper);
  }
}

// Define the new element
const slugVar = "enter-your-slug-within-these-quotes";

window.customElements.get(slugVar) ||
  window.customElements.define(slugVar, CustomWidgetClassName);

//========================== Create a class for the element Ends  =============================

`;

export function generateTemplate(slug: string, scriptToInsert: string) {
  const className = Math.random().toString(16).replace("0.", "");
  scriptToInsert = scriptToInsert
    .replaceAll("'", "\\'")
    .replaceAll('"', '\\"')
    .replace(/(\r\n|\n|\r)/gm, "");

  return templateScript
    .replace("enter-your-slug-within-these-quotes", slug)
    .replaceAll("CustomWidgetClassName", `HappeoWidget${className}`)
    .replaceAll("slugVar", `slugVar${className}`)
    .replace("'==script=='", "`" + scriptToInsert + "`");
}
