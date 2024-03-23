import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { Inter } from "next/font/google";
import Head from "next/head";
import { api } from "@/utils/api";
import type { AppProps } from "next/app";
import type { Page } from "@/types/page";
import "@/styles/globals.css";
import { Fragment } from "react";
import { ThemeProvider } from "@/components/theme-provider";
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

type Props = AppProps & {
  Component: Page;
};

const MyApp = ({ Component, pageProps: { session, ...pageProps } }: Props) => {
  const getLayout = Component.getLayout ?? ((page) => page);
  const Layout = Component.layout ?? Fragment;
  return (
    <SessionProvider session={session}>
      <Head>
        <title>PM BUDDY</title>
        <meta
          name="description"
          content="TaskGenie | Project Management and Colaboration Tool"
        />
        <link rel="icon" href="/logo.svg" />
      </Head>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        <main className={`${inter.variable} min-h-screen`}>
          <Layout>{getLayout(<Component {...pageProps} />)}</Layout>
        </main>
      </ThemeProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
