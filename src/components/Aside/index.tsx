import React, { useContext } from "react";
import * as Component from "./style";
import { ScreenContext } from "../../context/ContextScreen";

export const Aside = () => {
  const Screens = useContext(ScreenContext);

  return (
    <Component.ContainerMain>
      <button
        style={{
          backgroundColor: "#a5a5dd",
        }}
        onClick={() => Screens.setScreen(1)}
      >
        Survey
      </button>
      <button
        style={{
          backgroundColor: "#a5a5dd",
        }}
        onClick={() => Screens.setScreen(2)}
      >
        Metrics
      </button>
    </Component.ContainerMain>
  );
};
