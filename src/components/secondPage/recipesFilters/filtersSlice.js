import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import { useHttp } from '../../../hooks/http.hook';

const filtersAdapter = createEntityAdapter();
const initialState = filtersAdapter.getInitialState({
   filterLoadingStatus: 'idle',
   activeFilter: 'all'
})

export const fetchFilters = createAsyncThunk(
   'filters/fetchFilters',
   async () => {
      const { request } = useHttp();
      return await request("https://623440b96d5465eaa516b024.mockapi.io/filtres")
   }
)

const filtersSlice = createSlice({
   name: 'filters',
   initialState,
   reducers: {
      activeFilterChanged: (state, action) => {
         state.activeFilter = action.payload;
      }
   },
   extraReducers: builder => {
      builder
         .addCase(fetchFilters.pending, state => { state.filterLoadingStatus = 'loading' })
         .addCase(fetchFilters.fulfilled, (state, action) => {
            state.filterLoadingStatus = 'idle';
            filtersAdapter.setAll(state, action.payload)
         })
         .addCase(fetchFilters.rejected, state => { state.filterLoadingStatus = 'error' })
   }
});

const { actions, reducer } = filtersSlice;

export default reducer;
export const {selectAll} = filtersAdapter.getSelectors(state => state.filters);
export const { filterFetching, filterFetched, filterFetchingError, activeFilterChanged } = actions;