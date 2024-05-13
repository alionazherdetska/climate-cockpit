import { CircleShapedPoints } from "./dashboard.style.js";

export default function CircleShapedEmissionPoints({ data }) {
  const { type, total_number, offset } = data;
  return (
    <CircleShapedPoints $type={type} style={{ top: offset }}>
      <h3>{total_number}</h3>
    </CircleShapedPoints>
  );
}
