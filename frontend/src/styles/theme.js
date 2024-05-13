import dark_green_texture from "../assets/category_textures/dark_green_texture.png";
import gray_texture1 from "../assets/category_textures/gray_pencil_texture.png";
import light_green_texture from "../assets/category_textures/light_green_texture.jpg";
import orange_texture from "../assets/category_textures/light_orange_texture.png";
import red_texture from "../assets/category_textures/light_red_texture.png";
import pink_texture from "../assets/category_textures/pink_texture_1.png";
import purple_texture from "../assets/category_textures/purple_texture.png";
import yellow_texture from "../assets/category_textures/yellow_texture.jpg";
import blue_texture from "../assets/images/light_blue_texture.jpg";
import gray_texture from "../assets/images/paper_texture.jpg";
import violet_texture from "../assets/images/violet_texture.jpg";

const theme = {
  General: {
    background:
      "conic-gradient(from 90deg at 1.1px 1.1px, #f3f3e4 25%, rgb(217, 217, 217) 0)",
  },
  ResetPasswordColors: {
    color: "#0077BF",
  },
  ResourcesColors: {
    tabColor: "#000",
    videoBackground: "#da1515",
    playButton: "white",
  },
  ProgressBar: {
    backgroundColor: "#f50606",
    borderColor: "black",
  },
  colors: {
    primary: "black",
    secondary: "white",
    lightGray: "#aaa",
    lightGrayBorder: "#ddd",
    solutionPagePrimaryColor: "#0077BF",
    editPostBorderColor: "#0077BF",
    unselectedSolution: "red",
    selectedSolution: "green",
  },
  backgroundColors: {
    loadingSpinner: "rgba(255, 255, 255, 0.5)",
    primary: "rgba(253, 247, 221, 0.2)",
    secondary: "white",
    impactIconUnselected: "#444;",
    impactIconSelected: "#0077BF",
    selectedSolutionBar: "rgba(0, 0, 255, 0.3)",
  },
  emissionColors: {
    imported: "red",
    inland: "red",
    removed: "green",
    solution: "blue",
  },
  categoryLabels: {
    default: `url(${gray_texture})`,
    electricity: `url(${violet_texture})`,
    buildings: `url(${orange_texture})`,
    transport: `url(${purple_texture})`,
    food: `url(${light_green_texture})`,
    trash: `url(${gray_texture1})`,
    industry: `url(${red_texture})`,
    import: `url(${pink_texture})`,
    nature: `url(${dark_green_texture})`,
    money: `url(${yellow_texture})`,
    innovation: `url(${blue_texture})`,
    fontSize: "16px",
    fontColor: "#333",
  },
  fontColors: {
    primary: "333",
    secondary: "#4c4c4c",
    impactIcon: "white",
    emissionLevel: "white",
    button: "white",
    emissionColor: "red",
    solutionColor: "blue",
    removalColor: "green",
    heroPageMainColor: "#545454",
    heroPageSecondaryColor: "#0077BF",
    profilePageSecondaryColor: "#0077BF",
  },
  fontSize: {
    equation: "22px",
    solutionName: "30px",
  },
  fonts: {
    cabinSketchRegular: "Cabin Sketch",
  },
  breakPoints: {
    md: "min-width:800px",
  },
  max_content_width: "77rem",
  header_height: "96px",
};

export default theme;
