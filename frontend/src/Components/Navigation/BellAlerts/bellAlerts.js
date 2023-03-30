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
    
    if(request.requests.results){
        const listOfRequests = request.requests.results
        const requestKeys = Object.keys(listOfRequests)
        requestKeys.forEach((idElement)=>{
        if(listOfRequests[idElement].requester.id == myID && listOfRequests[idElement].status =="P" ) {
            requestedByUser.push(listOfRequests[idElement])
        } else if (listOfRequests[idElement].requester.id != myID && listOfRequests[idElement].status =="P" ) {
            requestedToUser.push(listOfRequests[idElement])
        } 
        })
    }


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
                        <UsersSentRequest key={elementId.id} requester={elementId.requester} requestId = {elementId.id}/>
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
                        <UsersReceivedRequest key={elementId.id} receiver={elementId.receiver} requestId = {elementId.id}/>
                    )
                })}
                </NavigationBellinnerUL>
            </NavigationBellUl>
        </NavigationBellInnerdiv>
        
    )
}

export default BellAlerts