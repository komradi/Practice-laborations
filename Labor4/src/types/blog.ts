export type Category = {
  id: string;
  name: string;
  slug: string;
};

export type BlogPost = {
  id: string;
  title: string;
  description: string;
  content: string;
  image: string;
  author: {
    name: string;
    avatar: string;
  };
  category: Category;
  date: string;
  readTime: string;
};