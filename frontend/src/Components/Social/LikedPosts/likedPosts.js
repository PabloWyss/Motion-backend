import React, { useEffect } from "react";
import { GridDiv, MainContainer } from "./likedPosts.style";
import { useState } from "react";
import { v4 as uuid } from "uuid";
import PostRender from "../PostRender/postRender";

 const LikedPosts = () => {
  const [ownPosts, setOwnPosts] = useState([]);
  const Token = localStorage.getItem("auth-token");

  const GetLikedPosts = async () => {
    
    let myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${Token}`);

    let requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };


    await fetch(
      "https://motion-team2.propulsion-learn.ch/backend/api/social/posts/likes/",
      requestOptions).then((response) => response.json())
      .then((result) => setOwnPosts(result.results))
      .catch((error) => console.log("error", error));
    
  };

  useEffect(() => {
    GetLikedPosts();
  }, []);


  return (
    <MainContainer>
      <GridDiv>
        {ownPosts?.map((post) => {
          return <PostRender key={uuid()} ownPosts={post} />;
        })}
      </GridDiv>
    </MainContainer>
  );
}


export default LikedPosts;