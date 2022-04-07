import Head from 'next/head'
import Image from 'next/image'
import SectionIntro from "../components/Sections/SectionIntro/SectionIntro";
import CatalogList from "../components/Catalog/CatalogList";
import SectionAbout from "../components/Sections/SectionAbout/SectionAbout";
import backend from "../backend/clientWp";

export default function Home({cards}) {
    console.log(cards)
    return (
        <>
            <SectionIntro/>
            <CatalogList posts={cards} className={'mv-32'}/>
            <SectionAbout className={'mv-32'}/>
        </>
    )
}

export async function getStaticProps(context) {
    const cards = await backend.card()

    return {
        props: {
            cards
        },
        revalidate: 10
    }
}