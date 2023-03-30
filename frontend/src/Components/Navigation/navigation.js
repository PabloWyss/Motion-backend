import React, { useState } from "react";
import {
  Logo,
  MainContainer,
  PageTitle,
  PostsSection,
  FindFriendsSection,
  AlertIcon,
  Avatar,
  MenuDots, 
  PostLogo, 
  FindFriendsLogo,
  NavText,
  ContainerLeft,
  ContainerRight,
  AlertNum,
  AlertContainer,
  AlertNumDiv,
  AlertNumSpacer,
  AlertNumSpacerAbsolute,
  NavigationDotsDiv,
  NavigationBellDiv,
  NavLinkStyle 
} from "./navigation.style";
import logo from "../../assets/images/logo.png";
import avatar from "../../assets/images/users/jennifer.png";
import menuDots from "../../assets/svgs/menu.svg"
import findFriendLogo from "../../assets/svgs/icon-friends.svg"
import postsLogo from "../../assets/svgs/posts_logo.svg"
import bell from "../../assets/svgs/notification_bell.svg"
import NavigationDots from "./NavigationDots/navigationDots";
import BellAlerts from "./BellAlerts/bellAlerts";
import { NavLink } from "react-router-dom";
import { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFriendRequests } from "../../redux/slices/friendReuqestSlice";
import avatarImage from "../../assets/svgs/avatar.svg"
import { useNavigate } from "react-router-dom";

const Navigation = () => {

  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(fetchFriendRequests())
  },[])
  
  const request = useSelector(store => store.friendRequests)
  const currentUser = useSelector(store => store.currentuser.currentuser)
  const navigate = useNavigate()
  let countRequest = 0

  if(request.requests.results){
    countRequest = request.requests.results.length
    let inerCount = 0
    request.requests.results.forEach((element)=>{
      if(element.status == "P"){
        inerCount  += 1
      }
    })
    countRequest = inerCount
  }

  const [dotsClicked, setDotsClicked] = useState(false)
  const [bellClicked, setBellClicked] = useState(false)

  const handleDotsClicjed = () => {
    setDotsClicked(!dotsClicked)
  }

  const handleMouseOutOfMenu = () => {
    setDotsClicked(!dotsClicked)
  }

  const handleBellClicked = () => {
    setBellClicked(!bellClicked)
  }

  const handleMouseOutOfBellMenu = () => {
    setBellClicked(!bellClicked)
  }

  const handleClickUser = () => {
   navigate(`/profile`)
  }


  return (
    <MainContainer>
      <ContainerLeft>
        <Logo src={logo}></Logo>
        <PageTitle>Motion</PageTitle>
          <NavLink
          to="/posts"
          style={
            ({ isActive }) =>
            isActive
            ? {
                color: "#ad73fd",
                textDecoration: "none",
                display: "flex", 
                alignItems: "center",
                borderBottom: "2px solid #AD73FD",
                height: "100%",
              }
            : { color: "grey",
                textDecoration: "none",
                display: "flex", 
                alignItems: "center", 
                height: "100%",}
            }
            >
            <PostsSection>
            <PostLogo src={postsLogo}></PostLogo>
            <NavText>Posts</NavText>
            </PostsSection>
          </NavLink>
        
        <FindFriendsSection>
          <NavLink
            to="/find-friends"
            style={({ isActive }) =>
            isActive
            ? {
              color: "#ad73fd",
              textDecoration: "none",
              display: "flex", 
              alignItems: "center",
              borderBottom: "2px solid #AD73FD",
              height: "100%",
            }
          : { color: "grey",
              textDecoration: "none",
              display: "flex", 
              alignItems: "center", 
              height: "100%",}
          }
            >
          <FindFriendsLogo src={findFriendLogo}></FindFriendsLogo>
          <NavText>Find Friends</NavText>
          </NavLink>
        </FindFriendsSection>
      </ContainerLeft>
      <ContainerRight>
        <AlertContainer>
          <AlertIcon src={bell} onClick={handleBellClicked }></AlertIcon>
          <AlertNumSpacerAbsolute>
            <AlertNumSpacer></AlertNumSpacer>
            <AlertNumDiv>
              <AlertNum>{countRequest}</AlertNum>
            </AlertNumDiv>
          </AlertNumSpacerAbsolute>
          {bellClicked ?
            <NavigationBellDiv onMouseLeave={handleMouseOutOfBellMenu}>
              <BellAlerts/>
            </NavigationBellDiv>:
            ""
          }
        </AlertContainer>
        {(currentUser.avatar == null)?
        <Avatar src={avatarImage} onClick={handleClickUser}></Avatar> :
        <Avatar src={currentUser.avatar} onClick={handleClickUser}></Avatar>
        }
        <MenuDots src={menuDots} onClick={handleDotsClicjed}></MenuDots>
        {dotsClicked ? 
         <NavigationDotsDiv onMouseLeave={handleMouseOutOfMenu }>
         <NavigationDots/>
       </NavigationDotsDiv> :
       ""}
      </ContainerRight>
    </MainContainer>
  );
};

export default Navigation;
