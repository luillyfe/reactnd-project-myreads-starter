import React from 'react';
import PropTypes from 'prop-types';
import Book from './Book';

const Shelf  = props  => {
    const { title, books, changeShelf } = props;
    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{ title }</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {books.map(
                        book => <Book
                            shelf={book.shelf}
                            key={book.id}
                            title={book.title}
                            imageLinks={book.imageLinks}
                            authors={book.authors}
                            changeShelf={e => changeShelf(e.target.value, book)}/>
                    )}
                </ol>
            </div>
        </div>
    );
}

Shelf.propTypes = {
    title: PropTypes.string.isRequired,
    books: PropTypes.array
};

export default Shelf;