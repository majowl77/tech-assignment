import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { AxiosError } from "axios";
import { Post, PostsInitialState } from "../../types/posts";

export const getPostsThunk = createAsyncThunk(
  "posts/fetchAllPosts",
  async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      const data = response.json();
      return data;
    } catch (error) {
      console.log("🚀 ~ error:", error);
    }
  }
);

export const getSingleUserPostsThunk = createAsyncThunk(
  "userPosts/fetchAllUserPosts",
  async (userId: Post["userId"]) => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      const data = response.json();
      return data;
    } catch (error) {
      console.log("🚀 ~ error:", error);
    }
  }
);

const initialState: PostsInitialState = {
  postsList: [],
  isLoading: false,
  error: null,
  userPosts: [],
};

const postsSlice = createSlice({
  name: "users",
  initialState: initialState,
  reducers: {
    getError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPostsThunk.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getPostsThunk.rejected, (state, action) => {
      const errorMsg = action.error.message;
      console.log(
        "🚀 ~ builder.addCase ~ action.error.message:",
        action.error.message
      );
      if (typeof errorMsg === "string") {
        state.error = errorMsg;
      } else {
        state.error = "somthing went wrong! ";
      }
      state.isLoading = false;
      return state;
    });
    builder.addCase(getPostsThunk.fulfilled, (state, action) => {
      state.postsList = action.payload;
      state.isLoading = false;
      return state;
    });
    builder.addCase(getSingleUserPostsThunk.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getSingleUserPostsThunk.rejected, (state, action) => {
      const errorMsg = action.error.message;
      console.log(
        "🚀 ~ builder.addCase ~ action.error.message:",
        action.error.message
      );
      if (typeof errorMsg === "string") {
        state.error = errorMsg;
      } else {
        state.error = "somthing went wrong! ";
      }
      state.isLoading = false;
      return state;
    });
    builder.addCase(getSingleUserPostsThunk.fulfilled, (state, action) => {
      state.userPosts = action.payload;
      console.log("🚀 ~ builder.addCase ~  action.payload:", action.payload);
      state.isLoading = false;
      return state;
    });
  },
});

export default postsSlice.reducer;
export const postsActions = postsSlice.actions;
