import React from 'react'
import Header from './Header';
import Footer from './Footer';
import { Helmet } from 'react-helmet';
import { Toaster } from 'react-hot-toast';

const Layout = ({ children, title, description, keywords, author }) => {
    return (
        <div>
            <Helmet>
                <meta charSet="UTF-8" />
                <meta name="description" content={description} />
                <meta name="keywords" content={keywords} />
                <meta name="author" content={author} />
                <title>{title}</title>
            </Helmet>
            <Header />
            <Toaster />
            <main style={{}}>{children}</main>
            <Footer />
        </div>
    )
}
Layout.defaultProps = {
    title: "E-Commerce App : Shop Now",
    description: "E-Commerce App constantly evolving technology, logistics and payments infrastructure connects this vast and diverse region, and offers Southeast Asia a shopping experience that is safe, seamless and enjoyable. At E-Commerce App, nothing stands still. As the demands of discerning shoppers and ambitious retailers continue to grow, we’re always a few steps ahead.",
    keywords: "MERN-Stack, React, Node, MongoDB",
    author: "Jamil Inc."
}

export default Layout
