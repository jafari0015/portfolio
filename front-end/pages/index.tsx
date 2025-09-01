import Home from "@/components/Hero/Home";
import About from "@/components/About/About";
import ProfileCard from "@/components/Hero/ProfileCard";
import Work from "@/components/Work/Work";
import Blog from "@/components/Blog/Blog";
import ContactSection from "@/components/Contact/ContactSection";
import TitleSection from "@/components/UI/TitleSection";
import GoToBlogButton from "@/components/Blog/GoToBlogButton";
import { GetStaticProps, NextPage } from "next";
import { client } from "@/libs/sanity";
import Layout from "@/components/Layout/Layout";


interface SocialLink {
  _id: string;
  icon: string;
  url: string;
}

interface IconType {
  title: string;
  icon: string;
  text: string;
  target : string;
  link: string;
}

interface WorkType {
  title: string;
  description: string;
  imageUrl: string;
  github: string;
  slug: { current: string };
  techStack?: string[];
}

interface BlogType {
  _id: string;
  title: string;
  text: string;
  techs?: string[];
  slug: { current: string };
  date: string;
}
interface HomePageProps {
  socialLinks: SocialLink[];
  works: WorkType[];
  blogs: BlogType[];
  iconsPlatform : IconType[];
}

const HomePage: NextPage<HomePageProps> = ({ socialLinks, works, blogs , iconsPlatform }) => {
  return (
    <>
    <Layout>
      <main id="home" className="pt-4 sm:pt-32">
        <div className="w-full p-6 sm:p-12 block sm:flex items-center md:gap-10 xl:gap-6 justify-around clip-path dark:bg-[#121212] bg-[#d2d3db]">
          <ProfileCard socialLinks={socialLinks} />
          <Home />
        </div>
        <div className="inverted-border dark:bg-[#121212] bg-[#d2d3db] hidden xl:flex">
          <div className="bottom-border hidden xl:flex dark:bg-[#121212] bg-[#d2d3db]"></div>
        </div>
      </main>

      <section className="md:px-8 px-4 xl:px-12 py-20 mt-10 rest-para dark:bg-[#121212] bg-[#d2d3db]">
        <div className="inverted-top dark:bg-[#121212] bg-[#d2d3db] hidden xl:flex">
          <div className="top-border dark:bg-[#121212] bg-[#d2d3db] hidden xl:flex"></div>
        </div>
        <TitleSection title="About" text="Me" />
        <About />
        <TitleSection title="My" text="Work" />
        <Work works={works} />
        <TitleSection title="Latest" text="Blog" />
        <Blog blogs={blogs} />
        <GoToBlogButton />
        <TitleSection title="Get in" text="Touch" />
        <ContactSection iconsPlatform={iconsPlatform} />
      </section>
      </Layout>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  try {
    const socialLinksQuery = `*[_type == "socialLink"]`;
    const socialLinks = await client.fetch<SocialLink[]>(socialLinksQuery);

    const worksQuery = `*[_type == "work"] | order(_createdAt desc){
      title,
      description,
      "imageUrl": image.asset->url,
      github,
      slug,
      techStack
    }`;
    const works = await client.fetch<WorkType[]>(worksQuery);

    const blogsQuery = `*[_type == "blog"] | order(date desc){
      _id,
      title,
      "text": description,
      techs,
      slug,
      date
    }`;
    const blogs = await client.fetch<BlogType[]>(blogsQuery);

    const iconsPlatformQuery = `*[_type == "iconPlatform"]{
      title,
      text,
      icon,
      link,
      target
    }`;
    
    const iconsPlatform = await client.fetch<IconType[]>(iconsPlatformQuery);
    return {
      props: {
        socialLinks,
        works,
        blogs,
        iconsPlatform,
      },
      revalidate: 60, // ISR
    };
  } catch (err: any) {
    console.error("Sanity fetch error:", err.message);
    return {
      props: {
        socialLinks: [],
        works: [],
        blogs: [],
        iconsPlatform: [],
      },
    };
  }
};

export default HomePage;
