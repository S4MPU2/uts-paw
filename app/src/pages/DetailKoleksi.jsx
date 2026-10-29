import { Link, useNavigate, useParams } from 'react-router-dom'
import PesanKoleksi from '../components/PesanKoleksi.jsx'
import useKoleksi from '../hooks/useKoleksi.js'

export default function DetailKoleksi() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { items, loading, error, hapus } = useKoleksi()

  if (loading) return <PesanKoleksi>Memuat data...</PesanKoleksi>
  if (error) return <PesanKoleksi role="alert">Gagal memuat: {error}</PesanKoleksi>

  const item = items.find((tujuan) => String(tujuan.id) === id)

  if (!item) {
    return (
      <section>
        <h1>Destinasi tidak ditemukan</h1>
        <Link to="/koleksi">Kembali ke daftar koleksi</Link>
      </section>
    )
  }

  const harga = new Intl.NumberFormat('id-ID').format(item.hargaTiket)

  const konfirmasiHapus = () => {
    if (window.confirm(`Hapus "${item.judul}"?`)) {
      hapus(item.id)
      navigate('/koleksi')
    }
  }

  return (
    <section>
      <h1>{item.judul}</h1>
      <dl>
        <dt>Kategori</dt>
        <dd>{item.kategori}</dd>
        <dt>Kabupaten/Kota</dt>
        <dd>{item.kabupaten}</dd>
        <dt>Harga Tiket (Rp)</dt>
        <dd>{harga}</dd>
        <dt>Jam Buka</dt>
        <dd>{item.jamBuka}</dd>
      </dl>
      <div className="aksi">
        <button type="button" onClick={konfirmasiHapus}>
          Hapus
        </button>
        <Link to="/koleksi">Kembali ke daftar koleksi</Link>
      </div>
    </section>
  )
}
