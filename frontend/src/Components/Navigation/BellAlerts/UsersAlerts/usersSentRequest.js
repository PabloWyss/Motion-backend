import denyButton from "../../../../assets/images/denyInv.png"
import acceptButton from "../../../../assets/images/acceptInv.png"
import avatarImage from "../../../../assets/svgs/avatar.svg"
import { BellInnerLi,AcceptDenyImg, RequestDiv,ImageNameDiv,BellNameP, FirstNameLastNameDiv,AcceptDenyDiv    } from "../../navigation.style"
import { useNavigate } from "react-router-dom"
import { useState } from "react"


const UsersSentRequest = (prop) => {

    const Token = localStorage.getItem("auth-token")
    const navigate = useNavigate()
    const [isClicked, setIsClicked] = useState(true)
    const [message, setMessage] =useState("")

    const [userAcceptedOrDeny, serUserAcceptedOrDeny] = useState(false)

    const FriendsRequestsStatus = async(type,friend_request_id) => {

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


      const HandleAcceptButton = () => {
        FriendsRequestsStatus("PATCH",prop.requestId.toString())
        setIsClicked(false)
        serUserAcceptedOrDeny(!userAcceptedOrDeny)
        setMessage("Friend Request accepted")
      } 

      const HandleDeleteButton = () => {
        FriendsRequestsStatus("DELETE",prop.requestId.toString())
        setIsClicked(false)
        setMessage("Friend Request rejected")
      }

      const handleClickUser = () => {
        navigate(`/profile/${prop.requestId}`)
    }

    console.log(prop)
    return (
        <BellInnerLi>
          {isClicked?
          <RequestDiv >
              <ImageNameDiv >
                  {prop.requester.avatar?
                  <AcceptDenyImg alt="avatar" src={prop.requester.avatar} onClick={handleClickUser}/>:
                  <AcceptDenyImg alt="avatar" src={avatarImage} onClick={handleClickUser}/>}
                  <FirstNameLastNameDiv >
                      <BellNameP >
                          {prop.requester.first_name} {prop.requester.last_name}
                      </BellNameP >
                      <BellNameP >
                          {prop.requester.location}
                      </BellNameP >

                  </FirstNameLastNameDiv >
              </ImageNameDiv >
              <AcceptDenyDiv  >
                  <AcceptDenyImg alt="acceptButton" src={acceptButton} onClick={HandleAcceptButton}/>
                  <AcceptDenyImg alt="denybutton" src={denyButton} onClick={HandleDeleteButton}/>
              </AcceptDenyDiv  >
          </RequestDiv >
          :
          <BellNameP>{message}</BellNameP>
          }
        </BellInnerLi>
    )
}

export default UsersSentRequest