import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as movieAPI from '../services/movieAPI';
import { Loading } from '../components';

class MovieDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: {},
      loading: true,
    };
    this.displayDetails = this.displayDetails.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.changeStates();
  }

  async handleClick() {
    const { match: { params: { id } } } = this.props;
    await movieAPI.deleteMovie(id);
  }

  async changeStates() {
    const { match: { params: { id } } } = this.props;
    const request = await movieAPI.getMovie(id);
    this.setState({
      movies: request,
      loading: false,
    });
  }

  displayDetails() {
    const { movies } = this.state;
    const { title, storyline, imagePath, genre, rating, subtitle } = movies;
    const { match: { params: { id } } } = this.props;
    return (
      <div data-testid="movie-details">
        <img alt="Movie Cover" src={ `../${imagePath}` } />
        <p>{ `Title: ${title}` }</p>
        <p>{ `Subtitle: ${subtitle}` }</p>
        <p>{ `Storyline: ${storyline}` }</p>
        <p>{ `Genre: ${genre}` }</p>
        <p>{ `Rating: ${rating}` }</p>
        <button type="button">
          <Link to="/">VOLTAR</Link>
        </button>
        <button type="button">
          <Link to={ `/movies/${id}/edit` }>EDITAR</Link>
        </button>
        <button type="button" onClick={ this.handleClick }>
          <Link to="/">DELETAR</Link>
        </button>
      </div>
    );
  }

  render() {
    const { loading } = this.state;

    return (
      <div>
        { loading ? <Loading /> : this.displayDetails()}
      </div>
    );
  }
}

MovieDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default MovieDetails;
