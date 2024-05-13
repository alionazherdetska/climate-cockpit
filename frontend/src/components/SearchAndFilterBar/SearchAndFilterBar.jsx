import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import icon_search from "../../assets/svgs/search_icon.svg";
import {
  setPostsFilter,
  setSearchText,
} from "../../store/slices/postsFilter.js";
import {
  ContainerWrapperLeft,
  ContainerWrapperRight,
  FilterSetter,
  FilterWrapper,
  SearchBarContainer,
  SearchBarWrapper,
  SearchIcon,
  SearchInput,
} from "./SearchAndFilterBar.style.js";

const SearchAndFilterBar = () => {
  const dispatch = useDispatch();
  const selectedFilter = useSelector((store) => store.postsFilter.filter); //get state from redux
  const [searchInput, setSearchInput] = useState("");

  const filters = ["All", "Liked", "Friends", "Follow"];

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setSearchText(searchInput));
  };

  return (
    <SearchBarContainer>
      <SearchBarWrapper>
        <ContainerWrapperLeft onSubmit={(e) => handleSubmit(e)}>
          <SearchIcon src={icon_search} />
          <SearchInput
            type="text"
            placeholder="Search posts..."
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </ContainerWrapperLeft>
        <ContainerWrapperRight>
          <FilterWrapper>
            {filters.map((filter) => (
              <FilterSetter
                $filterActive={selectedFilter === filter}
                key={filter}
                onClick={() => dispatch(setPostsFilter(filter))}
              >
                {filter}
              </FilterSetter>
            ))}
          </FilterWrapper>
        </ContainerWrapperRight>
      </SearchBarWrapper>
    </SearchBarContainer>
  );
};

export default SearchAndFilterBar;
