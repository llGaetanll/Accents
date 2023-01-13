import { useDispatch } from "react-redux";

import ButtonBase from "./ButtonBase";
import { BACKGROUND_COLOR } from "../util/const";
import { toggle } from "../state";

const SiteToggle = () => {
  return <ButtonBase>test</ButtonBase>;
};

const Menu = () => {
  const dispatch = useDispatch();

  const handleToggle = () => {
    dispatch(toggle());
  };

  return (
    <div
      css={{
        display: "flex",
        flexDirection: "column",

        width: "inherit",
        height: "inherit",
        boxSizing: "border-box",
        padding: 8,

        background: BACKGROUND_COLOR,
      }}
    >
      <h1 css={{ margin: 0 }}>Accents</h1>

      <div css={{ display: "flex", flexDirection: "row" }}>
        <ButtonBase>{window.location.href} toggle</ButtonBase>

        <ButtonBase onClick={handleToggle}>on/off</ButtonBase>
      </div>

      {/* <h2>Mode</h2>
      <div css={{ display: "flex", flexDirection: "row" }}>
        <button>Insert</button>
        <button>Copy/Paste</button>
        <button>Copy/Paste (Auto)</button>
      </div> */}
    </div>
  );
};

export default Menu;
