import React from 'react';
import ArticleMain from '../Components/ArticleMain';
import articles from './article-content';

const ArticlesList = () => {
  return (
    <div className='flex flex-col justify-center '>
      <h1>Articles</h1>
        <ArticleMain articles={articles} />
    </div>
  );
};

export default ArticlesList;
