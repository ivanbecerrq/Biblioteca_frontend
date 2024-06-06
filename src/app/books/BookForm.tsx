'use client';

import { useState } from 'react';
import axios from 'axios';
import styles from './books.module.scss';

interface Book {
  _id?: string;
  title: string;
  author: string;
  publisher: string;
  isbn: string;
  genre: string;
  publicationYear: number;
  available: boolean;
  quantity: number;
}

interface BookFormProps {
  book: Book | null;
  onClose: () => void;
}

const BookForm: React.FC<BookFormProps> = ({ book, onClose }) => {
  const [formData, setFormData] = useState<Book>({
    title: '',
    author: '',
    publisher: '',
    isbn: '',
    genre: '',
    publicationYear: 0,
    available: true,
    quantity: 1,
    ...book,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'available' ? e.target.checked : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (formData._id) {
        await axios.put(`/api/books/${formData._id}`, formData);
      } else {
        await axios.post('/api/books', formData);
      }
      onClose();
    } catch (error) {
      console.error('Failed to save book', error);
    }
  };

  return (
    <div className={`${styles.modal} bg-white text-black p-6 rounded-lg`}>
      <div className={styles.modalContent}>
        <h2 className="text-xl mb-4">{book ? 'Editar Libro' : 'Agregar Libro'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block">Título</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-black border shadow-sm"
                />
              </div>
              <div>
                <label className="block">Autor</label>
                <input
                  type="text"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-black border shadow-sm"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block">Editorial</label>
                <input
                  type="text"
                  name="publisher"
                  value={formData.publisher}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-black border shadow-sm"
                />
              </div>
              <div>
                <label className="block">ISBN</label>
                <input
                  type="text"
                  name="isbn"
                  value={formData.isbn}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-black border shadow-sm"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block">Género</label>
                <input
                  type="text"
                  name="genre"
                  value={formData.genre}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-black border shadow-sm"
                />
              </div>
              <div>
                <label className="block">Año de Publicación</label>
                <input
                  type="number"
                  name="publicationYear"
                  value={formData.publicationYear}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-black border shadow-sm"
                />
              </div>
            </div>
            <div>
              <label className="block">Cantidad</label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-black border shadow-sm"
              />
            </div>
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                name="available"
                checked={formData.available}
                onChange={handleChange}
                className="mr-2 rounded border-black border shadow-sm"
              />
              <label className="block">Disponible</label>
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                className="mr-4 bg-gray-200 text-black py-2 px-4 rounded hover:bg-gray-300"
                onClick={onClose}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
              >
                Guardar
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookForm;
