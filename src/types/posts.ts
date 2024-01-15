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
  singlePost: Post | null;
  perPage: number;
};

export type TableHeaders = {
  id: number;
  key: string;
  label: string;
};
