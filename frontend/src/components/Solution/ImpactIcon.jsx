import { ImpactIconDiv } from "./solution.style.js";

function ImpactIcon({ impact, visibleOrChecked }) {
  let impactNumber = -impact;
  if (impact == null) {
    impactNumber = "?";
  }

  return (
    <ImpactIconDiv $visibleOrChecked={visibleOrChecked}>
      <div>{impactNumber}</div>
    </ImpactIconDiv>
  );
}

export default ImpactIcon;
