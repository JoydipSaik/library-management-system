import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [form, setForm] = useState({
    title: "",
    author: "",
    isbn: "",
    category: "",
    publicationYear: ""
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/books",
        {
          ...form,
          publicationYear: Number(form.publicationYear)
        }
      );

      setMessage(response.data.message);

      setForm({
        title: "",
        author: "",
        isbn: "",
        category: "",
        publicationYear: ""
      });

    } catch (error) {
      setMessage(
        error.response?.data?.message || "Something went wrong"
      );
    }
  };

  return (
    <div className="container">

      <h1>Library Book Management</h1>

      <form onSubmit={handleSubmit}>

        <input
          name="title"
          placeholder="Book Title"
          value={form.title}
          onChange={handleChange}
          required
        />

        <input
          name="author"
          placeholder="Author Name"
          value={form.author}
          onChange={handleChange}
          required
        />

        <input
          name="isbn"
          placeholder="ISBN"
          value={form.isbn}
          onChange={handleChange}
          required
        />

        <input
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="publicationYear"
          placeholder="Publication Year"
          value={form.publicationYear}
          onChange={handleChange}
          required
        />

        <button type="submit">
          Add Book
        </button>

      </form>

      {message && (
        <p className="message">{message}</p>
      )}

    </div>
  );
}

export default App;