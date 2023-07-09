import React from 'react'
import Layout from '../component/Layout/Layout';
import Categories from './Categories';
import Hero from './Hero';
import Features from './Features';
import Newsletter from './Newsletter';
import LatestProducts from './LatestProducts';
import FeaturedProducts from './FeaturedProducts';


const HomePage = () => {
    return (
        <Layout>
            <Hero />
            <Features />
            <LatestProducts />
            <Categories />
            <FeaturedProducts />
            <Newsletter />
        </Layout>
    )
}

export default HomePage
