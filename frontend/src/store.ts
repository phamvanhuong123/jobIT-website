import { configureStore } from "@reduxjs/toolkit";

import { useDispatch, useSelector } from "react-redux";
import UserCandidateReducer from "./features/candidate.slice";
import jobsReducer from "./features/jobs.sclice";

export const store = configureStore({
    reducer : {
        userCandidate : UserCandidateReducer,
        jobsReducer : jobsReducer
    }
})



// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()