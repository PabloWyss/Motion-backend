import avatarImage from "../../../../assets/svgs/avatar.svg"
import clock from "../../../../assets/svgs/Groupclock.svg"
import { AcceptDenyImg, RequestDiv,ImageNameDiv,BellNameP, FirstNameLastNameDiv,AcceptDenyDiv,BellInnerLi } from "../../navigation.style"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

const UsersReceivedRequest = (prop) => {

    const navigate = useNavigate()
    const handleClickUser = () => {
        navigate(`/profile/${prop.receiver.id}`)
    }
    console.log(prop)
    return (
        <BellInnerLi>
            <RequestDiv >
                <ImageNameDiv >
                    {prop.receiver.avatar?
                    <AcceptDenyImg alt="avatar" src={prop.receiver.avatar} onClick={handleClickUser}/>:
                    <AcceptDenyImg alt="avatar" src={avatarImage} onClick={handleClickUser}/>}
                    <FirstNameLastNameDiv >
                        <BellNameP >
                            {prop.receiver.first_name} {prop.receiver.last_name}
                        </BellNameP >
                        <BellNameP >
                            {prop.receiver.location}
                        </BellNameP >
                    </FirstNameLastNameDiv >
                </ImageNameDiv >
                <AcceptDenyDiv  >
                    <AcceptDenyImg alt="clock" src={clock}/>
                </AcceptDenyDiv  >
            </RequestDiv >
        </BellInnerLi>
    )
}

export default UsersReceivedRequest