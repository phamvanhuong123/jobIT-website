import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getDetailCandidate, updateCandidate } from '~/services/candidate.axios'
import { ICandidate } from '~/types/candidate';

// Sau này sẽ tách ra
export const fetchCandidateById = createAsyncThunk('candidates/fetchCandidateById', async (id : String) =>{
    const response = await getDetailCandidate(id);
    return response.data || null;
})

// Cật nhật thông tin người dùng
export const fetchUpdateCandidate = createAsyncThunk('candidates/fetchUpdateCandidate', async ({id, body} : {id : String,body : ICandidate}) =>{
    await updateCandidate(id,body);
    return {body};
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
        builder.addCase(fetchUpdateCandidate.fulfilled,(state,action)=>{
            console.log(state)
            state.candidate = {
                ...state.candidate,
                ...action.payload.body
            
            }
          
        })
       
    }
})
export const {logOut} = userCandidateSlice.actions
const UserCandidateReducer = userCandidateSlice.reducer
export default UserCandidateReducer
