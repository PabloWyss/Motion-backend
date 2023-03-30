import React from 'react'
import { useState } from 'react'
import Overlay from '../Overlay/overlay'
import menuDots from '../../assets/svgs/menu.svg'
import { OverlayButton } from './editForm.style'
import likeHeart from "../../assets/svgs/heart.svg";
import shareArrow from "../../assets/svgs/share.svg";
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
} from "./editForm.style.js";
import { v4 as uuid } from 'uuid';

const EditForm = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOverlay = () => {
    setIsOpen(!isOpen);
  };
  
  const moreThenOneImage = props.postDetails.images.length > 1;
  return (
    <div className="EditForm">
      <OverlayButton onClick={toggleOverlay}>
        <img src={menuDots} alt={menuDots} />
      </OverlayButton>

      <Overlay isOpen={isOpen} onClose={toggleOverlay}>
        <MainRenderContainer>
          <WrapperDiv>
            <FlexRowWrapper>
              <Avatar src={props.postDetails.user?.avatar} />
              <HeaderWrapper>
                <FlexColumnWrapper>
                  <Name>{`${props.postDetails.user?.first_name} ${props.postDetails.user?.last_name}`}</Name>
                  <Time>Time</Time>
                </FlexColumnWrapper>
              </HeaderWrapper>
            </FlexRowWrapper>
            <FlexRowWrapper>
              <PostText>{props.postDetails.content}</PostText>
            </FlexRowWrapper>
            {moreThenOneImage ? (
              <PictureGrid>
                {props.postDetails.images.map((image) => {
                  return (
                    <GridImage
                      key={uuid()}
                      src={image.image}
                      alt={image.image}
                    />
                  );
                })}
              </PictureGrid>
            ) : (
              props.postDetails.images.map((image) => {
                return (
                  <PostImage key={uuid()} src={image.image} alt={image.image} />
                );
              })
            )}
            <FooterWrapper>
              <HeartIcon src={likeHeart} alt="like heart" />
              <ActionButton>Like</ActionButton>
              <ShareIcon src={shareArrow} alt="share Icon" />
              <ActionButton>Share</ActionButton>
              <SeperatorDiv>
                <LikeCount>{props.postDetails.amount_of_likes} likes</LikeCount>
              </SeperatorDiv>
            </FooterWrapper>
          </WrapperDiv>
        </MainRenderContainer>
      </Overlay>
    </div>
  );
}

export default EditForm