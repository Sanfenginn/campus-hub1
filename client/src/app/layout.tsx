import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";
import ClientProvider from "./utils/ClientProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Campus Hub",
  description:
    "A CMS for managing campus events and activities including registration and ticketing.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  console.log("Rendering RootLayout");
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <Provider store={store}>{children}</Provider>
         */}
        <ClientProvider>{children}</ClientProvider>
      </body>
    </html>
  );
}
