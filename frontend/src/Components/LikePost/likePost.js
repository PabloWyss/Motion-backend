const LikePost = async (Token,postID) => {

    //lile Post if called once and dislike if called twice. 
    //parameters are the token and the post to like/unlike

        let myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${Token}` );
      
        let requestOptions = {
          method: 'POST',
          headers: myHeaders,
        };
      
      await fetch(`https://motion-team2.propulsion-learn.ch/backend/api/social/posts/toggle-like/${postID}/`, requestOptions)
        .then(response => response.json())
        .catch(error => console.log('error', error));
          

}


export default LikePost