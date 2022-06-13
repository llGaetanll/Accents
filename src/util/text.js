/* This file contains helpers for inserting characters into textareas or other more complex DOM structures */

// good for accents, this replaces the character under the caret with the passed in char
export const setChar = (targetEl, char) => {
  const str = targetEl.value;
  const idx = targetEl.selectionStart;

  targetEl.value = str.substring(0, idx - 1) + char + str.substring(idx);
};

// good for emojis, since it's not meant to replace a letter
export const insertChar = (targetEl, char) => {
  const str = targetEl.value;
  const idx = targetEl.selectionStart;

  targetEl.value = str.substring(0, idx) + char + str.substring(idx);
};
