import React, { useState, useEffect } from "react";
import Cards from "./cards";
import axios from "axios";
import { Link } from "react-router-dom";

function Books({ searchTerm }) {
  const [book, setBook] = useState([]);
  useEffect(() => {
    const getBook = async () => {
      try {
        const res = await axios.get("https://project-1l2d.onrender.com/book");
        console.log(res.data);
        setBook(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getBook();
  }, []);
  console.log("books before search", book);
  const filteredBooks = book.filter(
    (book) => book.title.toLowerCase().includes(searchTerm.toLowerCase()) // Case-insensitive match
  );
  console.log("books before search", filteredBooks);

  return (
    <div className="max-w-screen-2xl container mx-auto my-[68.5px] md:px-22 px-4">
      <div className="items-center justify-center text-center">
        <h1 className="text-2xl md:text-4xl">
          We are delighted to have you{" "}
          <span className="text-blue-400">Here :)</span>
        </h1>
        <p className="mt-12">Find Books of your interest here</p>
        <Link to="/">
          <button className="mt-6 bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-700 duration 300ms">
            Back
          </button>
        </Link>
      </div>
      <div className="mt-12 grid grid-cols-1 md:grid-cols-4">
        {filteredBooks.map((item) => (
          <Cards key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

export default Books;