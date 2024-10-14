import React, { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { removeFromPastes } from '../redux/pasteSlice';
import { Toaster, toast } from 'react-hot-toast';


const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPastes = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleDelete(pasteId) {
    dispatch(removeFromPastes(pasteId));
  }

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div>
      <input
        type="search"
        placeholder="Search paste here..."
        className="p-2 rounded-2xl min-w-[1210px] mt-5 bg-white border border-gray-400 text-black"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className='border rounded-lg p-4 mt-5 bg-[your-body-bg-color]'> 
        <h1 className="text-2xl font-bold mb-4 text-black">All Pastes</h1> 
        <div className='flex flex-col gap-5'>
          {filteredPastes.length > 0 && 
            filteredPastes.map((paste) => {
              return (
                <div key={paste._id} className='border rounded-lg p-4 flex justify-between items-start text-black bg-white'>
                  <div className='flex flex-col w-1/2'> 
                    <div className='font-bold text-lg'>{paste.title}</div> 
                    <div className='text-base'>{paste.content}</div>
                    <div className='text-sm text-gray-500'>{formatDate(paste.createdAt)}</div>
                  </div>
                  <div className='flex flex-row gap-4 w-1/2 justify-end'> 
                    <button className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
                      <a href={`/?pasteId=${paste._id}`} className="text-white">Edit</a>
                    </button>
                    <button className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
                      <a href={`/pastes/${paste._id}`} className="text-white">View</a>
                    </button>
                    <button className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700" onClick={() => handleDelete(paste._id)}>
                      Delete
                    </button>
                    <button className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700" onClick={() => {
                      navigator.clipboard.writeText(paste.content);
                      toast.success("Copied to clipboard");
                    }}>
                      Copy
                    </button>
                    <button className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700">Share</button>
                  </div>
                </div>
              );
            })
          }
        </div>
      </div>
    </div>
  );
};

export default Paste;
