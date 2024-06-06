'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import LoanForm from './LoanForm';

interface Loan {
  id?: string;
  user: string;
  phone: string;
  book: {
    id: string;
    title: string;
  }
  loanDate: string;
  returnDate: string;
}

const LoansPage = () => {
  const [loans, setLoans] = useState<Loan[]>([]);
  const [currentLoan, setCurrentLoan] = useState<Loan | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    fetchLoans();
  }, []);

  const fetchLoans = async () => {
    try {
      const response = await axios.get('/api/loans');
      setLoans(response.data);
    } catch (error) {
      console.error('Failed to fetch loans', error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/api/loans/${id}`);
      fetchLoans();
    } catch (error) {
      console.error('Failed to delete loan', error);
    }
  };

  const handleEdit = (loan: Loan) => {
    setCurrentLoan(loan);
    setIsFormOpen(true);
  };

  const handleFormClose = () => {
    setCurrentLoan(null);
    setIsFormOpen(false);
    fetchLoans();
  };

  return (
    <main className="flex flex-col min-h-screen w-full bg-gray-900 text-white">
      <div className="w-full bg-gray-800 shadow-md p-4 flex justify-between items-center">
        <h1 className="text-3xl font-bold">Préstamos</h1>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-600 transition duration-300"
          onClick={() => setIsFormOpen(true)}
        >
          Agregar Préstamo
        </button>
      </div>

      <div className="flex-grow w-full p-8 bg-gray-800">
        <table className="w-full bg-gray-700 rounded-lg shadow-lg overflow-hidden">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b border-gray-600">Usuario</th>
              <th className="py-2 px-4 border-b border-gray-600">Teléfono</th>
              <th className="py-2 px-4 border-b border-gray-600">Libro</th>
              <th className="py-2 px-4 border-b border-gray-600">Fecha de Préstamo</th>
              <th className="py-2 px-4 border-b border-gray-600">Fecha de Devolución</th>
              <th className="py-2 px-4 border-b border-gray-600">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {loans.map((loan) => (
              <tr key={loan.id} className="hover:bg-gray-600 transition duration-300">
                <td className="py-2 px-4 border-b border-gray-600">{loan.user}</td>
                <td className="py-2 px-4 border-b border-gray-600">{loan.phone}</td>
                <td className="py-2 px-4 border-b border-gray-600">{loan.book.title}</td>
                <td className="py-2 px-4 border-b border-gray-600">{loan.loanDate}</td>
                <td className="py-2 px-4 border-b border-gray-600">{loan.returnDate}</td>
                <td className="py-2 px-4 border-b border-gray-600">
                  <button
                    className="bg-yellow-500 text-white py-1 px-3 rounded-lg hover:bg-yellow-600 transition duration-300 mr-2"
                    onClick={() => handleEdit(loan)}
                  >
                    Editar
                  </button>
                  <button
                    className="bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-600 transition duration-300"
                    onClick={() => handleDelete(loan.id!)}
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
        <LoanForm loan={currentLoan} onClose={handleFormClose} />
      )}
    </main>
  );
};

export default LoansPage;
