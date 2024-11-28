import Feed from "./_components/Feed";

export default function Page() {
  const feeds = [];
  for (let i = 0; i < 50; i++) {
    const alignment = i % 2 === 0 ? "left" : "right"; 
    feeds.push(<Feed key={i} alignment={alignment} index={i} />);
  }

  return(
    <div className="flex flex-wrap">
        {feeds} 
    </div>
  );
}
