import React, { useEffect, useState } from "react";
import "./MovieDetail.css";
import movieTrailer from "movie-trailer";
import YouTube from "react-youtube";

// fast.replaceAll(" ", "-")
const base_url = "https://image.tmdb.org/t/p/original/";
function MovieDetail({ match }) {
  useEffect(() => {
    fetchMovie();
    fetchCredits();
    console.log(match.params.id);
  }, [match]);

  const [movie, setMovie] = useState({});
  const [credits, setCredits] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  const fetchMovie = async () => {
    const fetchMovie = await fetch(
      `
      https://api.themoviedb.org/3/movie/${match.params.id}?api_key=d42525da8940f7a7a298e98a209ec951&language=en-US`
    );

    const movie = await fetchMovie.json();
    setMovie(movie);
    console.log(movie);
  };
  const fetchCredits = async () => {
    const fetchCredits = await fetch(
      `
      https://api.themoviedb.org/3/movie/${match.params.id}/credits?api_key=d42525da8940f7a7a298e98a209ec951&language=en-US`
    );

    const credits = await fetchCredits.json();
    setCredits(credits.cast);
    console.log(credits);
  };

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }
  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie?.name || movie?.title || movie?.original_name || "")
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((error) => console.log(error));
    }
  };
  return (
    <div className="movie__details">
      <div className="poster">
        <div className="movie__info">
          <h1>{movie.original_title}</h1>
          <h1 className="banner__description">
            {truncate(movie.overview, 150)}
          </h1>
          <button
            className="trailer__button"
            onClick={() => handleClick(movie)}
          >
            Watch Trailer
          </button>
        </div>
        <div>
          <img
            style={{
              background: "cover",
              backgroundImage: `url(
            "https://image.tmdb.org/t/p/original/${movie?.backdrop_path}"
        )`,
              backgroundPosition: "top center",
            }}
            className="large__poster"
            src={`${base_url}${movie.backdrop_path || movie.poster_path}`}
            alt={movie.name}
          />
        </div>
      </div>

      <div className="cast-details">
        <h1>Cast</h1>
        {credits.slice(0, 10).map((credit) => (
          <div className="row__cast">
            <div className="img__cast">
              <img
                // onClick={() => handleClick(movie)}
                className="img__actor"
                src={`${base_url}${credit.profile_path}`}
                alt={credit.name}
              />
            </div>
            <h1>{credit.name}</h1>
           
                        
          </div>
        ))}
      </div>
      <video className="video" 
      // autoplay="true"
      type="video/mp4"
      src="https://uppboom.com:2053/nenfmsbqxkju/Friendsgiving.2020.1080p.BluRay.MyCima.ME.mp4.html?Key=p-sXSW1NrBxAzkhHKw3SbQ&Expires=1631167159"></video>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
      <div className="details__fadeBottom"></div>
    </div>
  );
}

export default MovieDetail;
