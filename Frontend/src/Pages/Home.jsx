import React from 'react'
import articles from '../Pages/article-content'
import ArticleMain from '../Components/ArticleMain'

const Home = () => {
  return (
    <div>
      <h2>Home pages</h2>
{
  <ArticleMain articles={articles}/> 
}
    </div>
  )
}

export default Home
