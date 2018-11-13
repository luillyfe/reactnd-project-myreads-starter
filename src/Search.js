import React, { Component } from "react";
import { debounce } from "throttle-debounce";
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import Book from "./Book";

export default class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            books: [],
            query: "",
        };
        this.searchThrottle = debounce(700, this.search);
    };

    /***
     * TODO: nice to have typeahead bevaviour.
     * */
    handleChangeQuery = (event) => {
        event.persist();
        this.setState({ query: event.target.value }, () => {
            this.searchThrottle(event);
        });
    };

    search = event => {
        event.preventDefault();
        if (this.state.query) {
            BooksAPI.search(this.state.query).then(books => {
                if (Array.isArray(books)) {
                    this.setState({ books });
                } else if (books) {
                    /**
                     * TODO: Show a message to user about their error.
                     * */
                    this.setState({ books: [] });
                    console.error(`${books ? books.error : "error undefined"}`);
                }
            });
        } else {
            this.setState({ books: [] });
        }
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