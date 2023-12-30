import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "./SearchBar";
import "./FetchingData.css";

const FetchingData = () => {
  const [data, setData] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    fetchData(["harry potter", "sherlock holmes"]);
  }, []);

  const fetchData = async (queries) => {
    try {
      const requests = queries.map(query => axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}`));
      const responses = await Promise.all(requests);
      const searchData = responses.flatMap(response => response.data.items || []);
      setData(searchData);
      setSelectedBook(null); // Clear selected book when performing a new search
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

  const handleImageClick = (book) => {
    setSelectedBook(prevBook => (prevBook && prevBook.id === book.id) ? null : book);
  };

  const handleReadMore = (previewLink) => {
    window.open(previewLink, '_blank');
  };

  const handleSearch = (query) => {
    // Ensure the query is an array
    const queries = Array.isArray(query) ? query : [query];
    fetchData(queries);
  };

  return (
    <div>
      <div className="navbar">
        <SearchBar onSearch={handleSearch} />
      </div>

      <div className="topBooks">

        <div className="book1">
          <img src={require("../images/book1.png")} alt="heart" />
          
          <div className="book1Des">
            <h1>Title</h1>
            <p>Description - Loreum ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa elit lectus enim id euismod.</p>
            <button>Now Read!</button>
          </div>

        </div>

        <div className="book1">
          <img src={require("../images/book1.png")} alt="heart" />
          
          <div className="book1Des">
            <h1>Title</h1>
            <p>Description - Loreum ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa elit lectus enim id euismod.</p>
            <button>Now Read!</button>
          </div>

        </div>

        <div className="book1">
          <img src={require("../images/book1.png")} alt="heart" />
          
          <div className="book1Des">
            <h1>Title</h1>
            <p>Description - Loreum ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa elit lectus enim id euismod.</p>
            <button>Now Read!</button>
          </div>

        </div>

      </div>

      <h2 className="moreee">More Books</h2>

      <div className="FetchingData">
        {data.map((item) => (
          <div key={item.id} className="FetchingData-item">
            <img
              src={item.volumeInfo.imageLinks?.thumbnail}
              alt={item.volumeInfo.title}
              onClick={() => handleImageClick(item)}
            />
            {selectedBook && selectedBook.id === item.id && (
              <div className="FetchingData-details">
                <div className="titlenData">
                  <h2>{selectedBook.volumeInfo.title}</h2>
                  <p>Published On : {selectedBook.volumeInfo.publishedDate}</p>
                </div>
                <p className="author">{selectedBook.volumeInfo.authors[0]}</p>
                <p className="des">{selectedBook.volumeInfo.description}</p>
                <div className="ratingDiv">
                  <p>Avg Rating : {selectedBook.volumeInfo.averageRating}</p>
                  <p>Rating Count : {selectedBook.volumeInfo.ratingsCount}</p>
                  <p>Publisher : {selectedBook.volumeInfo.publisher}</p>
                  <p>Language : {selectedBook.volumeInfo.language}</p>
                </div>
                <div className="twoBtn">
                  <button onClick={() => handleReadMore(selectedBook.volumeInfo.previewLink)}>Now Read!</button>
                  <button onClick={() => handleReadMore(selectedBook.volumeInfo.infoLink)}>More Info!</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FetchingData;
