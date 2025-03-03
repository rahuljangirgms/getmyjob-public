import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    step:0,
    resumeId:0,

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
        }
    }
});

export const {setResumeId,setCurrentStep} = resumeSlice.actions;

export default resumeSlice.reducer;
