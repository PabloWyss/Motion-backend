import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";


export const fetchFriendRequests = createAsyncThunk(
  'fetchFriendRequests',
  async () => {
      const Token = localStorage.getItem("auth-token")
      if (Token){
        let myHeaders = new Headers();
        let requestOptions = {
          method: 'GET',
          headers: myHeaders,
        };
        myHeaders.append("Authorization", `Bearer ${Token}`);
        return fetch("https://motion-team2.propulsion-learn.ch/backend/api/social/friends/requests/",requestOptions)
            .then((response) => response.json())
            .catch((error) => console.log(error))
      }
  }
)

export const friendRequestSlice = createSlice({
  name: "friendRequests",
  initialState: {
    requests: {},
  },
  reducers: {

  },
  extraReducers: (builder) => {
    builder.addCase(fetchFriendRequests.fulfilled, (state, action) => {
        state.requests = action.payload
    })
    builder.addCase(fetchFriendRequests.rejected, (state, action) => {
        console.log('rejected')
       
    })
    builder.addCase(fetchFriendRequests.pending, (state, action) => {
        console.log('fetching started')
    })
}

});
export const { setRequests,  } = friendRequestSlice.actions;
export default friendRequestSlice.reducer;
