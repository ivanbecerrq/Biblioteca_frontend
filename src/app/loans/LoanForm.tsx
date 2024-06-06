'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './loans.module.scss';

interface Loan {
  id?: string;
  user: string;
  phone: string;
  book: string;
  loanDate: string;
  returnDate: string;
}

interface Book {
  _id: string;
  title: string;
}

interface LoanFormProps {
  loan: Loan | null;
  onClose: () => void;
}

const LoanForm: React.FC<LoanFormProps> = ({ loan, onClose }) => {
  const [formData, setFormData] = useState<Loan>({
    user: '',
    phone: '',
    book: '',
    loanDate: '',
    returnDate: '',
    ...loan,
  });
  console.log(formData);

  const [books, setBooks] = useState<Book[]>([]);

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (formData._id) {
        await axios.put(`/api/loans/${formData._id}`, formData);
      } else {
        await axios.post('/api/loans', formData);
      }
      onClose();
    } catch (error) {
      console.error('Failed to save loan', error);
    }
  };

  return (
    <div className={`${styles.modal} bg-white text-black p-6 rounded-lg`}>
      <div className={styles.modalContent}>
        <h2 className="text-xl mb-4">{loan ? 'Editar Préstamo' : 'Agregar Préstamo'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-4">
            <div className="mb-4">
              <label className="block">Usuario</label>
              <input
                type="text"
                name="user"
                value={formData.user}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-black border shadow-sm"
              />
            </div>
            <div className="mb-4">
              <label className="block">Teléfono</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-black border shadow-sm"
              />
            </div>
            <div className="mb-4">
              <label className="block">Libro</label>
              <select
                name="book"
                value={formData.book._id}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-black border shadow-sm"
              >
                <option value="">Seleccionar libro</option>
                {books.map((book) => (
                  <option key={book._id} value={book._id}>
                    {book.title}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block">Fecha de Préstamo</label>
              <input
                type="date"
                name="loanDate"
                value={formData.loanDate.split('T')[0]}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-black border shadow-sm"
              />
            </div>
            <div className="mb-4">
              <label className="block">Fecha de Devolución</label>
              <input
                type="date"
                name="returnDate"
                value={formData.returnDate.split('T')[0]}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-black border shadow-sm"
              />
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

export default LoanForm;
