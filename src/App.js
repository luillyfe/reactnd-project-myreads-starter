import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';

import * as BooksAPI from './BooksAPI';
import './App.css';
import Shelf from './Shelf';
import Search from './Search';

class BooksApp extends Component {
    state = {
        shelfs: [{
            id: "Loading", title: "Loading", books: []
        }]
    };

    componentDidMount() {
        BooksAPI.getAll().then(books => {
            // TODO: Handle broken image.
            const shelfs = books.reduce((shelfs, book) => {
                const url = book.imageLinks ? book.imageLinks.smallThumbnail : "https://via.placeholder.com/128x193";
                const author = book.authors ? book.authors.join("") : "Missing authors info";
                const bookInfo = {
                    id: book.id,
                    title: book.title,
                    author,
                    url
                };
                if (shelfs[book.shelf]) {
                    shelfs[book.shelf].books.push(bookInfo);
                } else {
                    const books = [];
                    books.push(bookInfo);
                    shelfs[book.shelf] = {
                        id: book.shelf,
                        title: book.shelf,
                        books
                    };
                }
                return shelfs;
            }, []);
            this.setState({ shelfs });
        });
    }

    changeShelf = (newShelf, book, oldShelf) => {
        if (newShelf !== oldShelf) {
            this.setState(prevState => {
                const newState = {...prevState};
                if (oldShelf) {
                    const books = prevState.shelfs[oldShelf].books.filter(({id}) => id !== book.id);
                    newState.shelfs[oldShelf].books = books;
                }
                (newState.shelfs[newShelf] && newState.shelfs[newShelf].books.push(book));
                return newState;
            });
        }
    };

    render() {
        /* TODO: Improve performance, since each change on shelfs re-renders every Shelf
         * even if that shelf has no changed.
         */
        const shelfs = Object.values(this.state.shelfs);
        return (
            <div className="app">
                <Route exact path="/" render={() => (
                    <div className="list-books">
                        <div className="list-books-title">
                            <h1>MyReads</h1>
                        </div>
                        <div className="list-books-content">
                            <div>
                                {shelfs.map(
                                    shelf => <Shelf
                                        changeShelf={this.changeShelf}
                                        key={shelf.id}
                                        title={shelf.title}
                                        books={shelf.books}/>
                                )}
                            </div>
                        </div>
                        <div className="open-search">
                            <Link to="/search">Add a book</Link>
                        </div>
                    </div>
                )} />
                <Route exact path="/search" render={() => (
                    <Search changeShelf={this.changeShelf} />
                )} />
            </div>
        )
    }
}

export default BooksApp
