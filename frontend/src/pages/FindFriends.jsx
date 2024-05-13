import FriendsGrid from "../components/FriendsGrid/FriendsGrid.jsx";

const FindFriends = () => {
  const randomNumber = Math.round(Math.random() * 100);

  return <FriendsGrid url={`users/?limit=21&offset=${randomNumber}/`} />;
};

export default FindFriends;
