import React from 'react';

function PlantCard({ plant }) {
  const addToCart = () => {
    // Add plant to cart logic here
    console.log(`Added ${plant.name} to cart`);
  };

  return (
    <div>
      <img src={plant.imageUrl} alt={plant.name} />
      <h2>{plant.name}</h2>
      <p>Price: ${plant.price}</p>
      <button onClick={addToCart}>Add to Cart</button>
    </div>
  );
}

export default PlantCard;
