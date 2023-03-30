import { v4 as uuid } from 'uuid'
import {
  LikedElementsDiv,
  LikedIndivualElementDiv,
  LikedIndivualElementP,
  MainContainer,
  ProfileAbout,
  ProfileContacts,
  ProfileDataLeft,
  ProfileDataRight,
  ProfileEmail,
  ProfilePhone,
} from "./profileData.style";

function ProfileData(props) {
  return (
    <MainContainer>
      <ProfileDataLeft>
        <ProfileAbout>
          <p>About</p>
          <p>{props.userdata.about_me}</p>
        </ProfileAbout>
        <ProfileContacts>
          <ProfileEmail>
            <p>Email</p>
            <p>{props.userdata.email}</p>
          </ProfileEmail>
          <ProfilePhone>
            <p>Phone</p>
            <p>{props.userdata.phone_number}</p>
          </ProfilePhone>
        </ProfileContacts>
      </ProfileDataLeft>
      <ProfileDataRight>
        <p>Things I like</p>
        <LikedElementsDiv>
          {props.userdata.things_user_likes?.map((element) => {
            return (
              <LikedIndivualElementDiv key={uuid()}>
                <LikedIndivualElementP>{element}</LikedIndivualElementP>
              </LikedIndivualElementDiv>
            );
          })}
        </LikedElementsDiv>
      </ProfileDataRight>
    </MainContainer>
  );
}

export default ProfileData;
