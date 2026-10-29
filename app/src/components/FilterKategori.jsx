export default function FilterKategori({ kategori, daftarKategori, onUbah }) {
    return (
        <select aria-label="Kategori" value={kategori} onChange={(event) => onUbah(event.target.value)}
>
            {daftarKategori.map((namaKategori) => (
                <option key={namaKategori} value={namaKategori}>
                    {namaKategori}
                </option>
            ))}
        </select>
    );
}