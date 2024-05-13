// ProgressComponent.jsx
import blue_texture from "../../assets/images/blue_texture.png";
import { ProgressBar, ProgressContainer } from "./ProgressBar.style.js";

function ProgressComponent({ percentage, progress_description }) {
  const style = {
    "--background-image": `url(${blue_texture})`,
  };
  return (
    <ProgressContainer>
      <ProgressBar $percentage={percentage} style={style} />
      <br />
      {progress_description}
    </ProgressContainer>
  );
}

export default ProgressComponent;
