import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    selectedTopic:'',
    isInstrctionsRead: false,
}

const quizSlice = createSlice({
    name:'quiz',
    initialState: initialState,
    reducers:{
        setTopic: (state,action)=>{
            state.selectedTopic = action.payload;
        },
        setIsInstrctRead: (state, action)=>{
            state.isInstrctionsRead = action.payload;
        }
    }
});


export const {setTopic, setIsInstrctRead} = quizSlice.actions;

export default quizSlice.reducer;