import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import Loading from '../components/Loading';
import * as movieAPI from '../services/movieAPI';

class MovieList extends Component {
  constructor() {
    super();

    this.state = {
      movies: [],
      loading: true,
    };
    this.changeStates = this.changeStates.bind(this);
    this.listRender = this.listRender.bind(this);
  }

  componentDidMount() {
    this.changeStates();
  }

  async changeStates() {
    const request = await movieAPI.getMovies();
    this.setState({
      movies: request,
      loading: false,
    });
  }

  listRender() {
    const { movies } = this.state;
    return movies.map((movie) => <MovieCard key={ movie.title } movie={ movie } />);
  }

  render() {
    const { loading } = this.state;

    return (
      <div data-testid="movie-list">
        <Link to="/movies/new">ADICIONAR CARTÃO</Link>
        { loading ? <Loading /> : this.listRender()}
      </div>
    );
  }
}

export default MovieList;
