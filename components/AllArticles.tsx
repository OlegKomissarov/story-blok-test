import ArticleTeaser from './ArticleTeaser';
import { getStoryblokApi, storyblokEditable } from '@storyblok/react';

import { useState, useEffect } from 'react';

const AllArticles = ({ blok }) => {
    const [articles, setArticles] = useState([]);
    useEffect(() => {
        const getArticles = async () => {
            const storyblokApi = getStoryblokApi();
            const { data } = await storyblokApi.get(`cdn/stories`, {
                version: 'draft', // or 'published'
                starts_with: 'blog/',
                is_startpage: false
            });

            setArticles((prev) => data.stories.map((article) => {
                article.content.slug = article.slug;
                return article;
            }));
        };
        getArticles();
    }, []); // todo перенести получение данных в getStaticProps

    // todo сделать ревалидацию в проде. сделать чтобы на превью продакшн обновлялся по клику на кнопку.
    //  click to published.
    //  То есть по клику на Publish инвалидируются данные и на след запрос придет обновленная версия на продакшн.
    //  сделать vercel project. сделать чтобы storyblok смотрел его вместо локалхост.
    //  релизить изменения через ревалидацию

    // todo почитать доку по апи вообще v2 не management.
    //  прочитать что возможно делать через апи, почитать про их параметры чтобы решать проблемы. resolve_relations, н-р

    // todo добавить .env
    return (
        <div {...storyblokEditable(blok)}>
            <p className="text-3xl">{blok.title}</p>
            <div className="grid w-full grid-cols-1 gap-6 mx-auto lg:grid-cols-3   lg:px-24 md:px-16">
                {articles[0] && articles.map((article) => (
                    <ArticleTeaser article={article.content} key={article.uuid} />
                ))}
            </div>
        </div>
    );
};
export default AllArticles;