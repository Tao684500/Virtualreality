import React, { useState, useEffect } from 'react';
import "../scss/movie-page.scss";
import axios from 'axios';
import Cart from '../components/Cart';
import SearchBar from '../components/SearchBar';
import Popup from '../components/Popup';
import MovieCard from '../components/MovieCard';
import { FaShoppingCart } from 'react-icons/fa'; 

const MoviePage = () => {
  const [movies, setMovies] = useState([]);
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);
  const [showPopup, setShowPopup] = useState(false);
  const [total, setTotal] = useState(0); 
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showCart, setShowCart] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60); 

  const moviesPerPage = 6;

  const fetchMovies = async (query, page = 1) => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=fe733988db23f950b39a7b3c57b3c6ac&query=${query}&page=${page}`
      );
      setMovies(response.data.results);
      setTotalPages(response.data.total_pages);
    } catch (error) {
      console.error("Error fetching movies", error);
    }
  };

  const handleAddToCart = (movie, price) => {
    setCart((prevCart) => {
      const updatedCart = [...prevCart, { ...movie, price }];
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const handleClearCart = () => {
    setCart([]);
    localStorage.removeItem('cart');
  };

  const handleCheckout = () => {
    const totalPrice = cart.reduce((acc, item) => acc + parseFloat(item.price || 0), 0);
    setTotal(totalPrice); 
    setTimeLeft(60); 
    setShowPopup(true);
  };

  const toggleCart = () => {
    setShowCart(!showCart);
  };

  useEffect(() => {
    fetchMovies('a', currentPage);
  }, [currentPage]);

  return (
    <div className="movie-page">
      <SearchBar onSearch={fetchMovies} />

      {/* Cart Icon */}
      <div className="cart-icon" onClick={toggleCart}>
        <FaShoppingCart size={30} />
        {cart.length > 0 && <span className="cart-count">{cart.length}</span>}
      </div>

      <Cart 
        cartItems={cart} 
        onClearCart={handleClearCart} 
        onCheckout={handleCheckout} 
        showCart={showCart} 
        toggleCart={toggleCart} 
      />

      <div className="movies-list">
        {movies.slice(0, moviesPerPage).map((movie) => (
          <MovieCard key={movie.id} movie={movie} onAddToCart={handleAddToCart} />
        ))}
      </div>

      <div className="pagination">
  <button 
    className={`btn-blue ${currentPage === 1 ? 'disabled' : ''}`} 
    onClick={() => setCurrentPage(currentPage - 1)} 
    disabled={currentPage === 1}
  >
    Previous
  </button>
  
  <span>{currentPage} of {totalPages}</span>
  
  <button 
    className={`btn-blue ${currentPage === totalPages ? 'disabled' : ''}`} 
    onClick={() => setCurrentPage(currentPage + 1)} 
    disabled={currentPage === totalPages}
  >
    Next
  </button>
</div>


      <Popup 
        onClose={() => setShowPopup(false)} 
        message={`Please transfer payment to account TTB within 1 minute.\nTotal: $${total.toFixed(2)}`} 
        className={showPopup ? 'active' : ''} 
        timeLeft={timeLeft} 
        setTimeLeft={setTimeLeft} 
      />
    </div>
  );
};

export default MoviePage;
