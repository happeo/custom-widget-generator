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
    const frame = document.createElement("iframe");

    window.addEventListener("message", (e) => {
      console.log(e.data);
      if (e.data["==sizeChangeEventName=="]) {
        const foundHeight = e.data["==sizeChangeEventName=="].height;
        const foundWidth = e.data["==sizeChangeEventName=="].width;
       if(foundHeight && foundWidth){
          frame.height = foundHeight;
          frame.width =  foundWidth;
          frame.style.height = foundHeight;
          frame.style.width = foundWidth;
        }
      }
    });

    // Create a shadow root
    const shadow = this.attachShadow({ mode: "open" });

    // Create div
    frame.setAttribute("class", "wrapper");
    frame.setAttribute("frameborder", "0");
    frame.setAttribute("height", "100%");
    frame.setAttribute("width", "100%");
    frame.setAttribute("style", "overflow:hidden;height:100%;width:100%");

    // you can change the width and height as necessary
    frame.srcdoc =
      "<html><head></head><body>===REPLACE_THIS===</body></html>";

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

const mutationObserverScript = `
<script>
const mutationObserver = new MutationObserver(() => {
  console.log(document.body.offsetHeight, document.body.offsetWidth);
    window.parent.postMessage({
      ==sizeChangeEventName==: {
        height: document.body.offsetHeight,
        width: document.body.offsetWidth,
      },
    });
});
mutationObserver.observe(document, { 
    attributeOldValue: true,
    characterData: true,
    childList: true,
    subtree: true
 });
</script>

`;

export function generateIframeTemplate(slug: string, scriptToInsert: string) {
  const className = Math.random().toString(16).replace("0.", "");
  scriptToInsert = scriptToInsert
    .replaceAll("'", "\\'")
    .replaceAll('"', '\\"')
    .replace(/(\r\n|\n|\r)/gm, "");
  const sizeChangeEventName = `sizeChange${className}`;
  const parsedMutationObserver = mutationObserverScript
    .replaceAll("\n", "")
    .replace("==sizeChangeEventName==", sizeChangeEventName);

  return templateScript
    .replace("enter-your-slug-within-these-quotes", slug)
    .replaceAll("CustomWidgetClassName", `HappeoWidget${className}`)
    .replaceAll("slugVar", `slugVar${className}`)
    .replaceAll("==sizeChangeEventName==", sizeChangeEventName)
    .replace("===REPLACE_THIS===", parsedMutationObserver + scriptToInsert);
}
