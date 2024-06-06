import type { NextApiRequest, NextApiResponse } from 'next';
import { connectMongoDB } from '@/libs/mongodb';
import Loan from '@/models/Loan';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectMongoDB();

  const { id } = req.query;

  if (req.method === 'PUT') {
    try {
      const updatedLoan = await Loan.findByIdAndUpdate(id, req.body, { new: true }).populate('book');
      if (!updatedLoan) {
        return res.status(404).json({ error: 'Loan not found' });
      }
      res.status(200).json(updatedLoan);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update loan' });
    }
  } else if (req.method === 'DELETE') {
    try {
      const deletedLoan = await Loan.findByIdAndDelete(id);
      if (!deletedLoan) {
        return res.status(404).json({ error: 'Loan not found' });
      }
      res.status(200).json({ message: 'Loan deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete loan' });
    }
  } else {
    res.setHeader('Allow', ['PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
