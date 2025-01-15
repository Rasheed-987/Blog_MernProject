import React from 'react';
import { Link } from 'react-router-dom';
const Home = () => {
  return (
    <div className=" bg-blue-950 border-white p-4">
      <nav className="container mx-auto">
        <ul className='flex justify-center gap-4 items-center'>
          <li className="text-white text-lg">
            <Link to="/">Home</Link>
          </li>
          <li className="text-white text-lg">
            <Link to="/Signin">Signin</Link>
          </li>
          <li className="text-white text-lg">
            <Link to="/Signup">Signup</Link>
          </li>
          <li className="text-white text-lg">
            <Link to="/ArticlesList">Articles</Link>
          </li>
        </ul>
        
      </nav>
    </div>
  )
}

export default Home
