import { useParams, Link } from "react-router-dom";
import { blogPosts } from "@/data/blog-data";

const BlogPost = () => {
  const { id } = useParams();
  const post = blogPosts.find((p) => p.id === id);

  if (!post) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold">Пост не знайдено</h1>
        <Link to="/" className="text-[#7C3AED] hover:underline">
          Повернутися на головну
        </Link>
      </div>
    );
  }

  return (
    <article className="max-w-4xl mx-auto space-y-8">
      <div className="space-y-4">
        <Link
          to="/"
          className="text-[#7C3AED] hover:underline inline-block mb-4"
        >
          ← Назад
        </Link>
        <h1 className="text-4xl font-bold">{post.title}</h1>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="w-10 h-10 rounded-full"
            />
            <span>{post.author.name}</span>
          </div>
          <span>•</span>
          <span>{new Date(post.date).toLocaleDateString()}</span>
          <span>•</span>
          <span>{post.readTime}</span>
        </div>
      </div>

      <img
        src={post.image}
        alt={post.title}
        className="w-full aspect-video object-cover rounded-lg"
      />

      <div className="prose prose-invert max-w-none">
        {post.content}
      </div>

      <div className="border-t border-[#1F1F1F] pt-8">
        <h2 className="text-2xl font-bold mb-4">Схожі статті</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogPosts
            .filter(
              (p) =>
                p.id !== post.id && p.category.id === post.category.id
            )
            .slice(0, 3)
            .map((relatedPost) => (
              <Link
                key={relatedPost.id}
                to={`/post/${relatedPost.id}`}
                className="group bg-[#1F1F1F] rounded-lg overflow-hidden hover:ring-2 hover:ring-[#7C3AED] transition-all"
              >
                <div className="aspect-video">
                  <img
                    src={relatedPost.image}
                    alt={relatedPost.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold group-hover:text-[#7C3AED] transition-colors">
                    {relatedPost.title}
                  </h3>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </article>
  );
};

export default BlogPost;