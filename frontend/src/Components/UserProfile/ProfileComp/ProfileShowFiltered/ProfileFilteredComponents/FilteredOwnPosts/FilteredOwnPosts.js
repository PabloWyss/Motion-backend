import React, { useEffect } from "react";
import { GridDiv, MainContainer } from "./ownPosts.style";
import { useState } from "react";
import { v4 as uuid } from "uuid";
import PostRender from "../../../../../Social/PostRender/postRender";

const FilteredOwnPosts = (props) => {
  const [ownPosts, setOwnPosts] = useState([]);
  const Token = localStorage.getItem("auth-token");

  //set the user id whose posts have to be fetched
  //if one is passed as props use that
  //otherwise use the one of the current user 
  let userID = props.userID ? props.userID : JSON.parse(localStorage.getItem("user")).id;

  const GetMyPosts = async (offset) => {
    //GET: lists all the posts of all users in chronological order, with a pagination of 25 posts by default. To get the other posts, you should use limit and offset query params as following: /api/social/posts/?limit=<int>&offset=<int>

    let myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${Token}`);

    let requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    await fetch(
      //   "https://motion-team2.propulsion-learn.ch/backend/api/social/posts/me/?limit=25&offset=" +
      //"https://motion-team2.propulsion-learn.ch/backend/api/social/posts/user/2236/?limit=25&offset=" +
      "https://motion-team2.propulsion-learn.ch/backend/api/social/posts/user/" + userID + "/?limit=10&offset=" +
        offset,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => setOwnPosts(result.results))
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    GetMyPosts(0);
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
};

export default FilteredOwnPosts;
