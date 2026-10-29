import {Link, useParams} from "react-router-dom";
import PesanKoleksi from "../components/PesanKoleksi.jsx";
import useKoleksi from "../hooks/useKoleksi.js";

export default function DetailKoleksi() {
    const { id } = useParams();
    const { items, loading, error } = useKoleksi();
   
    if (loading) return <PesanKoleksi>Memuat data..</PesanKoleksi>
    if (error) return <PesanKoleksi role="alert">Gagal memuat: {error}</PesanKoleksi>

    const item = items.find((tujuan) => String(tujuan.id) === id);

    if (!item) {
        return(
            <section>
                <h1>Destinasi tidak ditemukan</h1>
                <Link to="/koleksi">Kembali ke daftar koleksi</Link>
            </section>
        )
    }

    const harga = new Intl.NumberFormat('id-ID').format(item.hargaTiket);

    return (
        <section>
            <h1>{item.judul}</h1>
            <p>Kategori: {item.kategori}</p>
            <p>Kabupaten: {item.kabupaten}</p>
            <p>Harga Tiket: {harga}</p>
            <p>Jam Buka: {item.jamBuka}</p>
            <Link to="/koleksi">Kembali ke daftar koleksi</Link>
        </section>
    );
}
       


