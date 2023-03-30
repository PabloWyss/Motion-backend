import { NavigationBellUl,
NavigationBellLi,
NavigationBellInnerdiv,
NavigationBellinnerUL,
TitleSentAndReceived
 } from "../navigation.style"
import { useSelector } from "react-redux"
import UsersSentRequest from "./UsersAlerts/usersSentRequest"
import UsersReceivedRequest from "./UsersAlerts/userReceibvedRequest"



const BellAlerts = () => {

    const currentUser = JSON.parse(localStorage.getItem("user"));

    const myID = currentUser.id
    const requestedToUser = []
    const requestedByUser = []

    const request = useSelector(store => store.friendRequests)
    if(request.requests){
        const listOfRequests = request.requests
        const requestKeys = Object.keys(listOfRequests)
        requestKeys.forEach((idElement)=>{
        if(listOfRequests[idElement].id == myID) {
            requestedByUser.push(listOfRequests[idElement])
        } else if (listOfRequests[idElement].logged_in_user_sent_fr.includes(myID)) {
            requestedToUser.push(listOfRequests[idElement].id)
        } 
        })
    }
    console.log(requestedToUser)
    console.log(requestedByUser)
    return (
        <NavigationBellInnerdiv>
            <NavigationBellUl>
                <NavigationBellLi>
                <TitleSentAndReceived>
                    Received Requests
                </TitleSentAndReceived>
                </NavigationBellLi>
                <NavigationBellinnerUL>
                {requestedToUser?.map((elementId)=>{
                    return (
                        <UsersSentRequest key={elementId.id} requester={elementId} requestId = {elementId.id}/>
                    )
                })}
                </NavigationBellinnerUL>
                <NavigationBellLi>
                <TitleSentAndReceived>
                    Sent Requests
                </TitleSentAndReceived>
                </NavigationBellLi>
                <NavigationBellinnerUL>
                {requestedByUser?.map((elementId)=>{
                    return (
                        <UsersReceivedRequest key={elementId.id} receiver={elementId} requestId = {elementId.id}/>
                    )
                })}
                </NavigationBellinnerUL>
            </NavigationBellUl>
        </NavigationBellInnerdiv>
        
    )
}

export default BellAlerts