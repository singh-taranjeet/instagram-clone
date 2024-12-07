export interface UserType {
  id: number;
  name: string;
  profileUrl: string;
}
export interface PostType {
  id: string;
  description: string;
  likes: number;
  user: UserType;
  createdAt: Date;
  commentsCount: number;
  highlightedComment: {
    content: string;
    user: UserType;
    createdAt: Date;
  };
  likedBy: UserType[];
  media: {
    name: string;
    url: string;
  }[];
}

export interface CommentType {
  content: string;
  likes: number;
  id: number;
  createdAt: Date;
  user: UserType;
  likedBy: UserType[];
}

export interface ModalType {
  open: boolean;
  selectedPost: string;
}

export type ObjectFitType = "cover" | "contain";
