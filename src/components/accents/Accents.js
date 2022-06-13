/** @jsxImportSource @emotion/react */
import ButtonBase from "../ButtonBase";

import { ACCENTS } from "../../util/data";

const textItem = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  margin: 0,

  fontFamily: "Inter, sans-serif",
};

const Button = ({ accent, shortcut, targetEl }) => {
  const handleType = () => {};

  return (
    <ButtonBase onClick={handleType}>
      <h1 css={[textItem, { flex: 4, fontSize: "1.5em" }]}>{accent}</h1>
      <h2 css={[textItem, { flex: 3, color: "#494f5a", fontSize: "1.1em" }]}>
        {shortcut}
      </h2>
    </ButtonBase>
  );
};

const Accents = ({ keyPressed, targetEl }) => {
  return (
    <div
      css={{
        display: "inline-flex",
        gap: 7,
        padding: 7,
        zIndex: 1,
      }}
    >
      {ACCENTS[keyPressed].map((accent, i) => (
        <Button
          key={`accent-button-${i}`}
          targetEl={targetEl}
          accent={accent}
          shortcut={i + 1}
        />
      ))}
    </div>
  );
};

export default Accents;
