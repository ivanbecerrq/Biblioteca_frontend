import mongoose, { Schema, Document } from 'mongoose';

interface ILoan extends Document {
  user: string;
  phone: string;
  book: Schema.Types.ObjectId;
  loanDate: Date;
  returnDate: Date;
}

const LoanSchema: Schema = new Schema({
  user: { type: String, required: true },
  phone: { type: String, required: true },
  book: { type: Schema.Types.ObjectId, ref: 'Book', required: true },
  loanDate: { type: Date, required: true },
  returnDate: { type: Date, required: true },
});

const Loan = mongoose.models.Loan || mongoose.model<ILoan>('Loan', LoanSchema);

export default Loan;
