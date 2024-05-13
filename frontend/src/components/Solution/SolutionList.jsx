import { useEffect, useState } from "react";
import useAutoFetch from "../../hooks/useAutoFetch.js";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner.jsx";
import SolutionFilter from "../SolutionFilter/SolutionFilter.jsx";
import SolutionDropDown from "./SolutionDropDown.jsx";
import { FilterAndList, SolutionListDiv } from "./solution.style.js";

function SolutionList({ setListChanged, listChanged }) {
  const [allSolutions, setAllSolutions] = useState([]);
  const [solutionList, setSolutionList] = useState([]);
  const [selectedSortOption, setSelectedSortOption] = useState("Default");
  const [selectedCategory, setSelectedCategory] = useState("All categories");
  const [selectedStatus, setSelectedStatus] = useState("All");

  const { data, loading } = useAutoFetch(
    "get",
    "solution/solutions/?limit=30",
    undefined,
    undefined,
    "noAuth",
  );

  useEffect(() => {
    if (data !== null) setAllSolutions(data.results);
  }, [data]);

  useEffect(() => {
    let finalSolutions = allSolutions.slice();

    if (selectedCategory !== "All categories") {
      finalSolutions = finalSolutions.filter(
        (solution) => solution.category.name === selectedCategory,
      );
    }

    if (selectedStatus === "Selected") {
      finalSolutions = finalSolutions.filter(
        (solution) => solution.selected_by_logged_in_user,
      );
    } else if (selectedStatus === "Non-selected") {
      finalSolutions = finalSolutions.filter(
        (solution) => !solution.selected_by_logged_in_user,
      );
    }

    if (selectedSortOption === "Default") {
      finalSolutions.sort((a, b) => a.id - b.id);
    } else if (selectedSortOption === "Alphabetically") {
      finalSolutions.sort((a, b) => a.name.localeCompare(b.name));
    } else if (selectedSortOption === "Impact") {
      finalSolutions.sort((a, b) => b.impact - a.impact);
    } else if (selectedSortOption === "Number of Supporters") {
      finalSolutions.sort(
        (a, b) => b.number_of_supporters - a.number_of_supporters,
      );
    }
    setSolutionList(finalSolutions);
  }, [allSolutions, selectedCategory, selectedSortOption, selectedStatus]);

  const [selectedList, setSelectedList] = useState([]);
  const { data: selectedData } = useAutoFetch(
    "get",
    "/solution/user-selections/",
  );
  useEffect(() => {
    if (selectedData) {
      setSelectedList(selectedData.selected_solutions);
    }
  }, [selectedData]);
  const handleSelectedListChange = (newSelectedList) => {
    setListChanged(!listChanged);
    setSelectedList(newSelectedList);
  };

  if (loading) return <LoadingSpinner />;
  return (
    <SolutionListDiv>
      <FilterAndList>
        <div className="filterDiv">
          <SolutionFilter
            selectedSortOption={selectedSortOption}
            setSelectedSortOption={setSelectedSortOption}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedStatus={selectedStatus}
            setSelectedStatus={setSelectedStatus}
          />
        </div>
        {solutionList.map((solution) => (
          <SolutionDropDown
            key={solution.id}
            solution={solution}
            isSelected={selectedList.includes(solution.id)}
            onSelectedListChange={handleSelectedListChange}
          />
        ))}
      </FilterAndList>
    </SolutionListDiv>
  );
}

export default SolutionList;
