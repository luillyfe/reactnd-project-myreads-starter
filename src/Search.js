import React, { Component } from "react";
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import Book from "./Book";
import {update} from "./BooksAPI";

export default class Search extends Component {
    state = {
        books: [],
        query: ""
    };

    /***
     * TODO: nice to have typeahead bevaviour.
     * */
    handleChangeQuery = ({target}) => {
        this.setState({ query: target.value });
    };

    search = event => {
        event.preventDefault();
        BooksAPI.search(this.state.query).then(books => {
            /**
             * TODO: If data does not produce results, handle undefined.
             * **/
            this.setState({ books });
        });
    };

    /**
     * TODO: When a book is added is should send a notification back to the user
     * */
    changeShelf = (event, book) => {
        const newShelf = event.target.value;
        this.setState(prevState => {
            const books = prevState.books.filter(({id}) => id !== book.id);
            return { books };
        }, () => {
            this.props.changeShelf(newShelf, book);
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
                            book => {
                                book = this.props.updateShelfInfo(book);
                                return <Book
                                    key={book.id}
                                    shelf={book.shelf}
                                    title={book.title}
                                    imageLinks={book.imageLinks}
                                    authors={book.authors}
                                    changeShelf={e => this.changeShelf(e, book)}/>
                            }
                        )}
                    </ol>
                </div>
            </div>
        );
    }
};