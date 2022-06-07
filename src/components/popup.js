/** @jsxImportSource @emotion/react */
// custom pragma necessary on CRA
// see: https://github.com/emotion-js/emotion/issues/2752

import Accents from "./accents";

const AccentButton = ({ accent, shortcut }) => {
  return (
    <button
      css={{
        display: "flex",
        flexDirection: "column",

        width: 50,
        height: 70,

        cursor: "pointer",
        border: 0,
        padding: 0,
        borderRadius: 10,
        background: "white",
      }}
    >
      <h1 css={{ flex: 1, textAlign: "center", margin: 0 }}>{accent}</h1>
      <h2 css={{ flex: 1, textAlign: "center", margin: 0 }}>{shortcut}</h2>
    </button>
  );
};

const Popup = () => {
  return (
    <div
      css={{
        display: "inline-flex",

        margin: 10,
        borderRadius: 15,

        position: "relative",
        overflow: "hidden",
      }}
    >
      <Accents />
      <div
        css={{
          position: "absolute",

          width: "100%",
          height: "100%",

          opacity: 0.6,
          background: "#b7c6e3",
          // backdropFilter: "blur(20px)", // tricky in FF still
        }}
      />
    </div>
  );
};

export default Popup;
