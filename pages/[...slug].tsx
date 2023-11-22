import Head from 'next/head';

import {
    useStoryblokState,
    getStoryblokApi,
    StoryblokComponent
} from '@storyblok/react';

export default function Page({ story, preview }) {
    story = useStoryblokState(story);

    return (
        <div>
            <Head>
                <title>{story?.name || 'StoryBlok Test'}</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <StoryblokComponent blok={story?.content} />
        </div>
    );
}

export async function getStaticProps({ params, locale, preview }) {
    let slug = params.slug ? params.slug.join('/') : 'home';
    let sbParams = {
        version: preview ? 'draft' : 'published',
        resolve_links: "url",
        language: locale,
    };
    const storyblokApi = getStoryblokApi();
    let { data } = await storyblokApi.get(`cdn/stories/${slug}`, sbParams);
    let { data: config } = await storyblokApi.get('cdn/stories/config', sbParams);

    return {
        props: {
            locale,
            story: data ? data.story : false,
            key: data ? data.story.id : false,
            config: config ? config.story : false,
            preview: !!preview,
        },
        revalidate: 3600,
    };
}

export async function getStaticPaths({ locales }) {
    const storyblokApi = getStoryblokApi();
    let { data } = await storyblokApi.get('cdn/links/', {
        version: 'published'
    });
    let paths = [];
    Object.keys(data.links).forEach((linkKey) => {
        if (
            data.links[linkKey].is_folder ||
            data.links[linkKey].slug === 'home' ||
            data.links[linkKey].slug === 'config' ||
            data.links[linkKey].slug === '404' ||
            data.links[linkKey].slug === '500'
        ) {
            return;
        }
        const slug = data.links[linkKey].slug;
        let splittedSlug = slug.split('/');

        for (const locale of locales) {
            paths.push({ params: { slug: splittedSlug }, locale });
        }
    });
    console.log(paths.map(p => p.params.slug))
    return {
        paths: paths,
        fallback: false
    };
}