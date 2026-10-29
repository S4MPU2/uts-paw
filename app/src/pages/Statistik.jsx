import useKoleksi from "../hooks/useKoleksi.js";
import PesanKoleksi from "../components/PesanKoleksi.jsx";
import './Statistik.css'
export default function Statistik() {
    const {items, loading, error} = useKoleksi()

    if (loading) return <PesanKoleksi> Memuat statistik</PesanKoleksi>
    if (error) return <PesanKoleksi role = "alert"> Gagal memuat; {error} </PesanKoleksi>
    const perKategori = items.reduce(
    (hitung, { kategori }) => ({
      ...hitung,
      [kategori]: (hitung[kategori] ?? 0) + 1,
    }),
    {},
  )

  return (
    <section>
      <h1>Statistik</h1>
     <div className="tabel-gulir">
        <table className="tabel-data">
          <thead>
            <tr>
              <th scope="col">Kategori</th>
              <th scope="col">Jumlah</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(perKategori).map(([kategori, jumlah]) => (
              <tr key={kategori}>
                <td>{kategori}</td>
                <td>{jumlah}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <th scope="row">Total</th>
              <td>{items.length}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </section>
  )
}