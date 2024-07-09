export interface PostType {
  id: string;
  description: string;
  likes: number;
  user: {
    _id: string;
    name: string;
    profileUrl: string;
  };
  comments: {
    content: string;
    user: string;
  }[];
  media: {
    name: string;
    url: string;
  }[];
}

export interface ModalType {
  open: boolean;
  selectedPost: PostType;
}
