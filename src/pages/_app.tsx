import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import "@/styles/globals.css";
import type { Page } from "@/types/page";
import { api } from "@/utils/api";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import Head from "next/head";
import { Fragment } from "react";
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
        <Toaster />
      </ThemeProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
