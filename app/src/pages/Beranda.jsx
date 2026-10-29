import { Link } from 'react-router-dom'
import useKoleksi from '../hooks/useKoleksi.js'
import mahasiswa from '../../mahasiswa.json'
import './Beranda.css'

export default function Beranda() {
  const { items, loading } = useKoleksi()
  const jumlahKategori = new Set(items.map((item) => item.kategori)).size

  return (
    <section id="ringkasan">
      <h1 id="judul-halaman">Daftar Tugas</h1>
      <p id="info-tema">Tema: {mahasiswa.tema}</p>
      {loading ? (
        <p id="status-tugas">Memuat ringkasan...</p>
      ) : (
        <p id="status-tugas">
          Ada {items.length} tugas dalam {jumlahKategori} kategori.
        </p>
      )}
      <Link to="/koleksi" id="tautan-koleksi">
        Lihat semua tugas
      </Link>
    </section>
  )
}