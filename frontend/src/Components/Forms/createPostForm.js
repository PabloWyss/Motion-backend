import React from "react";
import { useState } from "react";
import Overlay from "../Overlay/overlay";
import { OverlayButton, SubmitButtonIcon } from "./createPostForm.style";
import CreatePost from "../Social/CreateOwnPost/createPost";
import sendIcon from "../../assets/svgs/send_button.svg";


const CreatePostForm = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOverlay = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="EditForm">
      <OverlayButton onClick={toggleOverlay}>
        <SubmitButtonIcon src={sendIcon} alt={sendIcon} />
      </OverlayButton>

      <Overlay isOpen={isOpen} onClose={toggleOverlay}>
        <CreatePost input={ props.input} avatar={props.avatar} />
      </Overlay>
    </div>
  );
};

export default CreatePostForm;
