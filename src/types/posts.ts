import { tableHeaders } from "../components/postsTable/PostsTable";

export type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export type PostsInitialState = {
  postsList: Post[];
  isLoading: boolean;
  error: null | string;
  userPosts: Post[];
};

export type TableHeaders = {
  id: number;
  key: string;
  lable: string;
};
