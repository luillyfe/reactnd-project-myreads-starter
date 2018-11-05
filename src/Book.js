import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Book extends Component {
    state = {
        shelf: "move"
    };

    render() {
        const { url, title, author, changeShelf } = this.props;
        const { shelf } = this.state;
        return (
            <li>
                <div className="book">
                    <div className="book-cover"
                         style={{
                             width: 128,
                             height: 193,
                             backgroundImage: `url(${url})` }}>
                        <div className="book-shelf-changer">
                            <select value={shelf}
                                    onChange={changeShelf}>
                                <option value="move" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                            </select>
                        </div>
                    </div>

                    <div className="book-title">{title}</div>
                    <div className="book-authors">{author}</div>
                </div>
            </li>
        );
    }
}

Book.propTypes = {
    url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    changeShelf: PropTypes.func.isRequired
};

export default Book;