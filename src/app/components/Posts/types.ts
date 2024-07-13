export interface UserType {
  id: string;
  name: string;
  profileUrl: string;
}
export interface PostType {
  id: string;
  description: string;
  likes: number;
  user: UserType;
  comments: {
    content: string;
    user: UserType;
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
