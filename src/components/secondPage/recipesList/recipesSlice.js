import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import { useHttp } from '../../../hooks/http.hook';

const recipesAdapter = createEntityAdapter();
const initialState = recipesAdapter.getInitialState({
   recipesLoadingStatus: 'idle'
})


export const fetchRecipes = createAsyncThunk(
   'recipes/fetchRecipes',
   async () => {
      const { request } = useHttp();
      return await request("https://623440b96d5465eaa516b024.mockapi.io/recepts")
   }
);

 const recipesSlice = createSlice({
   name: 'recipes',
   initialState,
   reducers: {
      recipeCreated: (state, action) => { recipesAdapter.addOne(state, action.payload) },
      recipeDelete: (state, action) => { recipesAdapter.removeOne(state, action.payload)}
   },
   extraReducers: builder => {
      builder
      .addCase(fetchRecipes.pending, state => { state.recipesLoadingStatus = 'loading' })
      .addCase(fetchRecipes.fulfilled, (state, action) => {
         state.recipesLoadingStatus = 'idle';
         recipesAdapter.setAll(state, action.payload)
      })
      .addCase(fetchRecipes.rejected, state => { state.recipesLoadingStatus = 'error' })
   }

});

const { actions, reducer } = recipesSlice;
export default reducer;

export const {selectAll} = recipesAdapter.getSelectors(state => state.recipes)

export const { recipesFetching, recipesFetched, recipesFetchingError, recipeCreated, recipeDelete } = actions;