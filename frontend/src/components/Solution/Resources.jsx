import { useEffect, useState } from "react";
import useAutoFetch from "../../hooks/useAutoFetch.js";
import {
  BookNews,
  CloseButton,
  Container,
  ModalContent,
  NewsThumbnail,
  Overlay,
  SimpleModal,
  Tab,
  Video,
  VideoContainer,
  VideoDescription,
  VideoInfoContainer,
  VideoTitle,
} from "./Resources.style.js";

function Resources({ solutionId }) {
  const [modalVideo, setModalVideo] = useState(null);
  const [newsList, setNewsList] = useState([]);
  const [activeTab, setActiveTab] = useState("Videos");

  const { data } = useAutoFetch(
    "get",
    `solution/resources/${solutionId}?type=${activeTab.toLocaleLowerCase()}`,
    undefined,
    activeTab,
    "noAuth",
  );

  const [videosList, setVideosList] = useState([]);

  useEffect(() => {
    if (data) {
      switch (activeTab) {
        case "Videos":
          setVideosList(data.results);
          break;
        case "News":
          setNewsList(data.results);
          break;
        default:
          console.warn("Unhandled tab or no data available");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const openModalWithVideo = (videoUrl) => {
    setModalVideo(videoUrl);
  };

  const closeModal = () => {
    setModalVideo(null);
  };
  const handleModalClick = (event) => {
    event.stopPropagation();
  };
  return (
    <div style={{ width: "100%" }}>
      <Container>
        <Tab
          onClick={() => setActiveTab("Videos")}
          $isActive={activeTab === "Videos"}
        >
          Videos
        </Tab>
        <Tab
          onClick={() => setActiveTab("News")}
          $isActive={activeTab === "News"}
        >
          News
        </Tab>
      </Container>
      <SimpleModal $show={!!modalVideo} onClick={closeModal}>
        <ModalContent onClick={handleModalClick}>
          {modalVideo && (
            <iframe
              width="560"
              height="315"
              src={modalVideo}
              title="Video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          )}
          <CloseButton $show={!!modalVideo} onClick={closeModal} />
        </ModalContent>
      </SimpleModal>

      {activeTab === "Videos" && (
        <VideoContainer>
          {videosList.map((video, index) => (
            <VideoInfoContainer key={index}>
              <Video onClick={() => openModalWithVideo(video.url)}>
                <iframe
                  width="100%"
                  height="100%"
                  src={video.url}
                  title={video.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
                <Overlay onClick={() => openModalWithVideo(video.url)} />
              </Video>
              <VideoTitle>{video.title}</VideoTitle>
              <VideoDescription>{video.source}</VideoDescription>
            </VideoInfoContainer>
          ))}
        </VideoContainer>
      )}

      {activeTab === "News" && (
        <VideoContainer>
          {newsList.map((news, index) => (
            <div key={index}>
              <a href={news.url} target="_blank" rel="noreferrer noopener">
                <BookNews>
                  {news.thumbnail && (
                    <NewsThumbnail src={news.thumbnail} alt={news.title} />
                  )}
                </BookNews>
                <VideoTitle>{news.title}</VideoTitle>
              </a>
              <VideoDescription>{news.source}</VideoDescription>
            </div>
          ))}
        </VideoContainer>
      )}
    </div>
  );
}

export default Resources;
