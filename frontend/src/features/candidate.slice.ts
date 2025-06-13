import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getDetailCandidate } from '~/services/candidate.axios'
import { ICandidate } from '~/types/candidate';

// Sau này sẽ tách ra
export const fetchCandidateById = createAsyncThunk('candidates/fetchCandidateById', async (id : String) =>{
    const response = await getDetailCandidate(id);
    return response.data || null;
})



// KHởi tạo dữ liệu
interface UserCandidateState{
   candidate : ICandidate | null,
   isLogin : Boolean
}

const initialState : UserCandidateState = {
    candidate : null,
    isLogin : false
}


const userCandidateSlice = createSlice({
    name : 'candidates',
    initialState,
    reducers : {
        logOut(state){
            state.candidate = null
            state.isLogin = false
        }
    },
    extraReducers : (builder)=>{
        builder.addCase(fetchCandidateById.fulfilled,(state,action) =>{
            state.candidate = action.payload;
            state.isLogin = true
        }),
        builder.addDefaultCase((state) =>{state.candidate = null})
    }
})
export const {logOut} = userCandidateSlice.actions
const UserCandidateReducer = userCandidateSlice.reducer
export default UserCandidateReducer
