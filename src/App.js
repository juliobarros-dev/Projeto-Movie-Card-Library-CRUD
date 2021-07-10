import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import MovieList from './pages/MovieList';
import MovieDetails from './pages/MovieDetails';
import NewMovie from './pages/NewMovie';
import EditMovie from './pages/EditMovie';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <div>Movie Card Library CRUD</div>
      <Switch>
        <Route
          exact
          path="/"
          render={ (props) => <MovieList { ...props } /> }
        />
        <Route
          exact
          path="/movies/new"
          render={ (props) => <NewMovie { ...props } /> }
        />
        <Route
          exact
          path="/movies/:id"
          render={
            (props) => <MovieDetails { ...props } />
          }
        />
        <Route
          exact
          path="/movies/:id/edit"
          render={
            (props) => <EditMovie { ...props } />
          }
        />
        <Route><NotFound /></Route>
      </Switch>
    </Router>
  );
}

export default App;
