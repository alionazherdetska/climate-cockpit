import ImpactIcon from "./ImpactIcon.jsx";
import { useEffect, useState } from "react";
import supportersIcon from "./../../assets/other_icons/supporters.png";
import CategoryLabel from "./CategoryLabel.jsx";
import ProgressComponent from "./ProgressBar.jsx";
import Resources from "./Resources.jsx";
import SvgIcon from "./SvgIcon.jsx";
import {
  ArrowImg,
  CheckboxContainer,
  SolutionContainer,
} from "./solution.style.js";

import SolutionButton from "./SolutionButton.jsx";
import useApiRequest from "../../hooks/useApiRequest.js";
import arrowToOpen from "../../assets/images/right-arrow.png";

export default function SolutionDropDown({
  solution,
  isSelected,
  onSelectedListChange,
}) {
  const { sendRequest: toggleSelection, data } = useApiRequest("noAuth");
  const [isChecked, setIsChecked] = useState(isSelected);
  const [isVisible, setIsVisible] = useState(false);
  const {
    category,
    name,
    impact,
    text,
    progress,
    progress_text,
    number_of_supporters,
    button_text,
    icon_name,
    id,
  } = solution;

  const handleToggleSelection = () => {
    toggleSelection("post", `/solution/toggle-select/${id}/`);
  };

  useEffect(() => {
    setIsChecked(isSelected);
  }, [isSelected]);

  useEffect(() => {
    if (data && data.selected_solutions) {
      onSelectedListChange(data.selected_solutions);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
    handleToggleSelection();
  };

  const handleButtonSelectionChange = (isSelected) => {
    setIsChecked(isSelected);
    handleToggleSelection();
  };
  const handleSolutionDropDown = () => {
    setIsVisible((prevVisible) => !prevVisible);
  };

  const solutionText = text.replace("{impact}", `${impact} megatons per year`);
  const progressText = progress_text.replace("{progress}", progress);

  return (
    <SolutionContainer $isChecked={isChecked}>
      <div className="solutionBar" onDoubleClick={handleSolutionDropDown}>
        <div className="solutionBarLeft">
          <CheckboxContainer>
            <input
              type="checkbox"
              checked={isChecked}
              onChange={handleCheckboxChange}
              className="custom-checkbox"
            />
          </CheckboxContainer>
          <div>
            <SvgIcon svg_icon={icon_name} />
          </div>
          <div className="solutionName">{name}</div>
        </div>
        <div className="solutionBarRight">
          <div className="solutionBarRightInner">
            <div className="supporters">
              <img src={supportersIcon} alt="Supporters" />
              {number_of_supporters}
            </div>
            <div>
              <CategoryLabel category={category.name} />
            </div>
          </div>
          <div>
            <ImpactIcon
              impact={impact}
              visibleOrChecked={isVisible || isChecked}
            />
          </div>
          <div
            className={`dropdownToggleIcon ${
              isVisible ? "rotated" : "rotated-closed"
            }`}
            onClick={handleSolutionDropDown}
          >
            <ArrowImg
              src={arrowToOpen}
              style={{ width: "1.6rem", height: "1.5rem" }}
              className="arrow-icon"
              alt="Arrow"
            />
          </div>
        </div>
      </div>
      {isVisible && (
        <div className="solutionDetails" style={{ fontSize: "20px" }}>
          <div>{solutionText}</div>
          <br />
          <ProgressComponent
            className="progressBar"
            percentage={progress}
            progress_description={progressText}
          />

          <div></div>

          <Resources solutionId={id} />

          <div className="solutionButton">
            <SolutionButton
              button_text={button_text}
              initialSelected={isChecked}
              onSelectionChange={handleButtonSelectionChange}
            />
          </div>
        </div>
      )}
    </SolutionContainer>
  );
}
