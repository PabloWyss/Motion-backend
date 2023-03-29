import { Fragment } from "react";
import { useState } from "react";
import {
  AddFriendsInerDivButton,
  AddFollowAddFriendButton,
  FollowInerDivButton,
  TickerImage,
} from "./findfriendsgrid.style";
import tickerImage from "../../../../../../../assets/svgs/Ticker.svg";

function FollowAddButtons(props) {
  
  const [FolowUser, setFollowUser] = useState(props.userdata.logged_in_user_is_following);
  const [addFriend, setAddFriend] = useState(props.userdata.logged_in_user_sent_fr);

  const Token = localStorage.getItem("auth-token");

  const Usersfollow = (userid) => {
    let myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${Token}`);

    let requestOptions = {
      method: "POST",
      headers: myHeaders,
      redirect: "follow",
    };
    fetch(
      "https://motion-team2.propulsion-learn.ch/backend/api/social/followers/toggle-follow/" +
        userid +
        "/",
      requestOptions
    )
      .then((response) => response.text())
      .catch((error) => console.log("error", error));
  };

  const SendFriendRequest = (userid) => {
    let myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${Token}`);

    let requestOptions = {
      method: "POST",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      "https://motion-team2.propulsion-learn.ch/backend/api/social/friends/request/" + userid + "/",
      requestOptions
    )
      .then((response) => response.json())
      .catch((error) => console.log("error", error));
  };

  const hanldeFollowButton = () => {
    setFollowUser(!FolowUser);
    Usersfollow(props.userdata.id);
  };

  const hanldeAddFriendButton = () => {
    if (addFriend === false) {
      setAddFriend(!addFriend);
      SendFriendRequest(props.userdata.id);
    }
  };

  return (
    <Fragment>
      <FollowInerDivButton follow={FolowUser} onClick={hanldeFollowButton}>
        <AddFollowAddFriendButton>{FolowUser ? "Followed" : "Follow"}</AddFollowAddFriendButton>
      </FollowInerDivButton>
      <AddFriendsInerDivButton onClick={hanldeAddFriendButton}>
        {addFriend ? <TickerImage src={tickerImage} /> : ""}
        <AddFollowAddFriendButton>Add Friend</AddFollowAddFriendButton>
      </AddFriendsInerDivButton>
    </Fragment>
  );
}

export default FollowAddButtons;
