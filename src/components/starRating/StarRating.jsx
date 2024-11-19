// StarRating.js
import React from 'react';

const StarRating = ({ rating }) => {
  const maxStars = 5;
  const scaledRating = (rating / 10) * maxStars; // Scale 10-point rating to 5 stars
  const fullStars = Math.floor(scaledRating);    // Number of fully filled stars
  const hasHalfStar = scaledRating % 1 !== 0;    // Check if there's a partial fill

  return (
    <div className="flex">
      {Array.from({ length: maxStars }, (_, index) => (
        <svg
          key={index}
          xmlns="http://www.w3.org/2000/svg"
          className="h-7 w-7"
          viewBox="0 0 24 24"
          fill={index < fullStars ? 'currentColor' : 'none'}
          stroke="currentColor"
          style={{
            color: index < fullStars || (index === fullStars && hasHalfStar) ? 'yellow' : 'gray'
          }}
        >
          <defs>
            <linearGradient id={`half-star-${index}`} x1="0" x2="1" y1="0" y2="0">
              <stop offset="50%" stopColor="yellow" />
              <stop offset="50%" stopColor="gray" />
            </linearGradient>
          </defs>
          <path
            fill={index < fullStars ? 'yellow' : `url(#half-star-${index})`}
            d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
          />
        </svg>
      ))}
    </div>
  );
};

export default StarRating;
