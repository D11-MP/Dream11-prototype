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
    const apiKey = '59d619fcb0724ffa8b08f44217fedcab';

    const url = `https://newsapi.org/v2/everything?q=indian cricket team&from=${formattedDate}&sortBy=popularity&apiKey=${apiKey}`;

    try{
        const response = await axios.get(url);
        const articles = response.data.articles;

        const formattedArticles: Article[] = articles
        .filter((article: any) => article.title !== "[Removed]"  && article.source.name !== "Livemint" && article.urlToImage !== "null" && article.urlToImage !== "")
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
