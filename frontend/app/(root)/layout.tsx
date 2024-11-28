import Topnav from "./_components/topnav";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen font-sans">
        <div  className="w-full">
          <Topnav/>
        </div>
        <div className="bg-page_bg_color w-full">
          <div className="min-h-screen w-[1222px] mx-auto my-0 flex justify-center">
            <div className="flex flex-col  min-h-screen">
              <div className="flex-grow p-4">
                {children}
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}