import { useContext } from "react";
import ButtonBase from "../ButtonBase";

import { ModalContext } from "../../util/context";

import { ACCENTS } from "../../util/data";
import { setChar } from "../../util/text";

import { KEY_WIDTH, KEY_HEIGHT, GAP_SIZE } from "../../util/const";

const textItem = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  margin: 0,

  fontFamily: "Inter, sans-serif",
};

const Button = ({ accent, shortcut, targetEl, ...props }) => {
  const { hide } = useContext(ModalContext);

  const handleType = () => {
    // type in the character
    setChar(targetEl, accent);

    // focus the textarea again
    // TODO: this moves the user's caret to the end of the textarea
    // keep track of where this is
    targetEl.focus();

    // hide the modal
    hide();
  };

  return (
    <ButtonBase onClick={handleType} {...props}>
      <h1 css={[textItem, { flex: 4, fontSize: "1.5em" }]}>{accent}</h1>
      <h2 css={[textItem, { flex: 3, color: "#494f5a", fontSize: "1.1em" }]}>
        {shortcut}
      </h2>
    </ButtonBase>
  );
};

const Accents = () => {
  const state = useContext(ModalContext);

  const { targetEl, key } = state;

  return (
    <div
      css={{
        display: "inline-flex",
        gap: GAP_SIZE,
        padding: GAP_SIZE,
        zIndex: 1,
      }}
    >
      {ACCENTS[key].map((accent, i) => (
        <Button
          key={`accent-button-${i}`}
          targetEl={targetEl}
          accent={accent}
          shortcut={i + 1}
          css={{
            width: KEY_WIDTH,
            height: KEY_HEIGHT,

            margin: 0,
            padding: 0,
          }}
        />
      ))}
    </div>
  );
};

export default Accents;
