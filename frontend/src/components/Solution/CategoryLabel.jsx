import { CategoryLabelDiv } from "./solution.style.js";

function CategoryLabel({ category }) {
  return (
    <CategoryLabelDiv $category={category}>
      <div>{category}</div>
    </CategoryLabelDiv>
  );
}

export default CategoryLabel;
