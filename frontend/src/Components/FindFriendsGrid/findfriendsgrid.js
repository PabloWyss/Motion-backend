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
        const scrolheigjt = event.target.scrollHeight
        console.log(scrolheigjt)
        
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

      let limit = "9"
      let offset = randomNumber.toString()

      
      let userList = []

      await fetch(`https://motion-team2.propulsion-learn.ch/backend/api/users/?limit=${limit}&offset=${offset}`, requestOptions)
        .then(response => response.json())
        .then(result => {
          userList = result.results})
        .catch(error => console.log('error', error));

      setListOfUsers2(userList)
    }

    useEffect(()=>{
      getUsers()
    },[])

    return (
        <FindFriednsPageDiv >
            <GridDiv >
                {listOfUsers2.map((user)=>{
                    return <UserFindFriendInfo key={uuid()} userInfo={user}/>
                })}
            </GridDiv >
        </FindFriednsPageDiv >
    )
}

export default FindFirendsGrid
