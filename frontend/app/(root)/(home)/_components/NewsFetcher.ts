import axios from "axios";
import { Article } from "@/types";


export const fetchNews = async (): Promise<Article[]> => {

    const today: Date = new Date();
    today.setDate(today.getDate() - 7);
    const year = today.getFullYear();
    let month = today.getMonth() +1;
    let day = today.getDate();
    const formattedMonth = month < 10 ? `0${month}` : `${month}`;
    const formattedDay = day < 10 ? `0${day}` : `${day}`; 

    const formattedDate = `${year}-${formattedMonth}-${formattedDay}`; //yyyy-mm-dd
    const apiKey = '3153969faef84649bdc0c6de15d91c56';

    const url = `https://newsapi.org/v2/everything?q=indian cricket team&from=${formattedDate}&sortBy=popularity&apiKey=${apiKey}`;

    try{
        const response = await axios.get(url);
        const articles = response.data.articles;

        const formattedArticles: Article[] = articles
        .filter((article: any) => article.title !== "[Removed]"  && article.source.name !== "Livemint" && article.urlToImage !== "null")
        .map((article: any) => ({
            title: article.title,
            description: article.description,
            url: article.url,
            urlToImage: article.urlToImage,
        }));
        return formattedArticles; 
    }
    catch(error){
        console.log(error);
        return [];
    }
}
