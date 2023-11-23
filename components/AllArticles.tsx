import ArticleTeaser from './ArticleTeaser';
import { storyblokEditable } from '@storyblok/react';

const AllArticles = ({ blok }) => {
    return (
        <>
            <p className="text-3xl">{blok.title}</p>
            <div
                className="grid w-full grid-cols-1 gap-6 mx-auto lg:grid-cols-3   lg:px-24 md:px-16"
                {...storyblokEditable(blok)}
            >
                {blok.articles[0] && blok.articles.map((article) => (
                    <ArticleTeaser article={article.content} key={article.uuid} />
                ))}
            </div>
        </>
    );
};
export default AllArticles;