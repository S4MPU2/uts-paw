import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, beforeEach, expect, test, vi } from 'vitest'
import koleksi from '../public/data/koleksi.json'
import App from './App.jsx'

function bukaHalaman(path) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  )
}

beforeEach(() => {
  localStorage.clear()
  vi.stubGlobal(
    'fetch',
    vi.fn(async () => ({
      ok: true,
      json: async () => koleksi,
    })),
  )
})

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
  vi.unstubAllGlobals()
})

test('beranda menampilkan tema dan ringkasan koleksi', async () => {
  bukaHalaman('/')

  expect(screen.getByRole('heading', { name: 'Daftar Tugas' })).toBeInTheDocument()
  expect(await screen.findByText('Tema: Destinasi Wisata Lampung')).toBeInTheDocument()
  expect(await screen.findByText(/Ada 10 destinasi wisata dalam 2 kategori/)).toBeInTheDocument()
})

test('halaman koleksi menampilkan destinasi dari data awal', async () => {
  bukaHalaman('/koleksi')

  expect(await screen.findByText('Pantai Mutun')).toBeInTheDocument()
  expect(await screen.findByText('Gunung Rajabasa')).toBeInTheDocument()
})

test('pencarian menyaring destinasi berdasarkan judul', async () => {
  const user = userEvent.setup()
  bukaHalaman('/koleksi')
  await screen.findByText('Pantai Mutun')

  await user.type(screen.getByRole('searchbox', { name: 'Cari judul' }), 'Pantai Mutun')

  expect(screen.getByText('Pantai Mutun')).toBeInTheDocument()
  expect(screen.queryByText('Gunung Rajabasa')).not.toBeInTheDocument()
})

test('filter kategori menampilkan destinasi dengan kategori terpilih', async () => {
  const user = userEvent.setup()
  bukaHalaman('/koleksi')
  await screen.findByText('Pantai Mutun')

  await user.selectOptions(screen.getByRole('combobox', { name: 'Kategori' }), 'Budaya')

  expect(screen.getByText('Museum Lampung')).toBeInTheDocument()
  expect(screen.queryByText('Pantai Mutun')).not.toBeInTheDocument()
})

test('detail menampilkan data destinasi dan field temanya', async () => {
  bukaHalaman('/koleksi/1')

  expect(await screen.findByRole('heading', { name: 'Pantai Mutun' })).toBeInTheDocument()
  expect(screen.getByText('Pesawaran')).toBeInTheDocument()
  expect(screen.getByText('08.00-17.00')).toBeInTheDocument()
})

test('tombol hapus meminta konfirmasi dan menghapus destinasi', async () => {
  const user = userEvent.setup()
  vi.spyOn(window, 'confirm').mockReturnValue(true)
  bukaHalaman('/koleksi/1')
  await screen.findByRole('heading', { name: 'Pantai Mutun' })

  await user.click(screen.getByRole('button', { name: 'Hapus' }))

  expect(window.confirm).toHaveBeenCalled()
  expect(await screen.findByRole('searchbox', { name: 'Cari judul' })).toBeInTheDocument()
  expect(screen.queryByText('Pantai Mutun')).not.toBeInTheDocument()
})

test('form tambah menolak judul kosong dan menyimpan judul yang valid', async () => {
  const user = userEvent.setup()
  bukaHalaman('/tambah')

  await user.click(screen.getByRole('button', { name: 'Simpan' }))
  expect(await screen.findByRole('alert')).toHaveTextContent('Judul wajib diisi')

  await user.type(screen.getByLabelText('Judul'), 'Wisata Baru')
  await user.click(screen.getByRole('button', { name: 'Simpan' }))

  expect(await screen.findByText('Wisata Baru')).toBeInTheDocument()
})

test('rute tidak dikenal menampilkan 404 dan tautan kembali', () => {
  bukaHalaman('/tidak-ada')

  expect(screen.getByRole('heading', { name: '404' })).toBeInTheDocument()
  expect(screen.getByRole('link', { name: 'Kembali ke Beranda' })).toHaveAttribute('href', '/')
})
