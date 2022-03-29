import { configureStore } from '@reduxjs/toolkit';
import filters from '../components/secondPage/recipesFilters/filtersSlice';
import recipes from '../components/secondPage/recipesList/recipesSlice';


const stringMiddleware = () => (next) => (action) => {
   if (typeof action === 'string') {
         return next({
            type: action
         })
      }
      return next(action)
};

const store = configureStore({
   reducer: { recipes, filters },
   middleware:getDefaultMiddleware => getDefaultMiddleware().concat(stringMiddleware),
   devTools: process.env.NODE_ENV !== 'production',
   
})

export default store;