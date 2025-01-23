import React from 'react'
import Hero from '../components/hero'
import Content from '../components/Content'
import './home.css'
import LatestCollection from '../components/LatestCollection'
import Footer from '../components/Footer'


const Home = () => {
  return (
    <div className='home' >
        <div className='home2' >
            <Hero/>
        </div>
        <LatestCollection/>
        <div>
            <Content/>
        </div>
        <Footer/>
    </div>
  )
}

export default Home