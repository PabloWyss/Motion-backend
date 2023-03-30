import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import callAPI from "../../../axios/auth";
import LetterIcon from "../../../assets/svgs/letter.svg";
import {
  AuthForm,
  FormIcon,
  FormTitle,
  HeaderButton,
  InputContainer,
  InputField,
  ProgressCirclesContainer,
  RightSide,
  SignInHeader,
  SignUpButton,
  TextBesidesButton,ErrorMessage
} from "./signUpRight.style";
import { setSignUpEmail } from "../../../redux/slices/signUpEmailAddress";

function SignUpRight() {
  const [userEmail, setEmail] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [error, setError] = useState('');
  //store typed email
  const handleEmailInput = (e) => {
    setEmail(e.target.value);
  };

  //sign up - create a new user
  const handleSignUpClick = async (e) => {
    e.preventDefault();

    if (!userEmail) 
    {
      setError('Please enter email');
      return;
    }
    else
    {
     let emessage="";
     dispatch(setSignUpEmail(userEmail));

       //store user email in redux for congratulations page
   
    //redirect to activation page
  
    //registration request to API
    await callAPI.post(
      "auth/registration/",
      JSON.stringify({
        email: userEmail,
      })
    ).catch(error => 
     
      emessage=error.message,
      
    
      );;
      
  
    //console.log(emessage);
   
      if (!emessage) 
      {
        navigate("/congratulations");
       
       
      
        return;
      }
      else
      {
       
          alert('Please check your email')
        
      }
    }



  
  };

  //navigate to sign in page
  const handleSignInClick = () => {
    navigate("/signin");
  };

  return (
    <RightSide>
      <SignInHeader>
        <TextBesidesButton>Already have an account?</TextBesidesButton>
        <HeaderButton onClick={handleSignInClick}>SIGN IN</HeaderButton>
      </SignInHeader>
      <AuthForm>
      {error && <ErrorMessage>{error}</ErrorMessage>}
        <FormTitle>Sign Up</FormTitle>
        <InputContainer>
          <FormIcon src={LetterIcon}></FormIcon>
          <InputField
            placeholder="Email"
            type="email"
            value={userEmail}
            onChange={handleEmailInput}
          />
        </InputContainer>
        <SignUpButton onClick={handleSignUpClick}>SIGN UP</SignUpButton>
        <ProgressCirclesContainer>
          <svg height="20" width="20">
            <circle cx="8" cy="8" r="0.3rem" fill="black" stroke="black" />
          </svg>
          <svg height="20" width="20">
            <circle
              cx="8"
              cy="8"
              r="0.3rem"
              fill="white"
              stroke="rgba(0, 0, 0, 0.2)"
              strokeWidth="2"
            />
          </svg>
          <svg height="20" width="20">
            <circle
              cx="8"
              cy="8"
              r="0.3rem"
              fill="white"
              stroke="rgba(0, 0, 0, 0.2)"
              strokeWidth="2"
            />
          </svg>
        </ProgressCirclesContainer>
      </AuthForm>
    </RightSide>
  );
}

export default SignUpRight;
