import { useEffect, useState } from "react";
import { API_URL } from "../constants/api";
import type { Book } from "../types/Book";
import BookCard from "./BookCard";

const BookList: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch(`${API_URL}/books`)
      .then((res) => res.json())
      .then((data: Book[]) => {
        console.log("BOOKS FROM SERVER:", data);
        setBooks(data);
      })
      .catch((err) => {
        console.error("FETCH ERROR:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Завантаження...</p>;
  }

  return (
    <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
};

export default BookList;
