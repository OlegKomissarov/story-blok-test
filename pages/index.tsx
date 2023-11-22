import Head from 'next/head';
import {
    useStoryblokState,
    getStoryblokApi,
    StoryblokComponent
} from '@storyblok/react';

export default function Home({ story, preview }) {
    story = useStoryblokState(story, {
        resolveRelations: ['popular-articles.articles']
    });
    return (
        <div>
            <Head>
                <title>Home</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <StoryblokComponent blok={story.content} />
        </div>
    );
}

export async function getStaticProps({ locale, preview }) {
    let slug = 'home';

    let sbParams = {
        version: preview ? 'draft' : 'published',
        resolve_links: 'url',
        resolve_relations: ['popular-articles.articles']
    };

    const storyblokApi = getStoryblokApi();
    let { data } = await storyblokApi.get(`cdn/stories/${slug}`, sbParams);
    let { data: config } = await storyblokApi.get('cdn/stories/config', sbParams);

    return {
        props: {
            story: data ? data.story : false,
            key: data ? data.story.id : false,
            config: config ? config.story : false,
            locale,
            preview: !!preview,
        },
        revalidate: 3600,
    };
}