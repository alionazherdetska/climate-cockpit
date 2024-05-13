import SolutionDashboard from "../components/Dashboard/SolutionDashboard.jsx";
import {
  LeftBar,
  Main,
  RightBar,
} from "../components/Dashboard/dashboard.style.js";
import SolutionList from "../components/Solution/SolutionList.jsx";
import { useState } from "react";

const SolutionsPage = () => {
  const [listChanged, setListChanged] = useState(false);

  return (
    <Main>
      <LeftBar>
        <SolutionDashboard listChanged={listChanged} />
      </LeftBar>
      <RightBar>
        <SolutionList
          listChanged={listChanged}
          setListChanged={setListChanged}
        />
      </RightBar>
    </Main>
  );
};

export default SolutionsPage;
