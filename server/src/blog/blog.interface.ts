export interface Blog {
  title: string;
  description: string;
  id: number;
  featuredImage: string;
}

const forbiddenTitle = ['1', 'Mua'];
export const forbiddenTitleBlog = (title) => {
  if (forbiddenTitle.some((element) => title.includes(element))) {
    return true;
  } else {
    return false;
  }
};
