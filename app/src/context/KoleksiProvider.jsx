import { useEffect, useState } from 'react'
import useLocalStorage from '../hooks/useLocalStorage.js'
import { KoleksiContext } from './koleksiContext.js'
export function KoleksiProvider({ children }) {
  const [items, setItems] = useLocalStorage('uts-paw-koleksi', null)
  const [loading, setLoading] = useState(items === null)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (items !== null) return

    async function muat() {

      try {
        const response = await fetch(`${import.meta.env.BASE_URL}data/koleksi.json`)
        if (!response.ok) {
          throw new Error(`Gagal memuat data (status ${response.status})`)
        }

        
        const data = await response.json()
        if (!Array.isArray(data)) {
          throw new Error('Data koleksi tidak valid.')
        }
        setItems(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    muat()
  }, [items, setItems])

  const tambah = (item) => setItems((lama) => [...(lama ?? []), { ...item, id: String(Date.now()) }])
  const hapus = (id) => setItems((lama) => (lama ?? []).filter((item) => String(item.id) !== String(id)))

  return (
    <KoleksiContext.Provider value={{ items: items ?? [], loading, error, tambah, hapus }}>
      {children}
    </KoleksiContext.Provider>
  )
}
