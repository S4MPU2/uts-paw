import mahasiswa from "../../mahasiswa.json";

export default function Tentang() {
    return(
        <section>
            <h1>Tentang</h1>
            <p>Nama : {mahasiswa.nama}</p>
            <p>NIM : {mahasiswa.nim}</p>
            <p> kelas : {mahasiswa.kelas}</p>
            <p> Tema: {mahasiswa.tema}</p>
        </section>
    )
}