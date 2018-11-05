import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Shelf from "./Shelf";

class BooksApp extends React.Component {
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
                const bookInfo = {
                    id: book.id,
                    title: book.title,
                    author: book.authors.join(""),
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
        this.setState(prevState => {
            const newState = prevState;
            const books = prevState.shelfs[oldShelf].books.filter(({id}) => id !== book.id);
            newState.shelfs[oldShelf].books = books;
            (newState.shelfs[newShelf] && newState.shelfs[newShelf].books.push(book));
            return newState;
        });
    };

    render() {
        /* TODO: Improve performance, since each change on shelfs re-renders every Shelf
         * even if that shelf has no changed.
         */
        const shelfs = Object.values(this.state.shelfs);
        return (
            <div className="app">
                <div className="list-books">
                    <div className="list-books-title">
                        <h1>MyReads</h1>
                    </div>
                    <div className="list-books-content">
                        <div>
                            {shelfs.map(shelf => {
                                return <Shelf
                                    changeShelf={this.changeShelf}
                                    key={shelf.id}
                                    title={shelf.title}
                                    books={shelf.books}/>
                            })}
                        </div>
                    </div>
                    <div className="open-search">
                        <a onClick={() => this.setState({showSearchPage: true})}>Add a book</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default BooksApp
