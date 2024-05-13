import { useEffect, useState } from "react";
import useAutoFetch from "../../hooks/useAutoFetch.js";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner.jsx";
import Score from "./Score.jsx";
import {
  FinalContainer,
  ScoreCardContent,
  ScorecardContainer,
  TitleAndBar,
} from "./Scorecard.style.js";
import ScorecardCategory from "./ScorecardCategory.jsx";

export default function ScoreCard({ userID }) {
  const [scorecard, setScorecard] = useState([]);
  const { data, loading } = useAutoFetch(
    "get",
    `solution/scorecards/${userID}`,
  );

  useEffect(() => {
    if (data !== null) setScorecard(data.results);
  }, [data]);

  const totalScore = scorecard.reduce(
    (sum, category) => sum + category.impact_from_user,
    0,
  );

  const summary = (
    <>
      <>If everybody was like you, </>
      <>Switzerland's emissions would be {-totalScore} lower.</>
    </>
  );
  if (loading) return <LoadingSpinner />;
  return (
    <>
      <ScorecardContainer>
        <ScoreCardContent>
          {scorecard.map((category, i) => (
            <ScorecardCategory key={i} category={category} />
          ))}
          <TitleAndBar>
            <FinalContainer>
              {summary}
              <Score score={totalScore} />
            </FinalContainer>
          </TitleAndBar>
        </ScoreCardContent>
      </ScorecardContainer>
    </>
  );
}
