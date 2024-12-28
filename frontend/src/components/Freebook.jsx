import React, { useState, useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Cards from "./cards";
import axios from "axios";

function Freebook() {
  const [books, setBooks] = useState([]);  // Store all books
  const [filteredBooks, setFilteredBooks] = useState([]);  // Store filtered books
  const [selectGenre, setSelectGenre] = useState("Fantasy");  // Default genre

  // Fetch all books once when the component mounts
  useEffect(() => {
    const getBooks = async () => {
      try {
        const res = await axios.get("https://project-1l2d.onrender.com/book");
        setBooks(res.data);  // Store all books
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };
    getBooks();
  }, []);

  // Filter books based on the selected genre
  useEffect(() => {
    const filtered = books.filter((book) => book.genre === selectGenre);
    setFilteredBooks(filtered);
  }, [selectGenre, books]);  // Runs whenever `selectGenre` or `books` change

  return (
    <>
      <div className="flex items-center flex-col text-center">
        <hr className="w-full mb-4" />
        <h1 className="font-bold text-4xl mb-2">
          YOU CAN FIND YOUR FAVOURITE BOOKS HERE
        </h1>
        <hr className="w-full mt-4" />
      </div>

      <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 my-9">
        <div>
          <h1 className="font-bold text-xl pb-2">Categories</h1>
          <br />
          <div className="flex justify-evenly flex-wrap gap-2">
            {["Classic", "Fiction", "Programming", "Children", "Nonfiction", "Thriller", "Others"].map((genre) => (
              <div
                key={genre}
                className="border-[2px] px-4 py-2 cursor-pointer hover:bg-gray-300"
                onClick={() => setSelectGenre(genre)}
              >
                {genre}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 grid sm:grid-cols-1 md:grid-cols-3">
          {filteredBooks.length > 0 ? (
            filteredBooks.map((item) => <Cards item={item} key={item.id} />)
          ) : (
            <div className="text-center text-lg font-semibold mt-4">
              No books found for the selected category.
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Freebook;
