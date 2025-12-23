import type { Book } from "../types/Book";

type Props = {
  book: Book;
};

const BookCard: React.FC<Props> = ({ book }) => {
  return (
    <div style={{ border: "1px solid #ccc", padding: 16, width: 250 }}>
      <img
        src={book.img}
        alt={book.title}
        style={{ width: "100%", height: 200, objectFit: "cover" }}
      />

      <h3>{book.title}</h3>
      <p><strong>Автор:</strong> {book.author}</p>
      <p>{book.description}</p>
      <p><strong>Ціна:</strong> ${book.price}</p>

      <p style={{ color: book.isExist ? "green" : "red" }}>
        {book.isExist ? "В наявності" : "Немає в наявності"}
      </p>
    </div>
  );
};

export default BookCard;
