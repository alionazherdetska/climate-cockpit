import trashIndustry from "../../assets/dashboard_icons//Trash_Industry.png";
import cowMeatIcon from "../../assets/dashboard_icons/Agriculture_Cow_Meat.png";
import cowMeatIconBlue from "../../assets/dashboard_icons/Agriculture_Cow_Meat_Blue.png";
import cowMilkIcon from "../../assets/dashboard_icons/Agriculture_Cow_Milk.png";
import cowMilkIconBlue from "../../assets/dashboard_icons/Agriculture_Cow_Milk_Blue.png";
import otherMeatIcon from "../../assets/dashboard_icons/Agriculture_Other_Meat.png";
import otherMeatIconBlue from "../../assets/dashboard_icons/Agriculture_Other_Meat_Blue.png";
import plantsIcon from "../../assets/dashboard_icons/Agriculture_Plants.png";
import plantsIconBlue from "../../assets/dashboard_icons/Agriculture_Plants_Blue.png";
import buildingIndustry from "../../assets/dashboard_icons/Buildings_Commercial.png";
import buildingIndustryBlue from "../../assets/dashboard_icons/Buildings_Commercial_Blue.png";
import buildingResidentialIcon from "../../assets/dashboard_icons/Buildings_Residential.png";
import buildingResidentialIconBlue from "../../assets/dashboard_icons/Buildings_Residential_Blue.png";
import electricityIcon from "../../assets/dashboard_icons/Electricity.png";
import electricityIconBlue from "../../assets/dashboard_icons/Electricity_Blue.png";
import importPrimary from "../../assets/dashboard_icons/Imports_Primary.png";
import importSecondary from "../../assets/dashboard_icons/Imports_Secondary.png";
import importSecondaryBlue from "../../assets/dashboard_icons/Imports_SecondaryBlue.png";
import industry from "../../assets/dashboard_icons/Indstry.png";
import industryBlue from "../../assets/dashboard_icons/Indstry_Blue.png";
import innovation from "../../assets/dashboard_icons/Innovation.png";
import money from "../../assets/dashboard_icons/Money.png";
import removalIcon from "../../assets/dashboard_icons/Nature.png";
import carIcon from "../../assets/dashboard_icons/Transport_Cars.png";
import carIconBlue from "../../assets/dashboard_icons/Transport_Cars_Blue.png";
import freightPlanes from "../../assets/dashboard_icons/Transport_Plane_Freight.png";
import freightPlanesBlue from "../../assets/dashboard_icons/Transport_Plane_Freight_Blue.png";
import passengerPlaneIcon from "../../assets/dashboard_icons/Transport_Plane_People.png";
import passengerPlaneIconBlue from "../../assets/dashboard_icons/Transport_Plane_People_Blue.png";
import Trucks from "../../assets/dashboard_icons/Transport_Trucks.png";
import TrucksBlue from "../../assets/dashboard_icons/Transport_Trucks_Blue.png";
import trashIndustryBlue from "../../assets/dashboard_icons/Trash_Industry_Blue.png";
import trashHouseholdsIcon from "../../assets/dashboard_icons/Trash_Residential.png";
import trashHouseholdsIconBlue from "../../assets/dashboard_icons/Trash_Residential_Blue.png";

import { useEffect, useState } from "react";
import useAutoFetch from "../../hooks/useAutoFetch.js";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner.jsx";
import CircleShapedEmissionPoints from "./CircleShapedEmissionPoints.jsx";
import {
  BottomDiv,
  CustomStyledP,
  CustomStyledP2,
  DashboardGridDiv,
  Import,
  Innovation,
  Removal,
  Source,
  StyledH2,
  StyledP,
} from "./dashboard.style.js";

export default function DashboardGrid({ listChanged, setEmissionEquation }) {
  const [dashboardItems, setDashboardItems] = useState(null);
  const [inlandSolutionScore, setInlandSolutionScore] = useState(null);
  const [importSolutionScore, setImportSolutionScore] = useState(null);
  const [removedScore, setRemovedScore] = useState(null);

  useEffect(() => {
    if (dashboardItems) {
      setInlandSolutionScore(
        dashboardItems
          .slice(0, 14)
          .reduce((total, item) => total + (item?.altered_amout || 0), 0),
      );

      setImportSolutionScore(dashboardItems[14]?.altered_amout);

      setRemovedScore(
        dashboardItems[15]?.initial_amount + dashboardItems[15]?.altered_amout,
      );

      setEmissionEquation((prevState) => ({
        ...prevState,
        solution: inlandSolutionScore + importSolutionScore,
        removed: removedScore,
        total:
          47 + 71 - importSolutionScore - inlandSolutionScore - removedScore,
      }));
    }
  }, [
    dashboardItems,
    importSolutionScore,
    inlandSolutionScore,
    removedScore,
    setEmissionEquation,
  ]);

  const { data } = useAutoFetch(
    "get",
    "solution/dashboard-items/?limit=18",
    undefined,
    listChanged,
    "noAuth",
  );

  useEffect(() => {
    if (data && data.results) setDashboardItems(data.results);
  }, [data]);

  const standardImageStyle = {
    width: "3.4vw",
    height: "3.2vw",
  };

  const importImageStyle = {
    width: "0.55vw",
    height: "3.2vw",
  };

  const renderIcons = (count, imageUrl, customStyle) => {
    return Array.from({ length: count }).map((_, index) => (
      <img src={imageUrl} key={index} style={customStyle} />
    ));
  };

  if (dashboardItems === null) return <LoadingSpinner />;
  return (
    <>
      <StyledH2>Inland Emissions</StyledH2>
      <DashboardGridDiv>
        <StyledP>Industry</StyledP>
        <div>
          {renderIcons(
            dashboardItems[0]?.initial_amount -
              dashboardItems[0]?.altered_amout,
            industry,
            standardImageStyle,
          )}
          {renderIcons(
            dashboardItems[0]?.altered_amout,
            industryBlue,
            standardImageStyle,
          )}
        </div>
        <div>
          {renderIcons(
            dashboardItems[1]?.initial_amount -
              dashboardItems[1]?.altered_amout,
            buildingIndustry,
            standardImageStyle,
          )}
          {renderIcons(
            dashboardItems[1]?.altered_amout,
            buildingIndustryBlue,
            standardImageStyle,
          )}

          {renderIcons(
            dashboardItems[2]?.initial_amount -
              dashboardItems[2]?.altered_amout,
            Trucks,
            standardImageStyle,
          )}
          {renderIcons(
            dashboardItems[2]?.altered_amout,
            TrucksBlue,
            standardImageStyle,
          )}

          {renderIcons(
            dashboardItems[3]?.initial_amount -
              dashboardItems[3]?.altered_amout,
            freightPlanes,
            standardImageStyle,
          )}
          {renderIcons(
            dashboardItems[3]?.altered_amout,
            freightPlanesBlue,
            standardImageStyle,
          )}

          {renderIcons(
            dashboardItems[4]?.initial_amount -
              dashboardItems[4]?.altered_amout,
            trashIndustry,
            standardImageStyle,
          )}
          {renderIcons(
            dashboardItems[4]?.altered_amout,
            trashIndustryBlue,
            standardImageStyle,
          )}
        </div>

        <StyledP>Households</StyledP>
        <div>
          {renderIcons(
            dashboardItems[5]?.initial_amount -
              dashboardItems[5]?.altered_amout,
            buildingResidentialIcon,
            standardImageStyle,
          )}
          {renderIcons(
            dashboardItems[5]?.altered_amout,
            buildingResidentialIconBlue,
            standardImageStyle,
          )}

          {renderIcons(
            dashboardItems[6]?.initial_amount -
              dashboardItems[6]?.altered_amout,
            passengerPlaneIcon,
            standardImageStyle,
          )}
          {renderIcons(
            dashboardItems[6]?.altered_amout,
            passengerPlaneIconBlue,
            standardImageStyle,
          )}

          {renderIcons(
            dashboardItems[7]?.initial_amount -
              dashboardItems[7]?.altered_amout,
            trashHouseholdsIcon,
            standardImageStyle,
          )}
          {renderIcons(
            dashboardItems[7]?.altered_amout,
            trashHouseholdsIconBlue,
            standardImageStyle,
          )}
        </div>
        <div>
          {renderIcons(
            dashboardItems[8]?.initial_amount -
              dashboardItems[8]?.altered_amout,
            carIcon,
            standardImageStyle,
          )}
          {renderIcons(
            dashboardItems[8]?.altered_amout,
            carIconBlue,
            standardImageStyle,
          )}
        </div>
        <div>
          <div className="left-column">
            <CustomStyledP>Agriculture</CustomStyledP>
          </div>
          <div className="right-column">
            <CustomStyledP2>Electricity</CustomStyledP2>
          </div>
        </div>
        <div>
          <div className="left-column">
            {renderIcons(
              dashboardItems[10]?.initial_amount -
                dashboardItems[10]?.altered_amout,
              cowMeatIcon,
              standardImageStyle,
            )}
            {renderIcons(
              dashboardItems[10]?.altered_amout,
              cowMeatIconBlue,
              standardImageStyle,
            )}
            {renderIcons(
              dashboardItems[9]?.initial_amount -
                dashboardItems[9]?.altered_amout,
              cowMilkIcon,
              standardImageStyle,
            )}
            {renderIcons(
              dashboardItems[9]?.altered_amout,
              cowMilkIconBlue,
              standardImageStyle,
            )}
            {renderIcons(
              dashboardItems[11]?.initial_amount -
                dashboardItems[11]?.altered_amout,
              otherMeatIcon,
              standardImageStyle,
            )}
            {renderIcons(
              dashboardItems[11]?.altered_amout,
              otherMeatIconBlue,
              standardImageStyle,
            )}
            {renderIcons(
              dashboardItems[12]?.initial_amount -
                dashboardItems[12]?.altered_amout,
              plantsIcon,
              standardImageStyle,
            )}
            {renderIcons(
              dashboardItems[12]?.altered_amout,
              plantsIconBlue,
              standardImageStyle,
            )}
          </div>
          <div className="right-column">
            {renderIcons(
              dashboardItems[13]?.initial_amount -
                dashboardItems[13]?.altered_amout,
              electricityIcon,
              standardImageStyle,
            )}
            {renderIcons(
              dashboardItems[13]?.altered_amout,
              electricityIconBlue,
              standardImageStyle,
            )}
            <div>
              <CircleShapedEmissionPoints
                data={{ type: "inland", total_number: 47, offset: "-1.2rem" }}
              />
              {inlandSolutionScore !== 0 ? (
                <CircleShapedEmissionPoints
                  data={{
                    offset: "1.5rem",
                    type: "solution",
                    total_number: -inlandSolutionScore,
                  }}
                />
              ) : null}
            </div>
          </div>
        </div>
      </DashboardGridDiv>

      <StyledH2>Imports</StyledH2>
      <Import>
        <img src={importPrimary} key={1} style={standardImageStyle} />
        {/*For the importSecondary importSecondaryBlue I want a different imageStyle*/}
        {renderIcons(
          dashboardItems[14]?.initial_amount -
            dashboardItems[14]?.altered_amout,
          importSecondary,
          importImageStyle,
        )}
        {renderIcons(
          dashboardItems[14]?.altered_amout,
          importSecondaryBlue,
          importImageStyle,
        )}
        <CircleShapedEmissionPoints
          data={{ type: "imported", total_number: 71, offset: "-1.2rem" }}
        />

        {importSolutionScore !== 0 ? (
          <CircleShapedEmissionPoints
            data={{
              offset: "1.5rem",
              type: "solution",
              total_number: -importSolutionScore,
            }}
          />
        ) : null}
      </Import>

      <StyledH2>Removal</StyledH2>
      <Removal>
        <div className="left-column">
          {renderIcons(
            dashboardItems[15]?.initial_amount +
              dashboardItems[15]?.altered_amout,
            removalIcon,
            standardImageStyle,
          )}
          <CircleShapedEmissionPoints
            data={{
              offset: "-1.2rem",
              type: "removed",
              total_number: -removedScore,
            }}
          />
        </div>
      </Removal>
      <Innovation>
        <div>
          <div className="innovation">
            {dashboardItems[16]?.altered_amout !== 0 && (
              <StyledH2 style={{ marginLeft: "0" }}>Innovations</StyledH2>
            )}
          </div>
          <div className="money">
            {dashboardItems[16]?.altered_amout !== 0 && (
              <StyledH2>Money</StyledH2>
            )}
          </div>
        </div>
        <div>
          <div className="innovation">
            {renderIcons(
              dashboardItems[16]?.initial_amount +
                dashboardItems[16]?.altered_amout,
              innovation,
              standardImageStyle,
            )}
          </div>
          <div className="money">
            {renderIcons(
              dashboardItems[17]?.initial_amount +
                dashboardItems[17]?.altered_amout,
              money,
              standardImageStyle,
            )}
          </div>
        </div>
      </Innovation>
      <Source>
        <BottomDiv>
          <div style={{ textAlign: "right" }}>
            SOURCE: Swiss Greenhouse Gas Inventory 2022, Bundesamt für Umwelt
            {"\u00A0"}
            {"\u00A0"}
          </div>
          <div style={{ textAlign: "right" }}>In Megatons of CO2e</div>
        </BottomDiv>
      </Source>
    </>
  );
}
