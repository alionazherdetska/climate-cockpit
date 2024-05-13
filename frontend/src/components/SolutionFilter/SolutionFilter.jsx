import { useEffect, useState } from "react";
import funnelIcon from "../../assets/images/filtering_categories.png";
import sortingIcon from "../../assets/images/sorting_categories.png";
import filterIcon from "../../assets/other_icons/filter.svg";
import useAutoFetch from "../../hooks/useAutoFetch.js";
import {
  ContainerTop,
  DropdownContent,
  DropdownLayout,
  DropdownSelect,
  DropdownSort,
  StyledImage,
  TitleAndImage,
} from "./SolutionFilter.style.js";

export default function SolutionFilter({
  selectedSortOption,
  setSelectedSortOption,
  selectedCategory,
  setSelectedCategory,
  selectedStatus,
  setSelectedStatus,
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { data } = useAutoFetch(
    "get",
    "solution/categories/",
    undefined,
    undefined,
    "noAuth",
  );

  const [categories, setCategories] = useState([]);

  const sortingOptions = [
    "Default",
    "Impact",
    "Alphabetically",
    "Number of Supporters",
  ];
  const statusOptions = ["All", "Non-selected", "Selected"];

  useEffect(() => {
    if (data !== null)
      setCategories([
        "All categories",
        ...data.results.map((category) => category.name),
      ]);
  }, [data]);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleSortChange = (e) => {
    setSelectedSortOption(e.target.value);
    toggleDropdown();
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    toggleDropdown();
  };

  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
    toggleDropdown();
  };

  const dropdown = (title, icon, options, handleChange, value) => {
    const dropdownOptions = options.map((option) => (
      <option key={option} value={option}>
        {option.charAt(0).toUpperCase() + option.slice(1)}
      </option>
    ));

    return (
      <DropdownSort>
        <ContainerTop>
          <TitleAndImage>
            <img src={icon} alt={`Icon for ${title}`} />
            <h3>{title}</h3>
          </TitleAndImage>
        </ContainerTop>
        <DropdownSelect value={value} onChange={handleChange}>
          {dropdownOptions}
        </DropdownSelect>
      </DropdownSort>
    );
  };

  const SortingDropdown = dropdown(
    "Sorting Options",
    sortingIcon,
    sortingOptions,
    handleSortChange,
    selectedSortOption,
  );
  const CategoryDropdown = dropdown(
    "Category Filter",
    funnelIcon,
    categories,
    handleCategoryChange,
    selectedCategory,
  );
  const StatusDropdown = dropdown(
    "Status Filter",
    funnelIcon,
    statusOptions,
    handleStatusChange,
    selectedStatus,
  );

  return (
    <DropdownLayout>
      <StyledImage src={filterIcon} onClick={toggleDropdown} alt="Filter" />
      {isDropdownOpen && (
        <DropdownContent>
          {CategoryDropdown}
          {SortingDropdown}
          {StatusDropdown}
        </DropdownContent>
      )}
    </DropdownLayout>
  );
}
