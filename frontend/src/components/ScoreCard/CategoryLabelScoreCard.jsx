import { CategoryLabelDiv } from "./Scorecard.style.js";

function CategoryLabel({ category }) {
  return (
    <CategoryLabelDiv $category={category}>
      <div>{category}</div>
    </CategoryLabelDiv>
  );
}

export default CategoryLabel;
