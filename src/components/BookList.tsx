import { useEffect, useState } from "react";
import { API_URL } from "../constants/api";
import type { Book } from "../types/Book";
import BookCard from "./BookCard";
import BookCreate from "./BookCreate";

const BookList: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/books`)
      .then((res) => res.json())
      .then((data: Book[]) => setBooks(data))
      .finally(() => setLoading(false));
  }, []);

  const handleCreated = (book: Book) => {
    setBooks((prev) => [...prev, book]);
  };

  if (loading) return <p>Завантаження...</p>;

  return (
    <>
      <BookCreate onCreated={handleCreated} />

      <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </>
  );
};

export default BookList;
