import { async } from "q";



const Token = localStorage.getItem("auth-token")


export  const  GetAll_Post = async (offset) => {

    //GET: lists all the posts of all users in chronological order, with a pagination of 25 posts by default. To get the other posts, you should use limit and offset query params as following: /api/social/posts/?limit=<int>&offset=<int>
     
    let myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${Token}` );

    let requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };
  
  await fetch("https://motion-team2.propulsion-learn.ch/backend/api/social/posts/?limit=25&offset="+offset, requestOptions)
    .then(response => response.json())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
  
    
  
  }
  
  export const GetPost_UserId=async(UserId,offset) =>
  {
    //GET: lists all the posts of a specific user in chronological order
    let myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${Token}` );

    let requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    
   await fetch("https://motion-team2.propulsion-learn.ch/backend/api/social/posts/user/"+UserId+"/?limit=25&offset="+offset, requestOptions)
      .then(response => response.json())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }
  
  
  
  
  export  const  Post =async () => {
  
    let myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${Token}` );
     myHeaders.append("Content-Type", "application/json");
  
  let raw = JSON.stringify({
    "user": {
      "email": "user@example.com",
      "first_name": "string",
      "last_name": "string",
      "username": "string"
    },
    "content": "test22"
  });
  
  let requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };
  
  await fetch("https://motion-team2.propulsion-learn.ch/backend/api/social/posts/", requestOptions)
    .then(response => response.json())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
  
  
  
  }
  
  
  
  
  export const GET_post_id = async(type,post_id) => {
  
    //type = GET,PATCH or DELETE
  //GET: get a specific post by ID and display all the information about that post
  // PATCH: update a specific post (only allow owner of post or admin)
  // DELETE: delete a post by ID (only allow owner of post or admin)
  
    let myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${Token}` );

  let requestOptions = {
  method: type,
  headers: myHeaders,
  redirect: 'follow'
  };
  
  await fetch("https://motion-team2.propulsion-learn.ch/backend/api/social/posts/"+post_id, requestOptions)
  .then(response => response.json())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
  
  
  }
  
  
  
  export const GET_post_search =async (search) => {
    let myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${Token}` );
  let requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };
  
  await fetch("https://motion-team2.propulsion-learn.ch/backend/api/social/posts/?search="+search, requestOptions)
    .then(response => response.json())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
  }
  
  
  
  export const Usersfollow = async(userid) => {
  
    let myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${Token}` );

    let raw = "";
    
    let requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
   await fetch("https://motion-team2.propulsion-learn.ch/backend/api/social/followers/toggle-follow/"+userid+"/", requestOptions)
      .then(response => response.json())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  
  }
  
  
  export const GetUsersFollowing = async() => {
    let myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${Token}` );
    let requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    
   await fetch("https://motion-team2.propulsion-learn.ch/backend/api/social/followers/following/", requestOptions)
      .then(response => response.json())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  
  
  
  }
  
  
  export const GetUsersFollowers = async() => {

    let myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${Token}` );

    let requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    
   await fetch("https://motion-team2.propulsion-learn.ch/backend/api/social/followers/followers/", requestOptions)
      .then(response => response.json())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  
  
  }
  
  
  export const SendFriendRequest= async (userid) => {
  
    let myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${Token}` );

    let requestOptions = {
      method: 'POST',
      headers: myHeaders,
      redirect: 'follow'
    };
    
   await fetch("https://motion-team2.propulsion-learn.ch/backend/api/social/friends/request/"+userid+"/", requestOptions)
      .then(response => response.json())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  
  }

  
export const FriendsRequestsStatus = async(type,friend_request_id) => {

    //type = GET,PATCH or DELETE
    //GET: Get details of a friend request
    //PATCH: Accept or Reject an open friend request
    //DELETE: Delete a friend request
  
    let myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${Token}` );
    myHeaders.append("Content-Type", "application/json");
  
    let raw;
    if(type==="PATCH")
    {
      raw= JSON.stringify({
        "status": "A"  //A--> Accept - R--> Reject and P--> Pending
      });
    }
   
    
    let requestOptions = {
      method: type,
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
   await fetch("https://motion-team2.propulsion-learn.ch/backend/api/social/friends/requests/"+friend_request_id, requestOptions)
      .then(response => response.json())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  
  
  }
  export const GetAllAcceptedFriends = async () => {
  //api/social/friends/ GET: List all accepted friends
  
  let myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${Token}` );

  let requestOptions = {
    method: 'POST',
    headers: myHeaders,
    redirect: 'follow'
  };
  
 await fetch("https://motion-team2.propulsion-learn.ch/backend/api/social/friends", requestOptions)
    .then(response => response.json())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
  
  
  
  }
  
  
  export const GetAllUsers=async(offset) =>
  {
  
    //GET: Get all the users
  
    let myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${Token}` );
    let requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    
   await fetch("https://motion-team2.propulsion-learn.ch/backend/api/users/?limit=25&offset="+offset, requestOptions)
      .then(response => response.json())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }
  
  
  
  export const GETSearchUsers_Text = async(search,offset) => {
  
    //GET: Search users
  
    let myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${Token}` );
    let requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    
   await fetch("https://motion-team2.propulsion-learn.ch/backend/api/users/?limit=25&offset="+offset+"&search="+search, requestOptions)
      .then(response => response.json())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
    }
  
    export const GETSearchUsers_userid = async(userid) => {
      //GET: Get specific user profile
  
      let myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${Token}` );
      let requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };
      
     await fetch("https://motion-team2.propulsion-learn.ch/backend/api/users/"+userid, requestOptions)
        .then(response => response.json())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
      }
    


     
      export const GetUsers_me = async () => { 
   
        //let myHeaders = new Headers();
  //myHeaders.append("Authorization", "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjc3NzU3NjY1LCJqdGkiOiI4NDRkNGIxN2M5ZDM0NGUxYTNkYmI0ZDg1NTgxMjhiOSIsInVzZXJfaWQiOjIyMzV9.uX1RdxUtSQjUjNqFVdv6JItzpMTzhgQROZWbyRP8RY8");
  
    let myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${Token}` );
  
    let requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
  
  await fetch("https://motion-team2.propulsion-learn.ch/backend/api/users/me/", requestOptions)
    .then(response => response.json())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
      }



      export const GetLikedPosts = async () => { 
   
       
    let myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${Token}` );
  
    let requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
  
  await fetch("https://motion-team2.propulsion-learn.ch/backend/api/social/posts/likes/", requestOptions)
    .then(response => response.json())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
      }


      export const GetFriendsPosts = async () => { 
   
    let myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${Token}` );
  
    let requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
  
  await fetch("https://motion-team2.propulsion-learn.ch/backend/api/social/posts/friends/", requestOptions)
    .then(response => response.json())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
      }


      export const GetFollowersPosts = async () => { 
   
  
    let myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${Token}` );
  
    let requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
  
  await fetch("https://motion-team2.propulsion-learn.ch/backend/api/social/posts/following/", requestOptions)
    .then(response => response.json())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
      }