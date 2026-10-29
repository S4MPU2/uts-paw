import {Link} from "react-router-dom";
export default function TidakDitemukan() {
    return(
        <section>
            <h1>404</h1>
            <p>Halaman tidak ditemukan. Kembali ke <Link to="/">Beranda</Link>.</p>
        </section>
    )
}