"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchNews } from "./NewsFetcher";

export default function NewsCard() {

  const [articles, setArticles] = useState<any[]>([]);
  useEffect(() => {
    const getNews = async () => {
      const news = await fetchNews();
      setArticles(news);
    };

    getNews();
  }, []);

  if (articles.length === 0) return null;
  
  return (
    <div className="bg-white rounded-lg shadow-md max-w-sm">
      <Image src= {articles[0].urlToImage !== "" ? articles[0].urlToImage : "/ipl.png" } 
        alt="Description of image"
        width={500}
        height={200}
        className="rounded-t-lg"
      />
      <div className="px-8 py-4">
        <h1 className="text-2xl">This week in News</h1>
        <p className="py-2">{articles[0].title}</p>
        <hr />
        <p className="py-2">{articles[1].title}</p>
        <Link className="mr-2 text-red-500 hover:underline" href={"/news"}>
          Show more
        </Link>
      </div>
    </div>
  );
}