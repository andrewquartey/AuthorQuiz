import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import "./AddAuthorForm.css";

class AuthorForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      imageUrl: "",
      books: [],
      tempBook: ""
    };

    this.onFieldChange = this.onFieldChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAddBook = this.handleAddBook.bind(this);
  }

  onFieldChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state);
    this.props.onAddAuthor(this.state);
  }

  handleAddBook(event) {
    this.setState({
      tempBook: "",
      books: this.state.books.concat(this.state.tempBook)
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="AddAuthorForm__input">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.onFieldChange}
          ></input>
        </div>
        <div className="AddAuthorForm__input">
          <label htmlFor="name">Image URL</label>
          <input
            type="text"
            name="imageUrl"
            value={this.state.imageUrl}
            onChange={this.onFieldChange}
          />
        </div>
        <div className="AddAuthorForm__input">
          {this.state.books.map((book, i) => (
            <p key={i}>{book}</p>
          ))}
          <label htmlFor="book">Add Book</label>
          <input
            type="text"
            name="tempBook"
            value={this.state.tempBook}
            onChange={this.onFieldChange}
          />
          <input type="button" value="+" onClick={this.handleAddBook} />
        </div>
        <input type="submit" value="Add" />
      </form>
    );
  }
}

function AddAuthorForm({ match, onAddAuthor }) {
  return (
    <div className="AddAuthorForm">
      <h1>Add Author</h1>
      <AuthorForm onAddAuthor={onAddAuthor} />
    </div>
  );
}

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    onAddAuthor: author => {
      dispatch({ type: "ADD_AUTHOR", author });
      history.push("/");
    }
  };
};

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(AddAuthorForm)
);
