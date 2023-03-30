import React from "react";
import CreateOwnPost from "../CreateOwnPost/createOwnPost";
import OtherPosts from "../OtherPosts/otherPosts";
import OwnPosts from "../OwnPosts/ownPosts";
import SharedPosts from "../Shared Post/sharedPosts";
import { MainContainer,  SideSeperatorLeft, SideSeperatorRight } from "./postWrapper.style";
import { useSelector } from 'react-redux';
import LikedPosts from "../LikedPosts/likedPosts";
import FriendsPosts from "../FriendsPosts/friendsPosts";
import FollowersPosts from "../FollowersPosts/followersPosts";

const PostWrapper = () => {

    const filter = useSelector((store) => store.postsFilter.postsFilter); //get state from redux

    const displayComponent = () => {
      switch (filter) {
        case "Liked":
          return <LikedPosts />;
          case "Friends":
            return <FriendsPosts />;
            case "Follow":
              return <FollowersPosts />;
        default:
          return <OtherPosts />;
      }
    };

  return (
    <MainContainer>
      <SideSeperatorLeft>
        <CreateOwnPost />
        <OwnPosts />
      </SideSeperatorLeft>
      <SideSeperatorRight>
      <>{displayComponent()}</>
      </SideSeperatorRight>
    </MainContainer>
  );
};

export default PostWrapper;
