import React from "react";
import "./App.css";
import Nav from "./Nav";
import requests from "./requests";
import Signin from "./Signin";
import Mylist from "./Mylist";
import Scraping from './Scraping-demo'
// import Details from "./Details";
import MovieDetail from "./MovieDetail";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Home";
import LoginScreen from "./HomeScreen/LoginScreen";

function App() {
  return (
    <div className="App">
      <Router>
        <LoginScreen />
     
        <Nav fetchUrl={requests.fetchSearch} />

        <Switch>
          <Route
            path="/details/:id"
            component={MovieDetail}
            fetchUrl={requests.fetchMovieDetails}
          />

          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/signin" exact component={Signin} />
          <Route path="/mylist" exact component={Mylist} />
          <Route path="/foobar" exact component={Scraping} />
        </Switch>
      </Router>
    </div>
  );
}

// const Home = () => (
//   <div>
//     <Banner />
//     <Row title="Trending Now" fetchUrl={requests.fetchTrending} isLargeRow />
//     <Row title="Up Coming" fetchUrl={requests.fetchUpcoming} />
//     <Row title="Tv Latest" fetchUrl={requests.fetchTvLatest} />
//     <Row title="TopRated" fetchUrl={requests.fetchActionMovies} />
//     <Row title="Action Movies" fetchUrl={requests.fetchTopRated} />
//   </div>
// );

export default App;
