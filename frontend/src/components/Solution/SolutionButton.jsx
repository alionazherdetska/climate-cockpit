import { useState } from "react";
import theme from "../../styles/theme.js";
import { SolutionButtonStyle } from "./solution.style.js";

function SolutionButton({ button_text, onSelectionChange, initialSelected }) {
  const [selected, setSelected] = useState(initialSelected || false);

  const handleClick = () => {
    const newSelected = !selected;
    setSelected(newSelected);

    if (onSelectionChange) {
      onSelectionChange(newSelected);
    }
  };
  const buttonStyle = selected
    ? {
        backgroundColor: theme.colors.selectedSolution,
      }
    : {
        backgroundColor: theme.colors.unselectedSolution,
      };

  return (
    <SolutionButtonStyle style={buttonStyle} onClick={handleClick}>
      {button_text}
    </SolutionButtonStyle>
  );
}

export default SolutionButton;
