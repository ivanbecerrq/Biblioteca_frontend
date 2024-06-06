// /src/models/Book.ts
import mongoose, { Schema, Document } from 'mongoose'

interface IBook extends Document {
  title: string
  author: string
  publisher: string
  isbn: string
  genre: string
  publicationYear: number
  available: boolean
  quantity: number
}

const BookSchema: Schema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  publisher: { type: String, required: true },
  isbn: { type: String, required: true },
  genre: { type: String, required: true },
  publicationYear: { type: Number, required: true },
  available: { type: Boolean, required: true },
  quantity: { type: Number, required: true },
})

export default mongoose.models.Book || mongoose.model<IBook>('Book', BookSchema)
