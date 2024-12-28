import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addItemToCart } from '../store/CartSlice';
import { Link } from 'react-router-dom';
function StarIcon() {
    return (
        <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="gold"
            xmlns="http://www.w3.org/2000/svg"
            className="inline-block ml-1"
        >
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
    );
}

function BookOver() {
    const { bookId } = useParams();
    const [book, setBook] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchBookDetails = async () => {
            try {
                const response = await fetch(`https://project-rh6i.onrender.com/book/${bookId}`);
                if (!response.ok) throw new Error('Failed to fetch book details');
                const data = await response.json();
                setBook(data);
            } catch (error) {
                console.error('Error fetching book details:', error);
            }
        };

        fetchBookDetails();
    }, [bookId]);

    const handleAddToCart = () => {
        if (book) {
            dispatch(addItemToCart({
                id: book.id,
                title: book.title,
                price: book.price,
                image: book.image
            }));
        }
    };

    if (!book) return <div>Loading...</div>;

    return (
        <div className="container mx-auto p-6 max-w-2xl mt-20">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <img
                    src={book.image}
                    alt={book.title}
                    className="w-full h-64 object-contain"
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/bookimg/lion.jpg';
                    }}
                />
                <div className="p-6">
                    <div className="flex justify-between items-center mb-2">
                        <h1 className="text-3xl font-bold">{book.title}</h1>
                        <span className="text-xl font-semibold text-gray-700 flex items-center">
                            {book.rating}
                            <StarIcon />
                        </span>
                    </div>
                    <h2 className="text-xl font-semibold text-gray-700">by {book.author}</h2>
                    <p className="mt-4 text-gray-600">{book.description}</p>
                    <div className="mt-4 flex justify-between items-center">
                        <span className="text-lg font-bold">${book.price}</span>
                    </div>

                    <button
                        onClick={handleAddToCart}
                        className="px-4 mr-7 mt-5 py-2 bg-black text-white rounded hover:bg-gray-800 transition duration-300"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
}

export default BookOver;
