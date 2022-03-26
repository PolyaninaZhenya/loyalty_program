import Grid from "@mui/material/Grid";
import backend from "../../backend/clientWp";
import Image from 'next/image'

export default function CatalogSingle({post, media, terms}) {
    console.log(post)
    return (
        <>
            <div className={'body-pallet'}>
                <Grid className={'catalog-single'} container spacing={2}>
                    <Grid item xs={12} lg={4}>
                        <div className={'card'}>
                            <Image src={media.source_url} layout={'fill'}/>
                        </div>
                    </Grid>
                    <Grid item xs={12} lg={8}>
                        <small>Тип:
                            {
                                terms.map((term) => (
                                    <span key={term.id}> {term.name}</span>
                                ))
                            }</small>
                        <h1 dangerouslySetInnerHTML={{__html: post.title.rendered}}/>
                    </Grid>
                </Grid>
            </div>
            {
                post.content.rendered && <div className={'body-pallet mv-32'}>
                    <div>
                        <h3 className={'mb-16'}>Описание</h3>
                        <div dangerouslySetInnerHTML={{__html: post.content.rendered}}/>
                    </div>
                </div>
            }
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