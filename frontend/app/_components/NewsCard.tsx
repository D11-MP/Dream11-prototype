import Image from "next/image";

export default function NewsCard() {
  return (
    <div>
      <Image
        src="/ipl.png"
        alt="Description of image"
        width={500}
        height={300}
      />
      <h1 className="text-2xl">This week in News</h1>
      <p>Stats: Jaiswal extends imperious start in Tests</p>
      <br></br>
      <p>Stats: Jaiswal extends imperious start in Tests</p>
      <p className="mr-2 text-red-500">Show more</p>
    </div>
  );
}
