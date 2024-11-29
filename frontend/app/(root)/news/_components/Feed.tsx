import Image from "next/image";
import Link from "next/link";


interface Article {
  title: string;
  description: string;
  url: string;
  urlToImage: string;
}

interface FeedProps {
    alignment: 'left' | 'right'; 
    index: number;
    articles: Article[];
}

const Feed = ({ alignment, index, articles }: FeedProps) => {
  const alignmentClass = alignment === 'left' ? 'w-[45%] my-5' : 'w-[45%] my-5';
  const width = alignment === 'left' ? 'w-[10%]':'w-[0%]';

  if (articles.length === 0 || index >= articles.length) return null;
  
  return (
    <>
      <div className={`bg-white rounded-lg shadow-md ${alignmentClass} h-[400px]`}>
          {/* Image Section */}
          <div className="relative h-[200px]">
              <Image
                src={articles[index].urlToImage !== null ? articles[index].urlToImage : "/ipl.png"}
                alt="Description of image"
                fill
                sizes="auto"
                style={{"objectFit": "cover"}}
                className="rounded-t-lg"
              />
          </div>

          {/* Title and Description Section */}
          <div className="px-4 py-2 h-[150px] overflow-hidden">
              <h1 className="text-xl font-bold line-clamp-2">{articles[index].title}</h1>
              <p className="py-2 line-clamp-3">{articles[index].description}</p>
              <Link className="mr-2 text-red-500 hover:underline" href={articles[index].url} target="_blank">
                Read more
              </Link>
          </div>
      </div>
      <div className={width}></div>
    </>
  );
}

export default Feed;