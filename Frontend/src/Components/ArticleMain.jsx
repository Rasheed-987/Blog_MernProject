import React from 'react'
import { Link } from 'react-router-dom'

const ArticleMain = ({articles}) => {
  return (
    <div>
      
      {articles.map((article, index) => (
          <li key={index}>
            <Link className='article-list-item' to={`/ArticlesList/${article.name}`} >
            <h2>{article.title}</h2>
             <h1>{article.name}</h1> 
             <p>{article.content[0].substring[0,150]}...</p>
          </Link>
          </li>
        ))}

    </div>
  )
}

export default ArticleMain
