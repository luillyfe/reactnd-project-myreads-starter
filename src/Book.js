import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Book extends Component {
    state = {
        shelf: this.props.shelf
    };

    // TODO: Handle broken image.
    formatInfo({ imageLinks, authors, title }) {
        const url = imageLinks ? imageLinks.smallThumbnail : "https://via.placeholder.com/128x193";
        const authorsFormated = authors ? authors.join("") : "Missing authors info";
        return {
            title: title,
            authors: authorsFormated,
            url
        };
    };

    render() {
        const { shelf } = this.state;
        const { url, title, authors } = this.formatInfo(this.props);
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
                                    onChange={this.props.changeShelf}>
                                <option value="move" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                            </select>
                        </div>
                    </div>

                    <div className="book-title">{title}</div>
                    <div className="book-authors">{authors}</div>
                </div>
            </li>
        );
    }
}

Book.propTypes = {
    imageLinks: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    authors: PropTypes.array,
    changeShelf: PropTypes.func.isRequired
};

export default Book;