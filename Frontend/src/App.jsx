import React from 'react'
import Signin from './Components/Signin';
import Signup from './Components/Signup';
import Home from './Pages/Home';
import Navbar from './Pages/Navbar'
import Articles from './Pages/Articles';
import ArticlesList from './Pages/ArticlesList';
import Error404 from './Pages/Error404';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

const App = () => {

  return (

<>
<Router>
  <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/Signin" element={<Signin/>}/>
          <Route path="/Signup" element={<Signup />} />
          <Route path='/ArticlesList' element={<ArticlesList/>}/>
          <Route path='/ArticlesList/:articleId' element={<Articles/>}/>
          <Route path='*' element={<Error404/>}/>
      </Routes>
  </Router>  

</>
  )
  
}


export default App
