import React from "react";
import numeral from "numeral";

const CurrencyFormatter = ({ value }) => {
  if (value == null) return null;

  const formatted = numeral(value).format("$0,0.00");

  return <span>{formatted}</span>;
};

export default CurrencyFormatter;
