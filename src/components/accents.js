/** @jsxImportSource @emotion/react */

const Button = ({ accent, shortcut }) => {
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

const fakedata = [
  ["á", 1],
  ["à", 2],
  ["â", 3],
  ["ä", 4],
  ["æ", 5],
  ["å", 6],
  ["ã", 7],
  ["ā", 8],
];

const Accents = () => {
  return (
    <div
      css={{
        display: "inline-flex",
        gap: 9,
        padding: 9,
        zIndex: 1,
      }}
    >
      {fakedata.map((datum) => (
        <Button accent={datum[0]} shortcut={datum[1]} />
      ))}
    </div>
  );
};

export default Accents;
