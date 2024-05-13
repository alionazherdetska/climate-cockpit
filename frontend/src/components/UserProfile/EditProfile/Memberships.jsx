import { useState } from "react";
import {
  Grid,
  LikedThingsContainer,
} from "../Profile/ProfileData/ProfileData.style.js";
import {
  LabelStyle,
  ProfileButton,
  StyledInputHeader,
} from "../Profile/ProfileHeader.style.js";

const Memberships = ({ things, setUserData, userData }) => {
  const [newThing, setNewThing] = useState("");

  const submitNewThing = (e) => {
    e.preventDefault();
    if (newThing.length > 0 && things.length < 6) {
      setUserData({ ...userData, memberships: [...things, newThing] });
      setNewThing("");
    }
  };

  const removeThing = (e) => {
    const thingToRemove = e.target.previousSibling.innerHTML;
    setUserData({
      ...userData,
      memberships: things.filter((thing) => thing !== thingToRemove),
    });
  };

  return (
    <>
      <div className={"input-field things-liked"}>
        <LabelStyle>Memberships</LabelStyle>
        <LikedThingsContainer>
          <Grid>
            {things?.map((thing) => {
              return (
                <li key={thing}>
                  <span>{thing}</span>
                  <button onClick={removeThing}>&#10005;</button>
                </li>
              );
            })}
          </Grid>
        </LikedThingsContainer>
        <form onSubmit={submitNewThing} className="input-submit-wrapper">
          <StyledInputHeader
            type="text"
            id="memberships"
            onChange={(e) => setNewThing(e.target.value)}
            value={newThing}
            placeholder={"Type something ..."}
          />
          <ProfileButton onClick={submitNewThing}>Add</ProfileButton>
        </form>
      </div>
    </>
  );
};

export default Memberships;
