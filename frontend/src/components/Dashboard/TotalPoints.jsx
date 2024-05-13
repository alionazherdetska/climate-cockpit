import { DashboardCategoriesTotalPoints } from "./dashboard.style.js";

export default function TotalPoints({ emissionEquation }) {
  const showNumber = (number) => (number ? number : "?");

  return (
    <DashboardCategoriesTotalPoints>
      <div>
        <div>Inland Emissions</div>
        <div className="inland-emissions">{emissionEquation.inland}</div>
      </div>
      <div>
        <div>+</div>
        <div>{"\u00A0"}</div>
      </div>
      <div>
        <div>Imports</div>
        <div className="imported-emissions">{emissionEquation.imports}</div>
      </div>
      <div>
        <div>-</div>
        <div>{"\u00A0"}</div>
      </div>
      <div>
        <div>Removal</div>
        <div className="removed-emissions">
          {showNumber(-emissionEquation.removed)}
        </div>
      </div>
      <div>
        <div>-</div>
        <div>{"\u00A0"}</div>
      </div>
      <div>
        <div>Solution</div>
        <div className="solution-emissions">
          {showNumber(-emissionEquation.solution)}
        </div>
      </div>
      <div>
        <div> =</div>
        <div>{"\u00A0"}</div>
      </div>
      <div>
        <div>Total</div>
        {showNumber(-emissionEquation.total)}
      </div>
    </DashboardCategoriesTotalPoints>
  );
}
