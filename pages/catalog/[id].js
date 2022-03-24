import Grid from "@mui/material/Grid";
import backend from "../../backend/clientWp";
import Image from 'next/image'

export default function CatalogSingle({ post, media, terms}) {
    console.log(terms)
    return (
        <>
            <div className={'body-pallet'}>
                <Grid className={'catalog-single'} container spacing={2}>
                    <Grid item xs={12} lg={4}>
                        <div className={'card'}>
                            <Image src={media.source_url} layout={'fill'}/>
                        </div>
                        {
                            terms.map((term) => (
                                <span key={term.id}>{term.name}</span>
                            ))
                        }
                    </Grid>
                    <Grid item xs={12} lg={8}>
                        <h1 dangerouslySetInnerHTML={{__html: post.title.rendered}}/>
                    </Grid>
                </Grid>
            </div>
        </>
    )
}

export async function getServerSideProps({params}) {
    const post = await backend.programs().id(params.id)
    const media = await backend.media().id(post.featured_media)
    const terms = await backend.catPrograms().post(params.id)

    return {
        props: {
            post,
            media,
            terms
        },
    }
}