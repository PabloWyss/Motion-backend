import React, { useState } from "react";
import {
  Avatar,
  Name,
  Time,
  PostText,
  HeartIcon,
  ActionButton,
  ShareIcon,
  LikeCount,
  FlexRowWrapper,
  FlexColumnWrapper,
  PictureGrid,
  WrapperDiv,
  HeaderWrapper,
  MainRenderContainer,
  PostImage,
  GridImage,
  SeperatorDiv,
  FooterWrapper,
} from "./postRender.style.js";
import likeHeart from "../../../assets/svgs/heart.svg";
import shareArrow from "../../../assets/svgs/share.svg";
import EditForm from "../../Forms/editForm.js";
import { useSelector } from "react-redux";
import LikePost from "../../LikePost/likePost.js";
import likeHeartClicked from "../../../assets/svgs/ShapelikedHeart.svg";
import ReactTimeAgo from "react-time-ago";
import { useNavigate } from "react-router-dom";

import { v4 as uuid } from "uuid";

const PostRender = (props) => {
  const moreThenOneImage = props.ownPosts.images.length > 1;
  const userData = useSelector((state) => state.currentuser.currentuser)
  let editAllow = false


  const [postIsLiked,setPostIsLiked] = useState(props.ownPosts.logged_in_user_liked)
  const [amountOfLikes,setAmountOfLikes] = useState(props.ownPosts.amount_of_likes)
  const currentUserToken = localStorage.getItem("auth-token")
  const navigate = useNavigate()

  const handleClickUser = () => {
    if(props.ownPosts.created_by.id == userData.id) {
      navigate(`/profile/`)
    } else{
      navigate(`/profile/${props.ownPosts.created_by.id}`)
    }
  }

  let avatar = "";
  if (props.ownPosts.created_by.avatar === null) {
    avatar =
      "https://t4.ftcdn.net/jpg/03/59/58/91/360_F_359589186_JDLl8dIWoBNf1iqEkHxhUeeOulx0wOC5.jpg";
  } else {
    avatar = props.ownPosts.created_by.avatar;
  }

  const handleEditAllow = () => {
    return (userData.id !== props.ownPosts.created_by.id ? editAllow : (editAllow = !editAllow))
  }


  const handleClickLike = () => {
    LikePost(currentUserToken,props.ownPosts.id)
    setPostIsLiked(!postIsLiked)
    if(postIsLiked){
      setAmountOfLikes(amountOfLikes -1)
    } else {
      setAmountOfLikes(amountOfLikes +1)
    }
  }

  

  return (
    <MainRenderContainer>
      <WrapperDiv>
        <FlexRowWrapper>
          <Avatar src={avatar} onClick={handleClickUser}/>
          <HeaderWrapper>
            <FlexColumnWrapper>
              <Name onClick={handleClickUser}>{`${props.ownPosts.created_by.first_name} ${props.ownPosts.created_by.last_name}`}</Name>
              <Time>
                <ReactTimeAgo date={props.ownPosts.created} locale="en-US" />
              </Time>
            </FlexColumnWrapper>
          </HeaderWrapper>
          <EditForm
            key={uuid()}
            postDetails={props.ownPosts}
            edit={handleEditAllow()}
          />
        </FlexRowWrapper>
        <FlexRowWrapper>
          <PostText>{props.ownPosts.text}</PostText>
        </FlexRowWrapper>
        {moreThenOneImage ? (
          <PictureGrid>
            {props.ownPosts.images.map((image) => {
              return (
                <GridImage key={uuid()} src={image.image} alt={image.image} />
              );
            })}
          </PictureGrid>
        ) : (
          props.ownPosts.images.map((image) => {
            return (
              <PostImage key={uuid()} src={image.image} alt={image.image} />
            );
          })
        )}
        <FooterWrapper>
          {postIsLiked ? (
            <HeartIcon
              onClick={handleClickLike}
              src={likeHeartClicked}
              alt="like heart"
            />
          ) : (
            <HeartIcon
              onClick={handleClickLike}
              src={likeHeart}
              alt="like heart"
            />
          )}
          {postIsLiked ? (
            <ActionButton onClick={handleClickLike}>Liked</ActionButton>
          ) : (
            <ActionButton onClick={handleClickLike}>Like</ActionButton>
          )}
          <ShareIcon src={shareArrow} alt="share Icon" />
          <ActionButton>Share</ActionButton>
          <SeperatorDiv>
            <LikeCount>{amountOfLikes} likes</LikeCount>
          </SeperatorDiv>
        </FooterWrapper>
      </WrapperDiv>
    </MainRenderContainer>
  );
};

export default PostRender;

