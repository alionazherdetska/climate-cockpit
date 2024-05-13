import styled from "styled-components";

export const Video = styled.div`
  width: 200px;
  height: 120px;
  background-color: ${(props) => props.theme.ResourcesColors.videoBackground};
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  border-radius: 20px;
  cursor: pointer;
  transition: transform 0.1s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

export const BookNews = styled.div`
  width: 200px;
  height: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.1s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

export const NewsThumbnail = styled.img`
  max-width: 100%;
  max-height: 100px;
`;

export const VideoInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  height: auto;
  width: 200px;
`;

export const VideoTitle = styled.h3`
  margin: 10px 0 5px;
  width: 100%;
  text-align: start;
  font-size: 1rem;
`;

export const VideoDescription = styled.p`
  margin-top: auto;
  width: 100%;
  text-align: start;
  font-size: 0.85rem;
  color: #666;
`;
export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const Tab = styled.div`
  padding: 5px;
  cursor: pointer;
  font-weight: 600;
  margin-top: 1vh;
  color: ${(props) => props.theme.ResourcesColors.tabColor};
  border-bottom: ${(props) => (props.$isActive ? "2px solid black" : "none")};
`;

export const VideoContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  gap: 10px;
  padding: 10px 0;
  overflow-x: scroll;
`;

export const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
  cursor: pointer;
`;

export const SimpleModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  visibility: ${(props) => (props.$show ? "visible" : "hidden")};
  opacity: ${(props) => (props.$show ? "1" : "0")};
  transition:
    opacity 0.1s,
    visibility 0.1s;
  z-index: 1002;
`;

export const ModalContent = styled.div``;

export const CloseButton = styled.button`
  position: absolute;
  top: 150px;
  right: 250px;
  background: none;
  border: none;
  font-size: 2.5rem;
  cursor: pointer;
  color: #ffffff;

  &:after {
    content: "×";
  }
`;
