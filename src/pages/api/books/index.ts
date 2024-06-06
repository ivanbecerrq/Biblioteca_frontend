// /src/pages/api/books/index.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import {connectMongoDB} from '@/libs/mongodb';
import Book from '@/models/Book';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectMongoDB();

  try {
    switch (req.method) {
      case 'GET':
        const books = await Book.find({});
        return res.status(200).json({ success: true, data: books });

      case 'POST':
        const book = await Book.create(req.body);
        return res.status(201).json({ success: true, data: book });

      default:
        res.setHeader('Allow', ['GET', 'POST']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    return res.status(500).json({ success: false, error: 'Internal server error' });
  }
}
