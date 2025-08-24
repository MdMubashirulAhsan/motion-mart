import Link from 'next/link'
import React from 'react'

export default function ProductCard({item}) {
  return (
    <div>
      <div className="card bg-base-100 w-96 shadow-sm">
  <figure>
    <img
      src={item.img}
      alt="Shoes" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{item.name}</h2>
    <p>{item.description}</p>
    <div className="card-actions justify-end">
      <Link href={`/products/${item.id}`}><button className="btn btn-primary">Details</button></Link>
    </div>
  </div>
</div>
    </div>
  )
}
