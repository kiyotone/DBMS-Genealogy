import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  familyData: [], // Family information (could be an object or null)
  personData: [], // Person information (could be an object or null)
};

const visualizerSlice = createSlice({
  name: "visualizer",
  initialState,
  reducers: {
    setFamilyData: (state, action) => {
      console.log("Family Data:", action.payload);
      state.familyData = action.payload;
    },
    setPersonData: (state, action) => {
      state.personData = action.payload;
    },
  },
});

// Exporting actions to use in components
export const { setFamilyData, setPersonData } = visualizerSlice.actions;

export default visualizerSlice.reducer;