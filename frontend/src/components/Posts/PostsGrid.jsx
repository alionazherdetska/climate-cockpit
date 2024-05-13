import Masonry from "react-responsive-masonry";
import { MainContainer } from "./PostsGrid.style.js";
import CreatePostSmall from "./CreatePost/CreatePostSmall.jsx";
import useAutoFetch from "../../hooks/useAutoFetch.js";
import Post from "./Post/Post.jsx";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner.jsx";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const PostsGrid = ({ url, inProfile, columnsCount, gutter }) => {
  const [postToShare, setPostToShare] = useState();
  const [listOfPosts, setListOfPosts] = useState([]);
  const searchText = useSelector((store) => store.postsFilter.filterSearch);
  let urlToFetch = url;
  if (searchText) {
    urlToFetch = url + `?search=${searchText}`;
  }
  const { data, loading, error } = useAutoFetch("get", urlToFetch);
  const [showCreatePostModal, setShowCreatePostModal] = useState(false);

  useEffect(() => {
    if (data) {
      setListOfPosts(data.results);
    }
  }, [data]);

  if (loading) return <LoadingSpinner />;
  return (
    <MainContainer>
      <Masonry columnsCount={columnsCount} gutter={gutter}>
        {!inProfile && (
          <CreatePostSmall
            setListOfPosts={setListOfPosts}
            postToShare={postToShare}
            setModalIsOpen={setShowCreatePostModal}
            modalIsOpen={showCreatePostModal}
          />
        )}
        {error && <p>{error.message}</p>}
        {data &&
          listOfPosts.map((post) => {
            return (
              <Post
                key={post.id}
                setListOfPosts={setListOfPosts}
                listOfPosts={listOfPosts}
                postData={post}
                setPostToShare={setPostToShare}
                setShowCreatePostModal={setShowCreatePostModal}
              />
            );
          })}
      </Masonry>
    </MainContainer>
  );
};

export default PostsGrid;
