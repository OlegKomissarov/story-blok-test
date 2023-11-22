import '@/styles/globals.css';
import { storyblokInit, apiPlugin } from '@storyblok/react';
import Feature from '../components/Feature';
import Grid from '../components/Grid';
import Page from '../components/Page';
import Teaser from '../components/Teaser';
import Config from '../components/Config';
import HeaderMenu from '../components/HeaderMenu';
import MenuLink from '../components/MenuLink';
import Layout from '../components/Layout';
import Hero from '../components/Hero';
import Article from '../components/Article';
import AllArticles from '../components/AllArticles';
import PopularArticles from '../components/PopularArticles';

const components = {
    feature: Feature,
    grid: Grid,
    teaser: Teaser,
    page: Page,
    config: Config,
    layout: Layout,
    header_menu: HeaderMenu,
    menu_link: MenuLink,
    hero: Hero,
    article: Article,
    'all-articles': AllArticles,
    'popular-articles': PopularArticles,
};

storyblokInit({
    accessToken: process.env.STORYBLOK_API_TOKEN,
    use: [apiPlugin],
    components,
});

export default function App({ Component, pageProps }) {
    return (
        <Layout story={pageProps.config}>
            <Component {...pageProps} />
        </Layout>
    );
}