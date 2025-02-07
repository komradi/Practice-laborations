import { useState } from "react";
import { Link } from "react-router-dom";
import { blogPosts, categories } from "@/data/blog-data";

const Categories = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredPosts = selectedCategory
    ? blogPosts.filter((post) => post.category.id === selectedCategory)
    : blogPosts;

  return (
    <div className="space-y-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] bg-clip-text text-transparent">
          Категорії
        </h1>
        <p className="text-lg text-gray-400">
          Оберіть категорію, яка вас цікавить
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() =>
              setSelectedCategory(
                selectedCategory === category.id ? null : category.id
              )
            }
            className={`px-6 py-3 rounded-full transition-all duration-300 ${
              selectedCategory === category.id
                ? "bg-[#9b87f5] text-white shadow-lg shadow-[#9b87f5]/30"
                : "bg-[#1A1F2C] text-gray-300 hover:bg-[#6E59A5] hover:text-white"
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPosts.map((post) => (
          <Link
            key={post.id}
            to={`/post/${post.id}`}
            className="group bg-[#1A1F2C] rounded-xl overflow-hidden hover:ring-2 hover:ring-[#9b87f5] transition-all duration-300"
          >
            <div className="aspect-video relative">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div className="p-6 space-y-3">
              <span className="inline-block px-4 py-1.5 bg-[#6E59A5]/20 text-[#9b87f5] text-sm rounded-full">
                {post.category.name}
              </span>
              <h2 className="text-xl font-semibold group-hover:text-[#9b87f5] transition-colors line-clamp-2">
                {post.title}
              </h2>
              <p className="text-gray-400 text-sm line-clamp-3">{post.description}</p>
              <div className="pt-4 flex items-center gap-3 text-sm text-gray-400">
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="w-8 h-8 rounded-full border-2 border-[#6E59A5]"
                />
                <span>{post.author.name}</span>
                <span className="text-[#6E59A5]">•</span>
                <span>{new Date(post.date).toLocaleDateString('uk-UA')}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;