import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import BookCard from "./components/BookCard";
import "./App.css";

function App() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (query) => {
    if (!query) return;
    setLoading(true);
    setError("");
    setBooks([]);

    try {
      const response = await fetch(
        `https://openlibrary.org/search.json?title=${encodeURIComponent(query)}`
      );
      // if (!response.ok) throw new Error("Failed to fetch books");
      const data = await response.json();
      if (!data.docs || data.docs.length === 0) {
        setError("No books found for your search.");
        setBooks([]);
      return;
      }

      setBooks(data.docs.slice(0, 12)); 
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <header>
        <h1>Book Finder</h1>
        <p>Search for books by title using Open Library API</p>
      </header>

      <SearchBar onSearch={handleSearch} />

      {loading && <p className="info">Loading books...</p>}
      {error && <p className="error">{error}</p>}

      <div className="book-grid">
        {books.map((book, index) => (
          <BookCard key={index} book={book} />
        ))}
      </div>
    </div>
  );
}

export default App;
