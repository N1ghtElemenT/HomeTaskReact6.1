import { useState } from "react";
import { API_URL } from "../constants/api";
import type { Book } from "../types/Book";
import "./BookCreate.css";

type Props = {
  onCreated: (book: Book) => void;
};

const BookCreate: React.FC<Props> = ({ onCreated }) => {
  const [form, setForm] = useState({
    title: "",
    author: "",
    ISBN: "",
    price: "",
    img: "",
    description: "",
    isExist: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      setForm((p) => ({ ...p, isExist: !p.isExist }));
    } else {
      setForm((p) => ({ ...p, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const price = Number(form.price);

    if (!form.title || !form.author || !form.ISBN || !form.price || !form.img || !form.description) {
      alert("Всі поля обовʼязкові");
      return;
    }

    if (isNaN(price) || price < 0) {
      alert("Ціна повинна бути числом і не меншою за 0");
      return;
    }

    const newBook: Book = {
      id: crypto.randomUUID(),
      title: form.title,
      author: form.author,
      ISBN: form.ISBN,
      price,
      img: form.img,
      description: form.description,
      isExist: form.isExist,
    };

    alert(`
        Нова книга:
        Назва: ${newBook.title}
        Автор: ${newBook.author}
        ISBN: ${newBook.ISBN}
        Ціна: ${newBook.price}
        В наявності: ${newBook.isExist ? "Так" : "Ні"}
    `);

    const res = await fetch(`${API_URL}/books`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newBook),
    });

    const saved = await res.json();
    onCreated(saved);

    setForm({
      title: "",
      author: "",
      ISBN: "",
      price: "",
      img: "",
      description: "",
      isExist: false,
    });
  };

  return (
    <div className="book-create">
      <form className="book-form" onSubmit={handleSubmit}>
        <h2>НОВА КНИГА</h2>

        <input
          name="title"
          placeholder="title *"
          value={form.title}
          onChange={handleChange}
        />

        <input
          name="author"
          placeholder="author *"
          value={form.author}
          onChange={handleChange}
        />

        <input
          name="ISBN"
          placeholder="ISBN *"
          value={form.ISBN}
          onChange={handleChange}
        />

        <input
          name="price"
          placeholder="price *"
          value={form.price}
          onChange={handleChange}
        />

        <input
          name="img"
          placeholder="image *"
          value={form.img}
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="description *"
          value={form.description}
          onChange={handleChange}
        />

        <label className="checkbox">
          <span>isExist</span>
          <input
            type="checkbox"
            checked={form.isExist}
            onChange={handleChange}
          />
        </label>

        <button type="submit">ЗБЕРЕГТИ</button>
      </form>
    </div>
  );
};

export default BookCreate;
