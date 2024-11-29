"use client";
import { useEffect, useState } from "react";
import Feed from "./_components/Feed";
import { fetchNews } from "../(home)/_components/NewsFetcher";

export default function Page() {
  
  const [articles, setArticles] = useState<any[]>([]);
  
  useEffect(() => {
    const getNews = async () => {
      const news = await fetchNews();
      setArticles(news);
      console.log(news);
    };
    
    getNews();
  }, []);

  const feeds = [];

  for (let i = 0; i < 50; i++) {
    const alignment = i % 2 === 0 ? "left" : "right"; 
    feeds.push(<Feed key={i} alignment={alignment} index={i} articles={articles} />);
  }

  return(
    <div className="flex flex-wrap">
      {feeds} 
    </div>
  );
}
