import Image from "next/image";
import Link from "next/link";

export default function NewsCard() {
  return (
    <div className="bg-white rounded-lg shadow-md max-w-sm">
      <Image
        src="/ipl.png"
        alt="Description of image"
        width={500}
        height={200}
        className="rounded-t-lg"
      />
      <div className="px-8 py-4">
        <h1 className="text-2xl">This week in News</h1>
        <p className="py-2">Stats: Jaiswal extends imperious start in Tests</p>
        <hr />
        <p className="py-2">Stats: Jaiswal extends imperious start in Tests</p>
        <Link className="mr-2 text-red-500 hover:underline" href={"/news"}>
          Show more
        </Link>
      </div>
    </div>
  );
}
