import { GridDiv,FindFriednsPageDiv } from "./findfriendsgrid.style"
import UserFindFriendInfo from "./UserFindFriendInfo/userFindFriendIndo"
import { v4 as uuid } from 'uuid'
import { useState, useEffect} from "react"



const FindFirendsGrid = () => {

    const [listOfUsers2,setListOfUsers2] = useState([])
    const randomNumber = (Math.round(Math.random()*1500))

    const [scrollTop, setScrollTop] = useState(0);

    useEffect(() => {
      const handleScroll = (event) => {
        const {scrollHeight, scrollTop, clientHeight} = event.target;
        const scrollheight = event.target.scrollHeight

        if (Math.abs(scrollHeight - clientHeight - scrollTop) < 1) {
          console.log('scrolled');
        }
      };

      window.addEventListener('scroll', handleScroll);

      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);
    
    const getUsers = async () => {
      const Token = localStorage.getItem("auth-token")
    
      let myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${Token}`);
      
      let requestOptions = {
        method: 'GET',
        headers: myHeaders,
      };

      let limit = "12"
      let offset = randomNumber.toString()


      await fetch(`https://motion-team2.propulsion-learn.ch/backend/api/users`, requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log(result)
            setListOfUsers2(result)
        })
        .catch(error => console.log('error', error));
      }

    useEffect(()=>{
      getUsers()
    },[])

    return (
        <FindFriednsPageDiv >
            <GridDiv >
                {listOfUsers2?.map((user)=>{
                    return <UserFindFriendInfo key={uuid()} userInfo={user}/>
                })}
            </GridDiv >
        </FindFriednsPageDiv >
    )
}

export default FindFirendsGrid
