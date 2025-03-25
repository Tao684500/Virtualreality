import React, { useEffect, useState } from "react";
import "../scss/movie-card.scss";

const MovieCard = ({ movie, onAddToCart }) => {
  const [price, setPrice] = useState("");
  const [isPriceSaved, setIsPriceSaved] = useState(false); 
  const [isEditMode, setIsEditMode] = useState(false); 

  useEffect(() => {
    const savedPrice = localStorage.getItem(`price_${movie.id}`);
    if (savedPrice) {
      setPrice(savedPrice);
      setIsPriceSaved(true);
    }
  }, [movie.id]);

  const handlePriceChange = (e) => {
    const newValue = e.target.value; 
    if (/^\d*$/.test(newValue)) {
      setPrice(newValue);
    }
  };

  const handleSavePrice = () => {
    localStorage.setItem(`price_${movie.id}`, price); 
    setIsPriceSaved(true); 
    setIsEditMode(false); 
  };

  const handleEditPrice = () => {
    setIsEditMode(true); 
  };

  const handleAddToCart = () => {
    if (isPriceSaved) {
      onAddToCart(movie, price); 
    }
  };

  return (
    <div className="movie-card">
      <div className="movie-img">
        <img
          src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
          alt={movie.title}
        />
      </div>
      <div className="movie-card-warp">
        <div className="detail">
          <h3 className="title">{movie.title}</h3>
          <p className="des">{movie.overview}</p>
        </div>
        <div className="btn-detail">
          <div className="btn-l">
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              placeholder="Enter Price"
              value={price}
              onChange={handlePriceChange}
              disabled={!isEditMode && isPriceSaved}
              style={{ MozAppearance: "textfield" }}
            />
            <div className="button">
              <button className="btn-blue" onClick={handleSavePrice}>
                Save Price
              </button>
              <button className="btn-yellow" onClick={handleEditPrice}>
                Edit Price
              </button>
            </div>
          </div>
          <button
            className="btn-green"
            onClick={handleAddToCart}
            disabled={!isPriceSaved}
          >
            Add to Cart
          </button>{" "}
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
