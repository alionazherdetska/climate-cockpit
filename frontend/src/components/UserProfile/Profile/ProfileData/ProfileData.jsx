import {
  AboutMe,
  Grid,
  LikedThingsContainer,
  ProfileAboutContainer,
} from "./ProfileData.style.js";

function ProfileData(props) {
  return (
    <ProfileAboutContainer>
      <AboutMe>
        <h3>About me</h3>
        <p>{props.userdata.about_me}</p>
      </AboutMe>

      <LikedThingsContainer>
        <h3>Memberships</h3>
        <Grid>
          {props.userdata.memberships.map((thing) => {
            return <li key={thing}>{thing}</li>;
          })}
        </Grid>
      </LikedThingsContainer>
    </ProfileAboutContainer>
  );
}

export default ProfileData;
