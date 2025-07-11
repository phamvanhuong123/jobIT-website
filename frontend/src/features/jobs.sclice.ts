import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createJobById, deleteJob, getAllJobByCompany, updateJobById } from "~/services/job.axios";

export const fetchGetAllJobsByCompany = createAsyncThunk(
  "jobs/getAllJobCompany",
  async (id: String) => {
    const response = await getAllJobByCompany(id);
    return response.data || null;
  }
);
export const fetchUpdateJob = createAsyncThunk(
  "jobs/updateJob",
  async ({ id, body }: { id: string; body: IJob }) => {
    await updateJobById(id, body);
    return { id, body };
  }
);

export const fetchCreateJob = createAsyncThunk(
  "jobs/createJob",
  async ({ id, body }: { id: string; body: IJob }) => {
    const res = await createJobById(id, body);
    return res.data;
  }
);
export const fetchdeletedJob = createAsyncThunk(
  "jobs/deletedJob",
  async ( id : string) => {
     await deleteJob(id);
    return {id};
  }
);
// KHởi tạo dự liệu
interface JobsState {
  jobs: IJob[] | null;
}
const initialState: JobsState = {
  jobs: [],
};

const jobsSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchGetAllJobsByCompany.fulfilled, (state, action) => {
      state.jobs = action.payload;
    }),
      builder.addCase(fetchUpdateJob.fulfilled, (state, action) => {
        if (state.jobs) {
          const index = state.jobs.findIndex(
            (job) => job._id === action.payload.id
          );
          if (index !== -1) {
            state.jobs[index] = {
              ...state.jobs[index],
              ...action.payload.body,
            };
          }
        }
      });
    builder.addCase(fetchCreateJob.fulfilled, (state, action) => {});
    builder.addCase(fetchdeletedJob.fulfilled, (state, action) => {
      if (state.jobs){
        state.jobs = state.jobs?.filter(item => item._id !== action.payload.id)
        console.log(state.jobs)
      }

    });
  
  },
});

const jobsReducer = jobsSlice.reducer;
export default jobsReducer;
