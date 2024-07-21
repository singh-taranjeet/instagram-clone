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
  createdAt: Date;
  comments: {
    content: string;
    user: UserType;
    likes: number;
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

export type ObjectFitType = "cover" | "contain";
