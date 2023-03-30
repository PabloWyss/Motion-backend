//import { useSelector } from "react-redux";
import {
  AddFriendlocationP,
  AddFriendNameP,
  AvatarImg,
  MainContainer,
} from "./profileCardLeft.style";
import EditProfileButton from "./ProfileCardButtons/EditProfileButton/EditProfileButton";
import FollowAddButtons from './ProfileCardButtons/FollowAddButtons/FollowAddButtons'
import avatarImage from "../../../../../assets/svgs/avatar.svg";

function ProfileCardLeft(props) {
  const currentUser = JSON.parse(localStorage.getItem("user"));
  //retrieving of current user from redux doesn't work
  //const currentUser = useSelector((store) => store.currentuser);

  //check if user passed is the same as current user
  //and render the corresponding component
  const displayButtons = () => {
    return props.userdata.id === currentUser.id ? (
      <EditProfileButton />
    ) : (
      <FollowAddButtons userdata={props.userdata}/>
    );
  };
  console.log(props.userdata)
  return (
    <MainContainer>
      {props.userdata.avatar ? (
        <AvatarImg alt="avatar" src={props.userdata.avatar} />
      ) : (
        <AvatarImg alt="avatar" src={avatarImage} />
      )}
      <AddFriendNameP>{`${props.userdata.first_name} ${props.userdata.last_name}`}</AddFriendNameP>
      <AddFriendlocationP>{props.userdata.location}</AddFriendlocationP>
      {displayButtons()}
    </MainContainer>
  );
}

export default ProfileCardLeft;
