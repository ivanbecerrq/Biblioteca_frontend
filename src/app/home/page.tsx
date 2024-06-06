'use client'

import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function HomePage() {
  const router = useRouter()

  const handleLogout = () => {
    console.log('Cerrar Sesión')
    router.push('/') // Redireccionar al usuario a la página de inicio de sesión
  }

  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get('/api/books');
      console.log(response)
      if (Array.isArray(response.data.data)) {
        setBooks(response.data.data);
      } else {
        console.error('Books data is not an array:', response.data.data);
      }
    } catch (error) {
      console.error('Failed to fetch books', error);
    }
  };

  return (
    <main className="flex flex-col min-h-screen w-full bg-gray-900 text-white">
      <nav className="w-full bg-gray-800 shadow-md p-4 flex justify-between items-center">
        <div className="text-3xl font-extrabold font-serif">Atlas</div>
        <div className="flex space-x-4">
          <button
            onClick={() => router.push('/books')}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition duration-300"
          >
            Libros
          </button>
          <button
            onClick={() => router.push('/loans')}
            className="px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition duration-300"
          >
            Préstamos
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition duration-300"
          >
            Cerrar Sesión
          </button>
        </div>
      </nav>
      <section className="flex-grow w-full p-8 bg-gray-800">
        <h2 className="text-3xl font-bold text-white mb-4">Novedades</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {books.map(book => (
            <div key={book._id} className="bg-gray-700 rounded-lg shadow-lg p-4 hover:shadow-xl transition duration-300">
              <div className="flex flex-col items-start">
                <h3 className="text-xl font-semibold text-white">{book.title}</h3>
                <p className="text-gray-300">{book.genre}</p>
                <p className={book.available ? 'text-green-500' : 'text-red-500'}>
                  {book.available ? 'Disponible' : 'No disponible'}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
