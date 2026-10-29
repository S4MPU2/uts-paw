import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useKoleksi from '../hooks/useKoleksi.js'
import './Tambah.css'

const AWAL = {
  judul: '',
  kategori: 'Alam',
  kabupaten: '',
  hargaTiket: '',
  jamBuka: '',
}

export default function Tambah() {
  const { tambah } = useKoleksi()
  const navigate = useNavigate()
  const [form, setForm] = useState(AWAL)
  const [galat, setGalat] = useState('')

  const ubah = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const simpan = (event) => {
    event.preventDefault()

    if (form.judul.trim().length < 3) {
      setGalat('Judul wajib diisi, minimal 3 karakter.')
      return
    }

    tambah({
      ...form,
      judul: form.judul.trim(),
      hargaTiket: Number(form.hargaTiket) || 0,
    })
    navigate('/koleksi')
  }

  return (
    <form className="formulir" onSubmit={simpan} noValidate>
      <h1>Tambah Destinasi</h1>
      

      <label htmlFor="judul">Judul</label>
      <input id="judul" name="judul" value={form.judul} onChange={ubah} />
      {galat && <p role="alert">{galat}</p>}

      <label htmlFor="kategori">Kategori</label>
      <select id="kategori" name="kategori" value={form.kategori} onChange={ubah}>
        <option value="Alam">Alam</option>
        <option value="Budaya">Budaya</option>
        <option value="Pantai">Pantai</option>
        <option value="Gunung">Gunung</option>
        <option value="Kuliner">Kuliner</option>
      </select>

      <label htmlFor="kabupaten">Kabupaten/Kota</label>
      <input id="kabupaten" name="kabupaten" value={form.kabupaten} onChange={ubah} />

      <label htmlFor="hargaTiket">Harga Tiket (Rp)</label>
      <input
        id="hargaTiket"
        name="hargaTiket"
        type="number"
        min="0"
        value={form.hargaTiket}
        onChange={ubah}
      />

      <label htmlFor="jamBuka">Jam Buka</label>
      <input
        id="jamBuka"
        name="jamBuka"
        placeholder="08.00-17.00"
        value={form.jamBuka}
        onChange={ubah}
      />

      <button type="submit">Simpan</button>
    </form>
  )
}