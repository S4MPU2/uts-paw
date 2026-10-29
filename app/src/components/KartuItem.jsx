import { Link } from 'react-router-dom'


export default function KartuItem({ item }) {
    const { id, judul, kategori, kabupaten, hargaTiket, jamBuka  } = item;
    const harga = new Intl.NumberFormat('id-ID').format(hargaTiket);

    return (
        <article className="kartu">
            <h2>
                <Link to={`/koleksi/${id}`}>{judul}</Link>
            </h2>
            <p>{kategori}</p>
            <p>{kabupaten}</p>
            <p>Harga Tiket: {harga}</p>
            <p>Jam Buka: {jamBuka}</p>
        </article>
    );
}