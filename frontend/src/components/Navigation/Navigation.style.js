import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";

export const HeaderContainer = styled.header`
  height: ${(props) => props.theme.header_height};
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow:
    0px 0px 1px rgba(0, 0, 0, 0.2),
    0px 10px 20px rgba(0, 0, 0, 0.05);
  position: fixed;
  top: 0;
  z-index: 10;
  padding: 0 2rem;
  border-bottom: solid rgba(0, 119, 191, 1) 1px;
  background: conic-gradient(
    from 90deg at 1.1px 1.1px,
    #f3f3e4 25%,
    rgb(217, 217, 217) 0
  );
  background-size: 24px 24px;
`;

export const ContainerLeft = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  gap: 2rem;
  width: 72%;

  nav {
    display: flex;
    height: 100%;
  }
`;

export const StyledP = styled.p`
  font-size: 18px;
`;

export const NavbarLink = styled(NavLink)`
  text-decoration: none;
  color: black;
  height: 100%;
  display: flex;
  align-items: center;
  gap: 1rem;
  border-bottom: 1.5px solid transparent; /* Add default border color */

  h1 {
    font-size: 33px;
    font-weight: 400;
  }

  &.active {
    border-color: #0077bf;
    color: #0077bf;
  }

  &:hover:not(.active) {
    border-color: #ccc;
  }
`;

export const StyledImage = styled.img`
  width: 30px;
  height: 30px;
  filter: saturate(0.7) brightness(1.35);
`;

export const ContainerRight = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

export const LogoWrapper = styled(Link)`
  display: flex;
  flex-direction: row;

  img {
    height: 55.4px;
    width: 293.79px;
  }
`;

export const SolutionWrapper = styled(Link)`
  img {
    height: 20px;
    width: 129px;
  }
`;
export const SwissFlag = styled.div`
  width: 10px;
  height: 20px;
  display: flex;
  justify-content: flex-start;
  align-items: start;
  margin-top: -0.3rem;

  max-width: 100%;
  max-height: 20%;

  img {
    height: 28px;
    width: 17px;
  }
`;

export const StyledH1 = styled.h1`
  display: flex;
  color: #0077bf;
  font-size: 38px;
  flex-direction: row;
`;

export const ProfileWrapper = styled(Link)`
  img {
    height: 20px;
    width: 91px;
    margin-right: 19rem;
  }
`;

export const MenuContainer = styled.div`
  position: relative;

  > img {
    padding: 0.06rem;
    margin-top: 0.3rem;
    cursor: pointer;
    width: 2.2rem;
    height: 2.1rem;
  }
`;

export const NotificationButton = styled.button`
  background: none;
  border: none;
  height: 100%;
  position: relative;

  .icon-wrapper {
    cursor: pointer;

    > img {
      height: 2.2rem;
      width: 2.8rem;
      padding-right: 0.7rem;
    }

    .request-count {
      font-size: 10px;
      font-weight: bold;
      position: absolute;
      top: -0.6rem;
      right: 0;

      background: rgba(0, 0, 0, 1);
      box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.07);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 1.2rem;
      width: 1.2rem;
      color: white;
    }
  }
`;

export const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  cursor: pointer;
`;

export const ActionsWrapper = styled.ul`
  position: absolute;
  top: calc(100% + 1rem);
  right: 0;
  width: 11rem;
  background-color: white;
  border-radius: 0.2rem;
  overflow: hidden;
`;

export const ActionContainer = styled.li`
  list-style: none;
  cursor: pointer;
  font-size: 0.875rem;

  &:first-child {
    border-bottom: 1px solid #d8d3d3;
  }

  &:hover {
    background: rgba(0, 0, 0, 0.05);
  }

  > a,
  > div {
    width: 100%;
    padding: 0.8rem 1.2rem;

    display: flex;
    align-items: center;
    gap: 1rem;

    img {
      opacity: 0.35;
    }

    &.active {
      background: rgba(0, 0, 0, 0.2);
    }
  }
`;

export const NotificationsContainer = styled.div`
  position: absolute;
  right: 0;
  top: calc(100% + 1rem);
  background: white;
  padding: 1.8rem;

  display: flex;
  flex-direction: column;
  gap: 3rem;
  border: 1px solid rgb(230, 230, 230);
  border-radius: 0.5rem;
`;

export const RequestTypeContainer = styled.div`
  > p {
    font-size: 1.2rem;
    text-align: left;
    margin-bottom: 2rem;
  }

  .requests-wrapper {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
`;

export const RequestContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  width: 22rem;

  a {
    display: flex;
    gap: 1rem;

    &:hover {
      text-decoration: underline;

      img {
        transform: scale(1.1);
      }
    }
  }

  .user-name-location {
    text-align: left;
    font-size: 0.875rem;
    line-height: 1.4;
    display: flex;
    flex-direction: column;
    justify-content: center;

    .user-location {
      opacity: 0.5;
    }
  }
`;

export const RequestStatusIcon = styled.img`
  height: 2.5rem;
  aspect-ratio: 1/1;

  cursor: ${(props) => (props.$noClick ? "default" : "pointer")};
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;
