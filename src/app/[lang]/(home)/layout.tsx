import { Suspense } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import { Providers } from "../../components/Providers";
import { Metadata } from "next";
import Loading from "./loading";
import "../../globals.css";
import Header from "./components/Header/Header";
import BottomBar from "./components/BottomBar/BottomBar";
import AlertModal from "../../components/Toast/Toast";
import { LoadingScreen } from "../../components/LoadingScreen/LoadingScreen";
import { CloudIcon } from "../../components/CloudIcon/CloudIcon";

// const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  // const Header = dynamic(()=> import("./components/Header/Header"),{ssr: false})
  // const BottomBar = dynamic(()=> import("./components/BottomBar/BottomBar"),{ssr: false})
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body>
        <Providers>
          <Header />
          <div className="w-full flex flex-row justify-between gap-4 p-4 h-[calc(100%-56px)]">
            <Sidebar />
            <Suspense fallback={<Loading />}>{children}</Suspense>
            <div className="fixed right-0 top-0"></div>
          </div>
          <BottomBar />
          <div className="fixed md:hidden bottom-20 right-4">
            <CloudIcon/>
          </div>
          <div id="portal-modal"></div>
            <div id="portal-loading"></div>
            <AlertModal />
            <LoadingScreen/>
        </Providers>
      </body>
    </html>
  );
}
