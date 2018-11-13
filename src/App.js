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
            const shelfs = books.reduce((shelfs, book) => {
                if (shelfs[book.shelf]) {
                    shelfs[book.shelf].books.push(book);
                } else {
                    const books = [];
                    books.push(book);
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

    changeShelf = (newShelf, book) => {
        if (newShelf !== book.shelf) {
            BooksAPI.update(book, newShelf).then(() => {
                this.setState(prevState => {
                    const newState = {...prevState};
                    if (prevState.shelfs[book.shelf]) {
                        const books = prevState.shelfs[book.shelf].books.filter(({id}) => id !== book.id);
                        newState.shelfs[book.shelf].books = books;
                    }

                    book.shelf = newShelf;
                    (newState.shelfs[newShelf] && newState.shelfs[newShelf].books.push(book));
                    return newState;
                });
            });
        }
    };

    updateShelfInfo = book => {
        for (const shelf in this.state.shelfs) {
            const bookInLibrary = this.state.shelfs[shelf].books.find(b => b.id === book.id);
            if (bookInLibrary) {
                return bookInLibrary;
            }
        }
        return book;
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
                    <Search updateShelfInfo={this.updateShelfInfo}
                        changeShelf={this.changeShelf} />
                )} />
            </div>
        )
    }
}

export default BooksApp
