import { useState } from "react";
import DashboardGrid from "./DashboardGrid.jsx";
import TotalPoints from "./TotalPoints.jsx";

export default function SolutionDashboard({ listChanged }) {
  const [emissionEquation, setEmissionEquation] = useState({
    inland: 47,
    imports: 71,
    solution: null,
    removed: null,
    total: null,
  });

  return (
    <>
      <TotalPoints emissionEquation={emissionEquation} />
      <DashboardGrid
        listChanged={listChanged}
        setEmissionEquation={setEmissionEquation}
      />
    </>
  );
}
