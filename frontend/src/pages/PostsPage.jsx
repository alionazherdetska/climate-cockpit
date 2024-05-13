import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setGptbotUsers } from "../store/slices/gptbotUsers.js";
import PostsGrid from "../components/Posts/PostsGrid.jsx";
import SearchAndFilterBar from "../components/SearchAndFilterBar/SearchAndFilterBar.jsx";
import useAutoFetch from "../hooks/useAutoFetch.js";

const PostsPage = () => {
  const filterStateURLs = {
    All: "/social/posts/",
    Liked: "/social/posts/likes/",
    Friends: "/social/posts/friends/",
    Follow: "/social/posts/following/",
  };
  const filter = useSelector((store) => store.postsFilter.filter);
  const dispatch = useDispatch();

  const { data } = useAutoFetch("get", "users/gptbot/");

  useEffect(() => {
    if (data !== null) {
      dispatch(setGptbotUsers(data.results));
    }
  }, [dispatch, data]);

  return (
    <>
      <SearchAndFilterBar />
      <PostsGrid url={filterStateURLs[filter]} columnsCount={2} gutter="2rem" />
    </>
  );
};

export default PostsPage;
