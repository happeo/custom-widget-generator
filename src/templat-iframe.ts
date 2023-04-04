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
    const frame = document.createElement("iframe");
    frame.setAttribute("class", "wrapper");
    frame.setAttribute("frameborder", "0");
    frame.setAttribute("height", "100%");
    frame.setAttribute("width", "100%");
    frame.setAttribute("style", "overflow:hidden;height:100%;width:100%");

    // you can change the width and height as necessary
    frame.srcdoc = "<html><head></head><body>===REPLACE_THIS===</body></html>";

    // Attach the created elements to the shadow dom
    shadow.appendChild(frame);

    this.nodeScriptReplace(frame);
  }
}

// Define the new element
const slugVar = "enter-your-slug-within-these-quotes";

window.customElements.get(slugVar) ||
  window.customElements.define(slugVar, CustomWidgetClassName);

//========================== Create a class for the element Ends  =============================

`;

export function generateIframeTemplate(slug: string, scriptToInsert: string) {
  const className = Math.random().toString(16).replace("0.", "");
  scriptToInsert = scriptToInsert.replaceAll("'", "\\'").replaceAll('"', '\\"');
  // for (let index = 0; index < scriptToInsert.length; index++) {
  //   let element = scriptToInsert.charAt(index);
  //   if (element === "'" || element === '"') {
  //     escapedString = escapedString + String.fromCharCode();
  //   }
  //   escapedString = escapedString + element;
  // }
  return templateScript
    .replace("enter-your-slug-within-these-quotes", slug)
    .replaceAll("CustomWidgetClassName", `HappeoWidget${className}`)
    .replaceAll("slugVar", `slugVar${className}`)
    .replace("===REPLACE_THIS===", scriptToInsert);
}
