import {useState, useEffect} from 'react'

export default function useKoleksi() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function ambilKoleksi() {
        try {
            const response = await fetch('${import.meta.evv.BASE_URL}data/koleksi.json')
            if (!response.ok) {
                throw new Error('Data deestinasi gagal dimuat.')
            
            }

            const data = await response.json()
            setItems(Array.isArray(data) ? data : [])
        }catch{
            setError('Data destinasi gagal dimuat.')
        }finally{
            setLoading(false)
        }
    }

    ambilKoleksi()
  }, [])

  return { items, loading }
}