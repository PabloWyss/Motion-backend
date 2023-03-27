import React, { useEffect } from "react";
import { GridDiv, MainContainer } from "./friendsPosts.style";
import { useState } from "react";
import { v4 as uuid } from "uuid";
import PostRender from "../PostRender/postRender";

 const FriendsPosts = () => {
  const [ownPosts, setOwnPosts] = useState([]);
  const Token = localStorage.getItem("auth-token");

  const GetFriendsPosts = async () => {
    
    let myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${Token}`);

    let requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };


    await fetch(
      "https://motion.propulsion-home.ch/backend/api/social/posts/friends/",
      requestOptions).then((response) => response.json())
      .then((result) => setOwnPosts(result.results))
      .catch((error) => console.log("error", error));
    
  };

  useEffect(() => {
    GetFriendsPosts();
  }, []);


  return (
    <MainContainer>
      <GridDiv>
        {ownPosts.map((post) => {
          return <PostRender key={uuid()} ownPosts={post} />;
        })}
      </GridDiv>
    </MainContainer>
  );
}


export default FriendsPosts;