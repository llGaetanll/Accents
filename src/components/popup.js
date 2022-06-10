/** @jsxImportSource @emotion/react */
// custom pragma necessary on CRA
// see: https://github.com/emotion-js/emotion/issues/2752

import Accents from "./accents";

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
