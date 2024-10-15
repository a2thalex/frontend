const initialState = {
    // Define initial state for artist data
    artist: null,
    tracks: [],
    loading: false,
    error: null,
  };
  
  const artistReducer = (state = initialState, action) => {
    switch (action.type) {
      // Handle different action types related to artist data
      default:
        return state;
    }
  };
  
  export default artistReducer;
  