import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import { KoleksiProvider } from './context/KoleksiProvider.jsx'
import Beranda from './pages/Beranda.jsx'
import Koleksi from './pages/Koleksi.jsx'
import Detail from './pages/DetailKoleksi.jsx'
import Tambah from './pages/Tambah.jsx'
import Statistik from './pages/Statistik.jsx'
import Tentang from './pages/Tentang.jsx'
import TidakDitemukan from './pages/TidakDitemukan.jsx'
// Titik awal ujian. Baca soal lengkap di https://uts-paw.mhabibalgifari.web.id/soal
// dan contoh setiap kode yang diminta di https://uts-paw.mhabibalgifari.web.id/contoh
// Rute wajib: /, /koleksi, /koleksi/:id, /tambah, /statistik, /tentang, dan *.
// Provider Context diletakkan di dalam komponen App ini.



export default function App() {
  return (
    <KoleksiProvider>
      <Routes>
        <Route element={<Layout />}>
        <Route path="/" element={<Beranda />} />
        <Route path="/koleksi" element={<Koleksi />} />
        <Route path="/koleksi/:id" element={<Detail />} />
        <Route path="/tambah" element={<Tambah />} />
        <Route path="/statistik" element={<Statistik />} />
        <Route path="/tentang" element={<Tentang />} />
        <Route path="*" element={<TidakDitemukan />} />
        </Route>
        </Routes>
    </KoleksiProvider>
  )
}
