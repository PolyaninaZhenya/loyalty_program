import Head from 'next/head'
import Image from 'next/image'
import SectionIntro from "../components/Sections/SectionIntro/SectionIntro";
import CatalogList from "../components/Catalog/CatalogList";

export default function Home({posts}) {
  return (
    <>
        <SectionIntro/>
        <CatalogList posts={posts} className={'mv-32'}/>
    </>
  )
}

export async function getStaticProps(context) {
    const data = await fetch('http://fine02r4.beget.tech/wp-json/wp/v2/programs')
    const posts = await data.json()

    return {
        props: {
            posts
        },
    }
}