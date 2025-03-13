import React from 'react'

function ApplyJobModal() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="relative p-4 w-full max-w-4xl h-auto bg-white rounded-lg shadow-lg m-5 overflow-y-scroll">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-xl font-semibold">Upload Attachment</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <RxCross2 size={20} />
          </button>
        </div>
     </div>
    </div>
  )
}

export default ApplyJobModal
