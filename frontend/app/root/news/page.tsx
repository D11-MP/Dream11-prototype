"use client";
import { useEffect, useState } from "react";
import Feed from "./_components/Feed";
import { fetchNews } from "../(home)/_components/NewsFetcher";

export default function Page() {
  interface Article {
    title: string;
    description: string;
    url: string;
    urlToImage: string;
  }

  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    const getNews = async () => {
      const news = await fetchNews();
      setArticles(news);
      console.log(news);
    };

    getNews();
  }, []);

  const feeds: JSX.Element[] = [];

  for (let i = 0; i < 50; i++) {
    const alignment = i % 2 === 0 ? "left" : "right";
    feeds.push(
      <Feed key={i} alignment={alignment} index={i} articles={articles} />
    );
  }

  return (
    <div className="flex flex-wrap min-h-screen w-screen px-20 bg-white">
      {feeds}
    </div>
  );
}
