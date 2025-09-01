import React from 'react'

export default function DeleteModal({handleDelete, setIsModalOpen}) {
  return (
    <div>
      <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-base-100 p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
            <h2 className="text-xl font-semibold mb-4">Confirm Delete</h2>
            <p className="mb-6">Are you sure you want to delete this product?</p>
            <div className="flex justify-center gap-4">
              <button
                className="btn btn-error"
                onClick={handleDelete}
              >
                Yes, Delete
              </button>
              <button
                className="btn btn-outline"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
    </div>
  )
}
