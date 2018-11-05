import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Book from './Book';

class Shelf extends Component {
    render() {
        const { title, books, changeShelf } = this.props;
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{ title }</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {books.map(
                            book => <Book
                                key={book.id}
                                title={book.title}
                                url={book.url}
                                author={book.author}
                                changeShelf={e => changeShelf(e.target.value, book, title)}/>
                        )}
                    </ol>
                </div>
            </div>
        );
    }
}

Shelf.propTypes = {
    title: PropTypes.string.isRequired,
    books: PropTypes.array
};

export default Shelf;