import "@/styles/globals.css";
import "@/styles/customs.css";
import type { AppProps } from "next/app";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      {/* Global Metadata */}
      <Head>
        <title>Mahdi Jafari</title>
        <meta
          name="description"
          content="Mahdi Jafari's personal portfolio showcasing projects, blogs, and contact information."
        />
        <meta name="keywords" content="Mahdi Jafari, portfolio, web developer, Next.js, React" />
        <meta name="author" content="Mahdi Jafari" />

        {/* Open Graph */}
        <meta property="og:title" content="Mahdi Jafari | Portfolio" />
        <meta
          property="og:description"
          content="Explore Mahdi Jafari’s projects, blogs, and journey as a web developer."
        />
        {/* <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourdomain.com/" />
        <meta property="og:image" content="https://yourdomain.com/profile_image/preview.jpg" /> */}

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Mahdi Jafari | Portfolio" />
        <meta
          name="twitter:description"
          content="Explore Mahdi Jafari’s projects, blogs, and journey as a web developer."
        />
        {/* <meta name="twitter:image" content="https://yourdomain.com/profile_image/preview.jpg" /> */}
      </Head>

      {/* Your Layout */}
      <main className="background dark:bg-[#000000] bg-opacity-5 bg-[#fff] -z-10">
        <div className="px-4 md:px-4 xl:px-24 pt-20 sm:pt-0 ">
            <Component {...pageProps} />
        </div>
      </main>
    </>
  );
}
