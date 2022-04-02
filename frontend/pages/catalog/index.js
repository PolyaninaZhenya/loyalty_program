import Grid from "@mui/material/Grid";
import style from "../../components/Sections/SectionAbout/SectionAbout.module.scss";
import CatalogItem from "../../components/Catalog/CatalogItem/CatalogItem";

export default function Catalog({posts}) {

    const getImage = async (id) => {
        let buffer = await fetch(`http://fine02r4.beget.tech/wp-json/wp/v2/media?parent=${id}`)
        return await buffer.json()
    }

    return (
        <>
            <div className={'body-pallet'}>
                <h1 className={'mb-32'}>Каталог</h1>
                <Grid container spacing={3}>
                    {
                        posts && posts?.map((post) => (
                            <Grid item xs={12} lg={4} key={post.id}>
                                <CatalogItem post={post} image={getImage(post.id)}/>
                            </Grid>
                        ))
                    }
                </Grid>
            </div>
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