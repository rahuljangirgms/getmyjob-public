import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    step:0,
    resumeId:0,
    isTeamplateSelected: false,
    selectedResumeTeamplate:''
};


const resumeSlice = createSlice({
    name:"resumes",
    initialState,
    reducers:{
        setResumeId:(state,action) =>{
            state.resumeId = action.payload;
        },
        setCurrentStep:(state,action)=>{
            state.step = action.payload;
        },
        setTeamplateSelect:(state,action) =>{
            state.isTeamplateSelected = action.payload;
        },
        setSelectedResumeTeamplate:(state,action) =>{
            state.selectedResumeTeamplate = action.payload;
        }
    }
});

export const {setResumeId,setCurrentStep,setTeamplateSelect,selectedResumeTeamplate} = resumeSlice.actions;

export default resumeSlice.reducer;
