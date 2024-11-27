import Topnav from "./_components/topnav";
import LeftNav from "./_components/leftnav";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-primary-white min-h-screen font-sans">
        <div className="flex flex-col min-h-screen">
          <div className="flex flex-grow">
            <aside className="w-1/6 bg-white h-screen fixed">
              <LeftNav />
            </aside>
            <main className="flex flex-col w-5/6 ml-[16.666%] bg-gray-100 min-h-screen">
              <div>
                <Topnav />
              </div>
              <div className="flex-grow p-4">{children}</div>
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}