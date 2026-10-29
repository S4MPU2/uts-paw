import KartuItem from './KartuItem.jsx'

export default function DaftarKartu({ items }) {
  return (
    <div className="daftar-kartu">
      {items.map((item) => (
        <KartuItem key={item.id} item={item} />
      ))}
    </div>
  )
}