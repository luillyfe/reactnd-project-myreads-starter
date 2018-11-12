import React, { Component } from "react";
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import Book from "./Book";

export default class Search extends Component {
    state = {
        books: [],
        query: ""
    };

    handleChangeQuery = ({target}) => {
        this.setState({ query: target.value });
    };

    search = event => {
        event.preventDefault();
        BooksAPI.search(this.state.query).then(books => {
            /**
             * TODO: If data does not produce results, handle undefined.
             * **/
            books = books.map(book => {
                /*
                ** TODO: Refactor duplication of code
                * */
                const url = book.imageLinks ? book.imageLinks.smallThumbnail : "https://via.placeholder.com/128x193";
                const author = book.authors ? book.authors.join("") : "Missing authors info";
                const bookInfo = {
                    id: book.id,
                    title: book.title,
                    author,
                    url
                };
                return bookInfo;
            });
            this.setState({ books });
        });
    };

    render() {
        const { query, books } = this.state;
        return (
            <div className="search-books">
                <div className="search-books-bar">
                        <Link to="/" className="close-search">Close</Link>
                        <div className="search-books-input-wrapper">
                            <form onSubmit={this.search}>
                            <input type="text" value={query}
                                   onChange={this.handleChangeQuery}
                                   placeholder="Search by title or author"/>
                            </form>
                        </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {books.map(
                            book => <Book
                                key={book.id}
                                title={book.title}
                                url={book.url}
                                author={book.author}
                                changeShelf={() => {}}/>
                        )}
                    </ol>
                </div>
            </div>
        );
    }
};