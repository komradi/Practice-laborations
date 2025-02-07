import { useState } from "react";
import { Link } from "react-router-dom";
import { blogPosts } from "@/data/blog-data";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const POSTS_PER_PAGE = 8;

const Home = () => {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("date");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredPosts = blogPosts
    .filter((post) =>
      post.title.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sort === "date") {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
      return a.title.localeCompare(b.title);
    });

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const currentPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  return (
    <div className="space-y-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-fade-in">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-[#D6BCFA] to-[#E5DEFF] bg-clip-text text-transparent">
          Останні публікації
        </h1>
        <p className="text-lg text-gray-400">
          Читайте наші останні статті та дізнавайтесь нове
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <Input
          placeholder="Пошук статей..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="md:w-64 bg-[#1A1F2C] border-[#8E9196] text-gray-300 placeholder:text-gray-500 focus-visible:ring-[#D6BCFA]"
        />
        <Select value={sort} onValueChange={setSort}>
          <SelectTrigger className="w-full md:w-48 bg-[#1A1F2C] border-[#8E9196] text-gray-300">
            <SelectValue placeholder="Сортування" />
          </SelectTrigger>
          <SelectContent className="bg-[#1A1F2C] border-[#8E9196]">
            <SelectItem value="date" className="text-gray-300 focus:bg-[#8E9196]/20 focus:text-[#D6BCFA]">За датою</SelectItem>
            <SelectItem value="title" className="text-gray-300 focus:bg-[#8E9196]/20 focus:text-[#D6BCFA]">За назвою</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {currentPosts.map((post, index) => (
          <Link
            key={post.id}
            to={`/post/${post.id}`}
            className="group bg-[#221F26] rounded-xl overflow-hidden hover:ring-2 hover:ring-[#D6BCFA] transition-all duration-500 hover:scale-[1.02] animate-fade-in"
            style={{
              animationDelay: `${index * 100}ms`
            }}
          >
            <div className="aspect-video relative overflow-hidden">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
            <div className="p-4 space-y-3">
              <span className="inline-block px-3 py-1 text-[#D6BCFA] text-sm">
                {post.category.name}
              </span>
              <h2 className="text-lg font-semibold group-hover:text-[#D6BCFA] transition-colors duration-300 line-clamp-2">
                {post.title}
              </h2>
              <p className="text-sm text-gray-400 line-clamp-3">{post.description}</p>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="w-6 h-6 rounded-full border border-[#8E9196]"
                />
                <span>{post.author.name}</span>
                <span className="text-[#8E9196]">•</span>
                <span>{new Date(post.date).toLocaleDateString('uk-UA')}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center gap-2">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-4 py-2 rounded-full transition-all duration-300 ${
                currentPage === i + 1
                  ? "bg-[#D6BCFA] text-white shadow-lg shadow-[#D6BCFA]/30"
                  : "bg-[#221F26] text-gray-300 hover:bg-[#8E9196] hover:text-white"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;