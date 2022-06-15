const TestLayout = () => {
  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", width: 300 }}>
        <textarea rows="10" />
        <input type="text" />

        <textarea style={{ position: "fixed", top: 0, left: 0 }} rows="1" />

        <textarea
          style={{
            position: "fixed",
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
          }}
          rows="1"
        />

        <textarea style={{ position: "fixed", top: 0, right: 0 }} rows="1" />

        <textarea
          style={{
            position: "fixed",
            top: "50%",
            right: 0,
            transform: "translateY(-50%)",
          }}
          rows="1"
        />

        <textarea style={{ position: "fixed", bottom: 0, left: 0 }} rows="1" />

        <textarea
          style={{
            position: "fixed",
            top: "50%",
            left: 0,
            transform: "translateY(-50%)",
          }}
          rows="1"
        />

        <textarea style={{ position: "fixed", bottom: 0, right: 0 }} rows="1" />
        <textarea
          style={{
            position: "fixed",
            bottom: 0,
            left: "50%",
            transform: "translateX(-50%)",
          }}
          rows="1"
        />
      </div>
      <div id="bg" />
    </>
  );
};

export default TestLayout;
