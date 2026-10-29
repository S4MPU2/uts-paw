import {useState} from "react";
import DaftarKartu from '../components/DaftarKartu.jsx'
import FilterKategori from '../components/FilterKategori.jsx'
import KotakPencarian from '../components/KotakPencarian.jsx'
import PesanKoleksi from '../components/PesanKoleksi.jsx'
import useKoleksi from '../hooks/useKoleksi.js'

export default function Koleksi() {
  const { items, loading, error } = useKoleksi()
  const [cari, setCari] = useState('')
  const [kategori, setKategori] = useState('Semua')

  if (loading) return <PesanKoleksi>Memuat data...</PesanKoleksi>
  if (error) return <PesanKoleksi role="alert">Gagal memuat: {error}</PesanKoleksi>

  const daftarKategori = ['Semua', ...new Set(items.map((item) => item.kategori))]
  const judulDicari = cari.toLowerCase()
  const tampil = items.filter(
    (item) =>
      item.judul.toLowerCase().includes(judulDicari) &&
      (kategori === 'Semua' || item.kategori === kategori),
  )

  return (
    <section>
      <h1>Koleksi Destinasi Wisata Lampung</h1>
      <h1>Koleksi   </h1>
      <p>Destinasi Wisata Lampung</p>
      <div className="alat-koleksi">
        <KotakPencarian nilai={cari} onUbah={setCari} />
        <FilterKategori kategori={kategori} daftarKategori={daftarKategori} onUbah={setKategori} />
      </div>
      {tampil.length === 0 ? (
        <PesanKoleksi>Tidak ada item yang cocok.</PesanKoleksi>
      ) : (
        <DaftarKartu items={tampil} />
      )}
    </section>
  )
}