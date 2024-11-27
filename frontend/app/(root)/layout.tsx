import Topnav from "./_components/topnav";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-primary-white min-h-screen font-sans">
        <div  className="w-full">
          <Topnav />
        </div>
        <div className="min-h-screen min-w-[1222px] bg-page_bg_color my-0 flex justify-center">
          {/* <div className="flex flex-grow"> */}
            {/* <aside className="w-1/6 bg-white h-screen fixed">
              <LeftNav />
            </aside> */}

            <main className="flex flex-col  min-h-screen">
              <div className="flex-grow p-4">{children}</div>
            </main>

          {/* </div> */}
        </div>
      </body>
    </html>
  );
}