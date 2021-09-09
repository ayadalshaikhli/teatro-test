import React from "react";
import "./App.css";
import Row from "./Row";
import requests from "./requests";
import Banner from "./Banner";

function Home() {
  return (
    <div>
      <Banner />
      <Row title="Trending Now" fetchUrl={requests.fetchTrending} isLargeRow />
      <Row title="Up Coming" fetchUrl={requests.fetchUpcoming} />
      <Row title="Tv Latest" fetchUrl={requests.fetchTvLatest} />
      <Row title="TopRated" fetchUrl={requests.fetchActionMovies} />
      <Row title="Action Movies" fetchUrl={requests.fetchTopRated} />
    </div>
  );
}

export default Home;
