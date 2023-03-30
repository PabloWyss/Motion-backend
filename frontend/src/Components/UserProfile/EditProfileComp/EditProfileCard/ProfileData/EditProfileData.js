import { useState } from 'react';
import { v4 as uuid } from 'uuid'
import {
  FormContainer,
  InputContainer,
  InputField,
  LikedElementsDiv,
  LikedIndivualElementDiv,
  LikedIndivualElementP,
  MainContainer,
  ProfileDataRight,
} from "./profileData.style";

function EditProfileData(props) {
  const [userEmail, setEmail] = useState("");
  const [userPassword, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

//store typed email
const handleEmailInput = (e) => {
  setEmail(e.target.value);
};

//store typed password
const handlePasswordInput = (e) => {
  setPassword(e.target.value);
};

//store typed username
const handleUserNameInput = (e) => {
  setUserName(e.target.value);
};

//store typed firstname
const handleFirstNameInput = (e) => {
  setFirstName(e.target.value);
};

//store typed lastname
const handleLastNameInput = (e) => {
  setLastName(e.target.value);
};


  return (
    <MainContainer>
      <FormContainer>
          <InputContainer>
            <InputField
              placeholder="Email"
              type="email"
              value={userEmail}
              onChange={handleEmailInput}
            />
            <InputField placeholder="Username" value={userName} onChange={handleUserNameInput} />
            <InputField
              placeholder="First Name"
              value={firstName}
              onChange={handleFirstNameInput}
            />
            <InputField placeholder="Last Name" value={lastName} onChange={handleLastNameInput} />
            <InputField
              placeholder="Password"
              type="password"
              value={userPassword}
              onChange={handlePasswordInput}
            />
            <InputField
              placeholder="About"
              // value={}
              // onChange={handlePasswordInput}
            />
            
          </InputContainer>

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
        </FormContainer>

      
    </MainContainer>
  );
}

export default EditProfileData;
