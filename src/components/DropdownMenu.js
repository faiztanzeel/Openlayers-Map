import React from "react";

const DropdownMenu = ({ onSelectOption }) => (
  <select onChange={(e) => onSelectOption(e.target.value)}>
    <option value="">Choose Action</option>
    <option value="insert-before">Insert Polygon Before</option>
    <option value="insert-after">Insert Polygon After</option>
  </select>
);

export default DropdownMenu;
