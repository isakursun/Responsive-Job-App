import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mainJobs: [],
  jobs: [],
  initialized: false, // verilerin yüklenme durumu için
  isError: false,
};

const jobSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    setJob: (state, action) => {
      state.jobs = action.payload;
      state.mainJobs = action.payload;
      state.initialized = true;
      state.isError = false;
    },
    setError: (state) => {
      state.isError = true;
      state.initialized = true;
    },
    filterBySearch: (state, action) => {
      //aranan kelimeyi küçük harfe çevirme
      const query = action.payload.toLowerCase();
      // aranan kelimeye göre filtreleme
      const filter = state.mainJobs.filter((job) =>
        job.company.toLowerCase().includes(query)
      );
      //state i güncelleme
      state.jobs = filter;
    },
    filterByStatus: (state, action) => {
      const filtred = state.mainJobs.filter(
        (job) => job.status === action.payload
      );
      state.jobs = filtred;
    },
    filterByType: (state, action) => {
      const filtred = state.mainJobs.filter(
        (job) => job.type === action.payload
      );
      state.jobs = filtred;
    },
    sortJobs: (state, action) => {
      switch (action.payload) {
        case "a-z":
          state.jobs.sort((a, b) => a.company.localeCompare(b.company));
          break;
        case "z-a":
          state.jobs.sort((a, b) => b.company.localeCompare(a.company));
          break;
        case "En Yeni":
          state.jobs.sort((a, b) => new Date(b.date) - new Date(a.date));
          break;
        case "En Eski":
          state.jobs.sort((a, b) => new Date(a.date) - new Date(b.date));
          break;
      }
    },
    clearFilters: (state) => {
      state.jobs = state.mainJobs;
    },
  },
});

// aksiyonları export etme
export const {
  setJob,
  setError,
  filterBySearch,
  filterByStatus,
  filterByType,
  sortJobs,
  clearFilters,
} = jobSlice.actions;
// reducer ı export etme
export default jobSlice.reducer;
