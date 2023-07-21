import React, { useState } from 'react';
import './App.css';
import { FaStar } from 'react-icons/fa';
import { v4 as uuid } from 'uuid';

const Movie = ({ title, image, synopsis, rating, reviews, addReview, deleteReview, movieInfo }) => {
  const [reviewText, setReviewText] = useState('');
  const [userName, setUserName] = useState('');
  const [userRating, setUserRating] = useState(0);
  const [showInfo, setShowInfo] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);

  const handleReviewTextChange = (e) => {
    setReviewText(e.target.value);
  };

  const handleUserNameChange = (e) => {
    setUserName(e.target.value);
  };

  const handleUserRatingChange = (e) => {
    setUserRating(Number(e.target.value));
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (reviewText !== '' && userName !== '' && userRating > 0) {
      const review = { id: uuid(), text: reviewText, name: userName, rating: userRating, date: new Date().toLocaleString() };
      addReview(review);
      setReviewText('');
      setUserName('');
      setUserRating(0);
    }
  };

  const toggleInfo = () => {
    setShowInfo(!showInfo);
  };

  const handleClick = () => {
    setButtonClicked(true);
    setTimeout(() => {
      setButtonClicked(false);
    }, 500);
  };

  const handleDeleteReview = (reviewId) => {
    deleteReview(reviewId);
  };

  return (
    <div className="movie">
      <h2>{title}</h2>
      <img src={image} alt={title} />
      <p className="synopsis">{synopsis}</p>
      <div className="rating">
        <Stars rating={rating} />
      </div>
      <div className="user-reviews">
        <h3>User Reviews:</h3>
        <ReviewList reviews={reviews} deleteReview={handleDeleteReview} />
      </div>
      <h3>Leave a Review:</h3>
      <ReviewForm
        reviewText={reviewText}
        userName={userName}
        userRating={userRating}
        handleReviewTextChange={handleReviewTextChange}
        handleUserNameChange={handleUserNameChange}
        handleUserRatingChange={handleUserRatingChange}
        handleReviewSubmit={handleReviewSubmit}
      />
      <button
        onClick={() => {
          toggleInfo();
          handleClick();
        }}
        className={`movie-info-button ${buttonClicked ? 'clicked' : ''}`}
      >
        Movie Info
      </button>
      {showInfo && (
        <MovieInfo
          title={title}
          synopsis={synopsis}
          releaseDate={movieInfo.releaseDate}
          director={movieInfo.director}
          storyBy={movieInfo.storyBy}
          distribution={movieInfo.distribution}
          boxOffice={movieInfo.boxOffice}
          cinematography={movieInfo.cinematography}
        />
      )}
    </div>
  );
};

const Stars = ({ rating }) => {
  const stars = Array.from({ length: 5 }, (_, index) => index + 1);

  return (
    <div>
      {stars.map((star) => (
        <span key={star} className={star <= rating ? 'filled' : ''}>
          ★
        </span>
      ))}
    </div>
  );
};

const ReviewList = ({ reviews, deleteReview }) => {
  return (
    <ul className="review-list">
      {reviews.map((review) => (
        <li key={review.id}>
          <strong>
            {review.name} ({'★'.repeat(review.rating)})
          </strong>
          {review.text}
          <span className="review-date">{review.date}</span>
          <button className="delete-review-button" onClick={() => deleteReview(review.id)}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

const ReviewForm = ({
  reviewText,
  userName,
  userRating,
  handleReviewTextChange,
  handleUserNameChange,
  handleUserRatingChange,
  handleReviewSubmit,
}) => {
  return (
    <form onSubmit={handleReviewSubmit}>
      <input
        type="text"
        value={userName}
        onChange={handleUserNameChange}
        placeholder="Your name"
        className="review-form-input"
      />
      <textarea
        value={reviewText}
        onChange={handleReviewTextChange}
        placeholder="Write your review here"
        className="review-form-textarea"
      />
      <div className="review-form-rating">
        {[...Array(5)].map((_, i) => {
          const ratingValue = i + 1;
          return (
            <label key={ratingValue}>
              <input
                type="radio"
                value={ratingValue}
                onChange={handleUserRatingChange}
                defaultChecked={userRating === ratingValue}
              />
              <FaStar
                className="star"
                color={ratingValue <= userRating ? '#ffc107' : '#e4e5e9'}
              />
            </label>
          );
        })}
      </div>
      <button type="submit" className="review-form-button">
        Submit Review
      </button>
    </form>
  );
};

const MovieInfo = ({ title, synopsis, releaseDate, director, storyBy, distribution, boxOffice, cinematography }) => {
  return (
    <div className="movie-info"> {/* Add a class for the movie info container */}
      <h3>Movie Info:</h3>
      <p>Title: {title}</p>
      <p>Release Date: {releaseDate}</p>
      <p>Director: {director}</p>
      <p>Story By: {storyBy}</p>
      <p>Distributed by: {distribution}</p>
      <p>Box Office: {boxOffice}</p>
      <p>Cinematography: {cinematography}</p>
    </div>
  );
};

const MovieList = () => {
  const [movies, setMovies] = useState([
    {
      title: 'OppenHeimer',
      image:
        'https://m.media-amazon.com/images/M/MV5BMDBmYTZjNjUtN2M1MS00MTQ2LTk2ODgtNzc2M2QyZGE5NTVjXkEyXkFqcGdeQXVyNzAwMjU2MTY@._V1_.jpg',
      synopsis: 'Oppenheimer is an imaginary film that tells the fascinating story of Robert Oppenheimer, a renowned American physicist. The film explores Oppenheimer\'s life and accomplishments, with a focus on his key role in the development of the atomic bomb during World War II.',
      rating: 4,
      reviews: [
        { id: uuid(), text: 'Great movie!', name: 'John', rating: 5, date: '2023-07-20' },
        { id: uuid(), text: 'Highly recommended.', name: 'Jane', rating: 4, date: '2023-07-19' },
      ],
      movieInfo: {
        releaseDate: 'July 21, 2023 (USA)',
        director: 'Christopher Nolan',
        storyBy: 'N/A',
        distribution: ' Universal Pictures',
        boxOffice: '100 million USD',
        cinematography: 'American Prometheus; by: Kai Bird; Martin J. Sherwin',
      }
    },
    {
      title: 'Shazam',
      image:
        'https://hips.hearstapps.com/hmg-prod/images/best-new-comedy-movies-2023-shazam-1670021757.jpg',
      synopsis: 'We all have a superhero inside of us -- it just takes a bit of magic to bring it out. In 14-year-old Billy Batson\'s case, all he needs to do is shout out one word to transform into the adult superhero Shazam. Still a kid at heart, Shazam revels in the new version of himself by doing what any other teen would do have fun while testing out his newfound powers. But he\'ll need to master them quickly before the evil Dr. Thaddeus Sivana can get his hands on Shazam\'s magical abilities.',
      rating: 3,
      reviews: [
        { id: uuid(), text: 'Decent movie.', name: 'Alice', rating: 3, date: '2023-07-18' },
        { id: uuid(), text: 'Could have been better.', name: 'Bob', rating: 2, date: '2023-07-17' },
      ],
      movieInfo: {
        releaseDate: 'April 5, 2019 (USA)',
        director: 'David F. Sandberg',
        storyBy: 'N/A',
        distribution: 'Unknown',
        boxOffice: '367.7 million USD',
        cinematography: ' Warner Bros., Warner Bros. Pictures',
      }
    },
    {
      title: 'Bloody Daddy',
      image:
        'https://images1.zeebiz.com/images/ZB-EN/900x1600/2023/6/1/1685605902226_BloodyDaddyIMDb.jpg',
      synopsis: 'Bloody Daddy chronicles the story of one night when NCB officer Sumair Azad (Shahid Kapoor) goes to meet drug lord Sikander Choudhary (Ronit Bose Roy) in his club to return a bag of cocaine in exchange for his kidnapped teenage son. But things don\'t go as per plan and what ensues is a bloody fight.',
      rating: 5,
      reviews: [
        { id: uuid(), text: 'Masterpiece!', name: 'Kate', rating: 5, date: '2023-07-16' },
        { id: uuid(), text: 'Must watch.', name: 'Mike', rating: 5, date: '2023-07-15' },
      ],
      movieInfo: {
        releaseDate: 'June 9, 2023',
        director: 'Ali Abbas Zafar',
        storyBy: 'N/A',
        distribution: 'N/A',
        boxOffice: 'N/A',
        cinematography: 'N/A',
      }
    },
    {
      title: 'Plane',
      image:
        'https://www.dvdsreleasedates.com/posters/800/P/Plane-2023-movie-poster.jpg',
      synopsis: 'Pilot Brodie Torrance saves passengers from a lightning strike by making a risky landing on a war-torn island -- only to find that surviving the landing was just the beginning. When dangerous rebels take most of the passengers hostage, the only person Torrance can count on for help is Louis Gaspare, an accused murderer who was being transported by the FBI.',
      rating: 2,
      reviews: [
        { id: uuid(), text: 'Disappointing.', name: 'Sarah', rating: 1, date: '2023-07-14' },
        { id: uuid(), text: 'Not recommended.', name: 'Tom', rating: 2, date: '2023-07-13' },
      ],
      movieInfo: {
        releaseDate: 'January 13, 2023 (USA)',
        director: 'Jean-François Richet',
        storyBy: 'Charles Cumming',
        distribution: 'Lionsgate Films',
        boxOffice: '$52.2 million',
        cinematography: 'Brendan Galvin',
      },
    },
  ]);

  const addReview = (index, review) => {
    setMovies((prevMovies) => {
      const updatedMovies = [...prevMovies];
      updatedMovies[index].reviews.push(review);
      return updatedMovies;
    });
  };

  const deleteReview = (index, reviewId) => {
    setMovies((prevMovies) => {
      const updatedMovies = [...prevMovies];
      updatedMovies[index].reviews = updatedMovies[index].reviews.filter(
        (review) => review.id !== reviewId
      );
      return updatedMovies;
    });
  };

  return (
    <div>
      <h1 className="app-heading">CineReview App</h1>
      <div className="grid-container">
        {movies.map((movie, index) => (
          <div className="column" key={index}>
            <Movie
              title={movie.title}
              image={movie.image}
              rating={movie.rating}
              reviews={movie.reviews}
              addReview={(review) => addReview(index, review)}
              deleteReview={(reviewId) => deleteReview(index, reviewId)}
              movieInfo={movie.movieInfo}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieList;
