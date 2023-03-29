import { AvaterImg,AddFriendUserDiv,AddFriendNameP,AddFriendlocationP,
        AddFriendsDivButton,AddFriendsInerDivButton,AddFollowAddFriendButton,FollowInerDivButton,
        AboutMeInfoP,LikedElementsDiv,LikedIndivualElementDiv,LikedIndivualElementP,TickerImage,DivImageName,
        ClockImage} from "../findfriendsgrid.style"
import { v4 as uuid } from 'uuid'
import { useState } from "react"
import tickerImage from "../../../assets/svgs/Ticker.svg"
import avatarImage from "../../../assets/svgs/avatar.svg"
import { useNavigate } from "react-router-dom"
import clock from "../../../assets/svgs/Groupclock.svg"

const UserFindFriendInfo = (prop) => {
    
    const [FolowUser,setFollowUser] = useState(prop.userInfo.logged_in_user_is_following)
    const [addFriend,setAddFriend] = useState(prop.userInfo.logged_in_user_sent_fr)
    const addFriendStatus = prop.userInfo.logged_in_user_is_friends
    const navigate = useNavigate()

    const Token = localStorage.getItem("auth-token")

    const Usersfollow = (userid) => {
      
        let myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${Token}`);
        
        let raw = "";
        
        let requestOptions = {
          method: 'POST',
          headers: myHeaders,
          redirect: 'follow'
        };
        fetch("https://motion-team2.propulsion-learn.ch/backend/api/social/followers/toggle-follow/"+userid+"/", requestOptions)
          .then(response => response.text())
          .catch(error => console.log('error', error));
      
    }

    const SendFriendRequest= (userid) => {
  
        let myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${Token}` );
        
        let requestOptions = {
          method: 'POST',
          headers: myHeaders,
          redirect: 'follow'
        };
        
        fetch("https://motion-team2.propulsion-learn.ch/backend/api/social/friends/request/"+userid+"/", requestOptions)
          .then(response => response.json())
          .catch(error => console.log('error', error));
      
      }

    

    const hanldeFollowButton = () => {
        setFollowUser(!FolowUser)
        Usersfollow(prop.userInfo.id)
    }

    const hanldeAddFriendButton = () => {
        if (addFriend == false){
            setAddFriend(!addFriend)
            SendFriendRequest(prop.userInfo.id)
        }
    }

    const handleClickUser = () => {
        navigate(`/profile/${prop.userInfo.id}`)
    }

    return(
        <AddFriendUserDiv >
            <DivImageName onClick={handleClickUser}>
                {prop.userInfo.avatar? 
                <AvaterImg alt="avatar" src={prop.userInfo.avatar}/> : 
                <AvaterImg alt="avatar" src={avatarImage}/>
                }
                <AddFriendNameP>{`${prop.userInfo.first_name} ${prop.userInfo.last_name}`}</AddFriendNameP >
                <AddFriendlocationP>{prop.userInfo.location}</AddFriendlocationP>
            </DivImageName>
            <AddFriendsDivButton>
                <FollowInerDivButton follow={FolowUser} onClick={hanldeFollowButton}>
                    <AddFollowAddFriendButton>{FolowUser? "Followed" : "Follow"}</AddFollowAddFriendButton>
                </FollowInerDivButton>
                <AddFriendsInerDivButton onClick={hanldeAddFriendButton}>
                    {addFriend ?
                    <ClockImage src={clock}/> : addFriendStatus ?
                    <TickerImage src={tickerImage}/> :
                    ""}
                    <AddFollowAddFriendButton >Add Friend</AddFollowAddFriendButton>
                </AddFriendsInerDivButton>
            </AddFriendsDivButton>
            <AboutMeInfoP>
                {prop.userInfo.about_me}
            </AboutMeInfoP>
            <LikedElementsDiv>
                {prop.userInfo.things_user_likes.map((element)=>{
                    return (
                        <LikedIndivualElementDiv key={uuid()}>
                            <LikedIndivualElementP>{element}</LikedIndivualElementP>
                        </LikedIndivualElementDiv>
                    )
                })}
            </LikedElementsDiv>
        </AddFriendUserDiv>
        
    )
}

export default UserFindFriendInfo






// {
//     "id": 5,
//     "email": "guillaumer@propulsionacademy.com",
//     "first_name": "Billy",
//     "last_name": "Bob",
//     "username": "Billy",
//     "job": "Coffee drinker",
//     "avatar": "https://motion-team2.propulsion-learn.ch/media-files/schrimp_man_TKoKgA3.jpg",
//     "banner": null,
//     "location": "Zürich",
//     "phone_number": "",
//     "about_me": "I like to drink coffee while playing guitar and shooting some free throws",
//     "things_user_likes": [
//       "BBQ",
//       "Basket",
//       "Guitar"
//     ],
//     "logged_in_user_is_following": 

//     "logged_in_user_is_friends": false,
//     "logged_in_user_is_rejected": false,
//     "logged_in_user_received_fr": false,
//     "logged_in_user_sent_fr": false,
//     "amount_of_posts": 0,
//     "amount_of_likes": 0,
//     "amount_of_friends": 2,
//     "amount_of_followers": 14,
//     "amount_following": 1
//   },


