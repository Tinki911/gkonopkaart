import React from 'react';
import UploadPage from './components/UploadPage';

export default function App(){
  return (
    <div className="app">
      <header className="site-header">
        <div className="container">
          <h1 className="logo">G. Konopka Art</h1>
          <nav className="nav">
            <a href="#home">Home</a>
            <a href="#gallery">Gallery</a>
            <a href="#shop">Shop</a>
            <a href="#about">About</a>
            <a href="#upload">Upload</a>
          </nav>
        </div>
      </header>

      <main className="container">
        <section id="home" className="hero">
          <div className="hero-left">
            <h2>Original watercolours & prints</h2>
            <p>Small-run watercolours inspired by landscapes and botanicals.</p>
          </div>
          <div className="hero-right">
            <img src="/images/placeholder-hero.jpg" alt="Hero artwork" />
          </div>
        </section>

        <section id="gallery" className="gallery-section">
          <h3>Gallery</h3>
          <p>Uploaded images appear here automatically.</p>
        </section>

        <section id="upload" style={{marginTop:24}}>
          <UploadPage />
        </section>

        <section id="shop" style={{marginTop:40}}>
          <h3>Shop</h3>
          <button className="checkout">Checkout</button>
        </section>
      </main>

      <footer className="site-footer">
        © G. Konopka Art
      </footer>
    </div>
  );
}
