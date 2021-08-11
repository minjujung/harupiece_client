import React, { useState } from "react";

const Sidebar = (props) => {
  const [xPosition, setX] = useState();
  const toggleMenu = () => {
    if (xPosition < 0) {
      setX(0);
    } else {
      setX(-100));
    }
  };
  return <></>;
};

export default Sidebar;
