import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Post, PostsInitialState } from "../../types/posts";

//fetching all the post
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

//fetching single post by id
export const getSingleUserPostsThunk = createAsyncThunk(
  "userPosts/fetchAllUserPosts",
  async (Id: Post["id"]) => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${Id}`
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
  singlePost: null,
  perPage: 5,
};

const postsSlice = createSlice({
  name: "posts",
  initialState: initialState,
  reducers: {
    getPerPageNumber: (state, action: PayloadAction<number>) => {
      state.perPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPostsThunk.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getPostsThunk.rejected, (state, action) => {
      const errorMsg = action.error.message;
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

      if (typeof errorMsg === "string") {
        state.error = errorMsg;
      } else {
        state.error = "somthing went wrong! ";
      }
      state.isLoading = false;
      return state;
    });
    builder.addCase(getSingleUserPostsThunk.fulfilled, (state, action) => {
      state.singlePost = action.payload;
      state.isLoading = false;
      return state;
    });
  },
});

export default postsSlice.reducer;
export const postsActions = postsSlice.actions;
