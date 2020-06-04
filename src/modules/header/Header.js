import React from "react";
import PropTypes from "prop-types";
import useStore from "./store";

const Header = (props) => {
  const siteTitle = useStore((state) => state.siteTitle);
  return <div>Header</div>;
};

Header.propTypes = {};

export default Header;
