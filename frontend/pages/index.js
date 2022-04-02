import Head from 'next/head'
import Image from 'next/image'
import SectionIntro from "../components/Sections/SectionIntro/SectionIntro";
import CatalogList from "../components/Catalog/CatalogList";
import SectionAbout from "../components/Sections/SectionAbout/SectionAbout";
import backend from "../backend/clientWp";

export default function Home({posts}) {
  return (
    <>
        <SectionIntro/>
        <CatalogList posts={posts} className={'mv-32'}/>
        <SectionAbout className={'mv-32'}/>
    </>
  )
}

export async function getStaticProps(context) {
    const posts = await backend.programs()

    return {
        props: {
            posts
        },
    }
}