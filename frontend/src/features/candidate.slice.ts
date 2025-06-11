import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getDetailCandidate } from '~/services/candidate.axios'
import { ICandidate } from '~/types/candidate';

// Sau này sẽ tách ra
export const fetchCandidateById = createAsyncThunk('candidates/fetchCandidateById', async (id : String) =>{
    const response = await getDetailCandidate(id);
    return response.data || null;
})



// KHởi tạo dữ liệu
interface CandidateState{
   candidate : ICandidate | null
}

const initialState : CandidateState = {
    candidate : null
}


const candidateSlice = createSlice({
    name : 'candidates',
    initialState,
    reducers : {
        logOut(state){
            state.candidate = null
        }
    },
    extraReducers : (builder)=>{
        builder.addCase(fetchCandidateById.fulfilled,(state,action) =>{
            state.candidate = action.payload
        }),
        builder.addDefaultCase((state) =>{state.candidate = null})
    }
})
export const {logOut} = candidateSlice.actions
const CandidateReducer = candidateSlice.reducer
export default CandidateReducer
