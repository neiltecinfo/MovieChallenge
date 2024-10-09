import {createSlice, nanoid} from '@reduxjs/toolkit';

export const TaskSlice = createSlice({
  name: 'tasks',
  //   initialState: [],
  initialState: {
    tasks: [],
    favoriteMovies: [], // To store favorite movies
    watchlistMovies: [],
  },
  reducers: {
    addTask: (state, action) => {
      const newTask = {
        id: action.payload.task,
        name: action.payload.task,
      };
      state.tasks.push(newTask);
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter(item => item.id !== action.payload.id);
    },
    addFavoriteMovies: (state, action) => {
      // Check if movie is already in favorites, if not add it
      const newMovies = action.payload.filter(
        movie => !state.favoriteMovies.find(fav => fav.id === movie.id),
      );
      state.favoriteMovies.push(...newMovies);
    },
    addWatchlistMovies: (state, action) => {
         const newMovies = action.payload.filter(
                  movie => !state.watchlistMovies.find(fav => fav.id === movie.id),
         )
         state.watchlistMovies.push(...newMovies)
    },
    removeWatchlistMovies: (state, action) => {
      state.watchlistMovies = state.watchlistMovies.filter(
        movie => !action.payload.includes(movie.id),
      );
    },
    removeFavoriteMovies: (state, action) => {
      state.favoriteMovies = state.favoriteMovies.filter(
        movie => !action.payload.includes(movie.id),
      );
    },
    




  },
});

export const {addTask, deleteTask, addFavoriteMovies, addWatchlistMovies, removeWatchlistMovies, removeFavoriteMovies } = TaskSlice.actions;

export default TaskSlice.reducer;
