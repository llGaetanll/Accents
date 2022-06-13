/* returns the x, y position of the caret, given the target element (which is a
 * textarea)
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
export const getTextAreaCaret = (textarea) => {
  // simple wrapper for adding elements to the DOM
  const createElement = (type, parent, id) => {
    var el = document.createElement(type);
    parent.appendChild(el);
    el.id = id;
    return el;
  };

  const parent = textarea.parentElement;

  // create an invisible text area above the current one, with the same css properties
  const textareaMirror = createElement(
    "div",
    parent,
    "accents-textarea-mirror"
  );
  const textareaMirrorInline = createElement("span", textareaMirror, "");

  // the new textarea must have the same styles to be able to track the caret correctly
  const styles = window.getComputedStyle(textarea);
  Array.from(styles).forEach((key) =>
    textareaMirror.style.setProperty(
      key,
      styles.getPropertyValue(key),
      styles.getPropertyPriority(key)
    )
  );

  textareaMirror.style.position = "absolute";
  // textareaMirror.style.zIndex = 1;
  textareaMirror.style.opacity = 0;

  // set the invisible textarea's text to that of the current text area
  textareaMirrorInline.innerHTML = textarea.value.substr(
    0,
    textarea.selectionStart
  );

  const rects = textareaMirrorInline.getClientRects();
  const lastRect = rects[rects.length - 1];

  const x = lastRect.x + lastRect.width;
  const y = lastRect.y; // height is taken to be the top

  // now that we have the coordinates, delete the extra elements we created
  textareaMirror.remove();
  textareaMirrorInline.remove();

  return [x, y];
};
