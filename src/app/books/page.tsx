'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import BookForm from './BookForm';
import styles from './books.module.scss';

interface Book {
  _id?: string; // Cambiado id a _id para alinearse con MongoDB
  title: string;
  author: string;
  publisher: string;
  isbn: string;
  genre: string;
  publicationYear: number;
  available: boolean;
  quantity: number;
}

const BooksPage = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [currentBook, setCurrentBook] = useState<Book | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get('/api/books');
      setBooks(response.data.data); // Asegúrate de que la estructura coincide con lo que devuelve tu API
    } catch (error) {
      console.error('Failed to fetch books', error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/api/books/${id}`);
      fetchBooks();
    } catch (error) {
      console.error('Failed to delete book', error);
    }
  };

  const handleEdit = (book: Book) => {
    setCurrentBook(book);
    setIsFormOpen(true);
  };

  const handleFormClose = () => {
    setCurrentBook(null);
    setIsFormOpen(false);
    fetchBooks();
  };

  return (
    <main className="flex flex-col min-h-screen w-full bg-gray-900 text-white">
      <div className="w-full bg-gray-800 shadow-md p-4 flex justify-between items-center">
        <h1 className="text-3xl font-bold">Libros</h1>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-600 transition duration-300"
          onClick={() => setIsFormOpen(true)}
        >
          Agregar Libro
        </button>
      </div>

      <div className="flex-grow w-full p-8 bg-gray-800">
        <table className="w-full bg-gray-700 rounded-lg shadow-lg overflow-hidden">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b border-gray-600">Título</th>
              <th className="py-2 px-4 border-b border-gray-600">Autor</th>
              <th className="py-2 px-4 border-b border-gray-600">Editorial</th>
              <th className="py-2 px-4 border-b border-gray-600">ISBN</th>
              <th className="py-2 px-4 border-b border-gray-600">Género</th>
              <th className="py-2 px-4 border-b border-gray-600">Año Publicación</th>
              <th className="py-2 px-4 border-b border-gray-600">Cantidad Disponible</th>
              <th className="py-2 px-4 border-b border-gray-600">Disponible</th>
              <th className="py-2 px-4 border-b border-gray-600">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(books) && books.map((book) => (
              <tr key={book._id} className="hover:bg-gray-600 transition duration-300">
                <td className="py-2 px-4 border-b border-gray-600">{book.title}</td>
                <td className="py-2 px-4 border-b border-gray-600">{book.author}</td>
                <td className="py-2 px-4 border-b border-gray-600">{book.publisher}</td>
                <td className="py-2 px-4 border-b border-gray-600">{book.isbn}</td>
                <td className="py-2 px-4 border-b border-gray-600">{book.genre}</td>
                <td className="py-2 px-4 border-b border-gray-600">{book.publicationYear}</td>
                <td className="py-2 px-4 border-b border-gray-600">{book.quantity}</td>
                <td className="py-2 px-4 border-b border-gray-600">
                  {book.available ? 'Sí' : 'No'}
                </td>
                <td className="py-2 px-4 border-b border-gray-600">
                  <button
                    className="bg-yellow-500 text-white py-1 px-3 rounded-lg hover:bg-yellow-600 transition duration-300 mr-2"
                    onClick={() => handleEdit(book)}
                  >
                    Editar
                  </button>
                  <button
                    className="bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-600 transition duration-300"
                    onClick={() => handleDelete(book._id!)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isFormOpen && (
        <BookForm book={currentBook} onClose={handleFormClose} />
      )}
    </main>
  );
};

export default BooksPage;
