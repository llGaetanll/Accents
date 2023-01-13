/* returns the x, y position of the caret, given the target element (which is a
 * textarea or an input)
 *
 * This solution largely comes from this post
 * https://stackoverflow.com/a/16561663
 * and its JSFiddle
 * http://jsfiddle.net/mLocgoeq/
 *
 * Note that this solution does not works for more complex websites such as
 * google docs or online text editors. For such websites, an adhoc solution may
 * be necessary.
 */
export const getCaret = (field, debug = false) => {
  // simple wrapper for adding elements to the DOM
  const createElement = (type, parent) => {
    var el = document.createElement(type);
    parent.appendChild(el);
    return el;
  };

  const parent = field.parentElement;

  // create an invisible text area above the current one, with the same css properties
  const fieldMirror = createElement("div", parent);
  const fieldMirrorInline = createElement("span", fieldMirror);

  // the new textarea must have the same styles to be able to track the caret correctly
  const styles = window.getComputedStyle(field);
  Array.from(styles).forEach((key) =>
    fieldMirror.style.setProperty(
      key,
      styles.getPropertyValue(key),
      styles.getPropertyPriority(key)
    )
  );

  fieldMirror.style.position = "absolute";
  fieldMirror.style.top = field.offsetTop + "px";
  fieldMirror.style.left = field.offsetLeft + "px";
  fieldMirror.style.opacity = 0;

  if (debug) {
    fieldMirror.style.opacity = 0.8;
    fieldMirror.style.background = "yellow";
  }

  // set the invisible textarea's text to that of the current text area
  fieldMirrorInline.innerHTML = field.value.substr(0, field.selectionStart);

  const rects = fieldMirrorInline.getClientRects();
  const lastRect = rects[rects.length - 1];

  const x = lastRect.x + lastRect.width;
  const y = lastRect.y; // height is taken to be the top

  // now that we have the coordinates, delete the extra elements we created
  if (debug) {
    // if we're debugging the position of the caret
    // wait 2 seconds before removing the elements
    setTimeout(() => {
      fieldMirror.remove();
      fieldMirrorInline.remove();
    }, 2_000);
  } else {
    fieldMirror.remove();
    fieldMirrorInline.remove();
  }

  return [x, y];
};
