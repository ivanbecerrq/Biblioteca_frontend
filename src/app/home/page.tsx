'use client'

import { useRouter } from 'next/navigation'
import styles from './styles.module.scss'

export default function HomePage() {
  const router = useRouter()

  const handleLogout = () => {
    console.log('Cerrar Sesión')
    router.push('/') // Redireccionar al usuario a la página de inicio de sesión
  }

  const books = [
    {
      id: 1,
      image: '/path/to/image1.jpg',
      title: 'A lo romano y Arrestado por alienígena',
      genre: 'Comic',
      available: true
    },
    {
      id: 2,
      image: '/path/to/image2.jpg',
      title: 'Ecofuturismo',
      genre: 'Cuentos SCI-FI',
      available: true
    },
    {
      id: 3,
      image: '/path/to/image3.jpg',
      title: 'Si des de casa veus un drac',
      genre: 'Comic',
      available: false
    },
    // Añadir más libros aquí...
  ]

  return (
    <main className={styles.main}>
      <nav className={styles.nav}>
        <div className={styles.buttonContainer}>
          <button
            onClick={() => router.push('/books')}
            className={`${styles.button} ${styles.booksButton}`}
          >
            Libros
          </button>
          <button
            onClick={() => router.push('/loans')}
            className={`${styles.button} ${styles.loansButton}`}
          >
            Préstamos
          </button>
          <button
            onClick={handleLogout}
            className={`${styles.button} ${styles.logoutButton}`}
          >
            Cerrar Sesión
          </button>
        </div>
      </nav>
      <section className={styles.newReleases}>
        <h2>Novedades</h2>
        <div className={styles.booksGrid}>
          {books.map(book => (
            <div key={book.id} className={styles.bookCard}>
              <img src={book.image} alt={book.title} className={styles.bookImage} />
              <div className={styles.bookDetails}>
                <h3 className={styles.bookTitle}>{book.title}</h3>
                <p className={styles.bookGenre}>{book.genre}</p>
                <p className={book.available ? styles.bookAvailable : styles.bookUnavailable}>
                  {book.available ? 'Disponible' : 'No disponible'}
                </p>
                <button className={styles.detailsButton}>Detalles</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
