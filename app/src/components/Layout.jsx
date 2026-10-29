import { NavLink, Outlet } from 'react-router-dom'

import './Layout.css';

const MENU = [
    {ke: '/', label: 'Beranda'},
    {ke: '/tentang', label: 'Tentang'},
    {ke: '/koleksi', label: 'Koleksi'},
    {ke: '/tambah', label: 'Tambah'},
    {ke: '/statistik', label: 'Statistik'},
];

export default function Layout() {
    return(
        <div className="kerangka">
            <header className="kepala">
                <strong> Destinasi Wisata Lampung</strong>
            <nav className="menu" aria-label="Navigasi Utama">
                {MENU.map(({ke, label})=>(
                    <NavLink key={ke} to={ke} end={ke === '/'}>
                        {label}
                    </NavLink>
                ))}
            </nav>
            </header>
            <main className="isi">
                <Outlet />
            </main>
            <footer className="kaki">Ujian Tengah Semester Pengembangan Aplikasi Web</footer>
        </div>
    
    )
}
