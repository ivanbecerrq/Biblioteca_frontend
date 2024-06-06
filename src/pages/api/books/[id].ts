import { NextApiRequest, NextApiResponse } from 'next';
import { connectMongoDB } from '@/libs/mongodb';
import Book from '@/models/Book';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectMongoDB();
  const { id } = req.query;
  console.log("test")
  if (req.method === 'GET') {
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    return res.status(200).json(book);
  }

  if (req.method === 'PUT') {
    const updatedBook = await Book.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedBook) {
      return res.status(404).json({ message: 'Book not found' });
    }
    return res.status(200).json({ message: 'Book updated successfully', book: updatedBook });
  }

  if (req.method === 'DELETE') {
    const deletedBook = await Book.findByIdAndDelete(id);
    if (!deletedBook) {
      return res.status(404).json({ message: 'Book not found' });
    }
    return res.status(200).json({ message: 'Book deleted successfully' });
  }

  return res.status(405).json({ message: 'Method not allowed' });
}
