import React,{useState} from "react";
import icon_search from "../../assets/svgs/search_icon.svg";
import {
  ContainerWrapperLeft,
  FilterWrapper,
  ContainerWrapperRight,
  SearchBarContainer,
  SearchIcon,
  SearchInput,
  FilterSetter,
  SearchBarWrapper
} from "./searchAndFilterBar.style";
import LikedPosts from "../Social/LikedPosts/likedPosts";
import { useDispatch } from "react-redux";
import { setpostsFilter } from "../../redux/slices/postsFilter";
import OtherPosts from "../Social/OtherPosts/otherPosts";

const SearchAndFilterBar = () => {


  const Token = localStorage.getItem("auth-token");
  const [ownPosts, setOwnPosts] = useState([]);
  const dispatch = useDispatch();

  const handleLoginClick = async (e) => {
    e.preventDefault();
   
   
    dispatch(setpostsFilter("Liked"));
    
    //GetLikedPosts();

    
  };

  const handleLoginClick2 = async (e) => {
    e.preventDefault();
   
   
    dispatch(setpostsFilter("Friends"));
    
    //GetLikedPosts();

    
  };

  const handleLoginClick3 = async (e) => {
    e.preventDefault();
   
   
    dispatch(setpostsFilter("Follow"));
    
    //GetLikedPosts();

    
  };
  
  
  const GetLikedPosts = async () => {
      
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjc3OTQzOTU1LCJqdGkiOiJkZDlkMjEyYjI1YTM0Y2E4YTlmMjQxYzk4NjUyNzVhNSIsInVzZXJfaWQiOjIyODR9.nQLXzJjnHqNJskQUpu9jr-u3EVuz9NXwqDrr-wTw29c");
    
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    
    fetch("https://motion-team2.propulsion-learn.ch/backend/api/social/posts/likes/", requestOptions)
      .then(response => response.json())
      //.then(result => dispatch(setpostFilter(result)))
      .then(result => dispatch(setpostsFilter(result)))
      .catch(error => console.log('error', error));
  }

  return (
    <SearchBarContainer>
      <SearchBarWrapper>
      <ContainerWrapperLeft>
        <SearchIcon src={icon_search}></SearchIcon>
        <SearchInput type="text" placeholder="Search posts..."></SearchInput>
      </ContainerWrapperLeft>
      <ContainerWrapperRight>
        <FilterWrapper>
   
          <FilterSetter type="button" onClick={handleLoginClick}>Liked</FilterSetter>
          <FilterSetter type="button" onClick={handleLoginClick2}>Friends</FilterSetter>
          <FilterSetter type="button" onClick={handleLoginClick3}>Follow</FilterSetter>
        </FilterWrapper>
      </ContainerWrapperRight>
      </SearchBarWrapper>
    </SearchBarContainer>
  );
};

export default SearchAndFilterBar;
