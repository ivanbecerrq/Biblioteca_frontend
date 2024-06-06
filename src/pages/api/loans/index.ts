import type { NextApiRequest, NextApiResponse } from 'next';
import { connectMongoDB } from '@/libs/mongodb';
import Loan from '@/models/Loan';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectMongoDB();

  if (req.method === 'GET') {
    try {
      const loans = await Loan.find().populate('book');
      res.status(200).json(loans);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch loans' });
    }
  } else if (req.method === 'POST') {
    try {
      const newLoan = new Loan(req.body);
      const savedLoan = await newLoan.save();
      res.status(201).json(savedLoan);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create loan' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
