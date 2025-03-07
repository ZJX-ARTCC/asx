import "./globals.css";
import 'react-toastify/dist/ReactToastify.css';
import React from "react";
import {AppRouterCacheProvider} from "@mui/material-nextjs/v14-appRouter";
import {Roboto} from "next/font/google";
import {ThemeProvider} from "@mui/material/styles";
import theme from "@/theme/theme";
import Navbar from "@/components/Navbar/Navbar";
import {getServerSession} from "next-auth";
import {authOptions} from "@/auth/auth";
import {ToastContainer} from "react-toastify";
import {Metadata} from "next";

const roboto = Roboto({
    weight: ['300', '400', '500', '700'],
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-roboto',
});

export const metadata: Metadata = {
    title: 'vZDC ASX',
    description: 'vZDC ASX',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

    const session = await getServerSession(authOptions);

  return (
    <html lang="en">
    <body className={roboto.variable}>
    <AppRouterCacheProvider>
        <ThemeProvider theme={theme}>
            <Navbar session={session}/>
            {children}
            <ToastContainer theme="dark"/>
        </ThemeProvider>
    </AppRouterCacheProvider>
      </body>
    </html>
  );
}
