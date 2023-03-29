import React, { useEffect } from 'react'
import { MainContainer } from './posts.style'
import Navigation from '../../Components/Navigation/navigation'
import SearchAndFilterBar from "../../Components/SearchAndFilterBar/searchAndFilterBar";
import PostWrapper from '../../Components/Social/Post/postWrapper';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentUser } from '../../redux/slices/currentUser';


const Posts = () => {
  
  const dispatch = useDispatch();

  const GetUsers_me = async () => {
    let Token = localStorage.getItem("auth-token");

    let myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${Token}`);

    let requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    await fetch("https://motion-team2.propulsion-learn.ch/backend/api/users/me/", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        dispatch(setCurrentUser(result))
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(()=>{
    GetUsers_me()
    
  }, [])
  

  

  return (
    <MainContainer>
      <Navigation />
      <SearchAndFilterBar />
      <PostWrapper />
    </MainContainer>
  )
}

export default Posts