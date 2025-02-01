import React from 'react'
import Hero from '../components/hero'
import './home.css'
import LatestCollection from '../components/LatestCollection'
import ImageCarousel from '../components/ImageCarousel'


const Home = () => {
  return (
    <div className='home' >
        <div className='home2' >
            <Hero/>
        </div>
        <div>
            <ImageCarousel/>
        </div>
        <LatestCollection/>
        <div>
        </div>
    </div>
  )
}

export default Home