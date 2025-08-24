import Link from 'next/link'
import React from 'react'
import Breadcrumb from '../components/Breadcrumb'

export default function page() {
  return (
    <div className='min-h-screen'>
      <Breadcrumb />
      I am dashboard.
      <Link href='/dashboard/add-product'>Add Product</Link>
    </div>
  )
}
