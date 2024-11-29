import Topnav from "./_components/topnav";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <div  className="w-full">
        <Topnav/>
      </div>
      <div className="bg-page_bg_color w-full">
        <div className="min-h-screen w-[1222px] mx-auto my-0 flex justify-center">
          <div className="flex flex-col min-h-screen">
            <div>
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}