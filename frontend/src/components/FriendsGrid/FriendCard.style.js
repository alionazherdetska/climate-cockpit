import styled from "styled-components";
import { Link } from "react-router-dom";
import { CardWithShadowStyles } from "../../styles/globalStyles.js";
import paper_texture from "../../assets/images/paper_texture2.png";

export const FindFriendsContainer = styled.div`
  display: flex;
  width: 98%;
  padding: 0;
  margin-left: 11rem;
  margin-top: 2rem;
`;
export const FriendsGridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 33rem);
  grid-auto-rows: 23rem;

  width: 50%;
  grid-row-gap: 2.5rem;
  grid-column-gap: 0;
  padding: 0;
  margin: 0;
  justify-items: center;
  align-items: center;
`;

export const FriendCardContainer = styled(CardWithShadowStyles)`
  aspect-ratio: 1/2;
  display: flex;
  background-image: url(${paper_texture});
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 93%;
  padding: 0;

  &::after {
    border-top: 1px solid lightgray;
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 50%;
    background-size: cover;
  }
`;

export const RightBar = styled.div`
  display: flex;
  flex-direction: column;
  width: 63%;
  height: 100%;
`;

export const RightTop = styled.div`
  display: flex;
  flex-direction: row;
  height: 50%;
  width: 100%;
  gap: 10%;
`;

export const RightBottom = styled.div`
  display: flex;
  flex-direction: row;
  height: 50%;
  width: 100%;
`;

export const NameLocation = styled.div`
  display: flex;
  gap: 0.2rem;
  flex-direction: column;
  width: 50%;
  height: 100%;
  padding-right: 1.3rem;
  align-items: end;
  justify-content: center;
  border-right: 1px solid lightgray;
`;

export const FriendCardHeader = styled(Link)`
  display: flex;
  overflow: hidden;
  height: 100%;
  width: 42%;
  flex-direction: column;
  align-items: center;
  justify-content: stretch;

  &:hover {
    cursor: pointer;
  }
`;

export const FriendAvatar = styled.img`
  width: 16rem;
  height: 22rem;
  object-fit: cover;
  margin-right: 5.7rem;
  margin-top: -1rem;
  border-radius: 50%;
  border-top: none;
  z-index: 1;
`;

export const FriendName = styled.p`
  font-weight: 600;
  font-size: 1.3rem;
  text-align: end;
  width: 100%;
`;

export const FriendLocation = styled.p`
  font-size: 1rem;
  text-align: end;
  justify-content: end;
  margin-bottom: 1.2rem;
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 3rem;

  width: 30%;
  gap: 0.4rem;
  height: 40%;
  justify-content: center;
  align-items: center;

  > button {
    flex: 1;
  }
`;

export const Memberships = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  gap: 1rem;
  z-index: 1;
  align-items: center;
  justify-content: start;
  margin-left: -2rem;
`;

export const FriendAbout = styled.p`
  font-size: 16px;
  line-height: 1.35;
  text-align: end;
  margin-bottom: 1.2rem;
  width: 43%;
  z-index: 1;
  margin-left: 13%;
  margin-top: 10%;
`;

export const PopUp = styled.div`
  position: relative;
  padding: 1rem;
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: end;
  background: conic-gradient(
    from 90deg at 1.1px 1.1px,
    #f3f3e4 25%,
    rgb(217, 217, 217) 0
  );
  background-size: 24px 24px;
  box-shadow:
    0px 0px 1px rgba(0, 0, 0, 0.6),
    0px 10px 20px rgba(0, 0, 0, 0.05);
  border-radius: 4px;
  z-index: 10;

  min-width: 11rem;
  min-height: 14rem;
  max-width: 30rem;
  max-height: 40rem;
`;

export const ReadMoreButton = styled.button`
  border: none;
  background: none;
  padding: 0;
  cursor: pointer;
  text-decoration: underline;
  font-size: inherit;
  color: inherit;
  font-family: inherit;
`;
