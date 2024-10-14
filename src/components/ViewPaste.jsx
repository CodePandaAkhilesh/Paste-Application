import React from 'react';
import { useSelector } from "react-redux"; 
import { useParams } from "react-router-dom";


const ViewPaste = () => {
  const { id } = useParams();
  const allPastes = useSelector((state) => state.paste.pastes);
  const paste = allPastes.find((p) => p._id === id);

  return (
    <div className="flex flex-col gap-7 p-4">
      {/* Box for Title */}
      <div className="border rounded-lg p-4 shadow-md">
        <input
          className="w-full p-1 text-lg font-bold bg-white border border-gray-300 rounded-md outline-none text-black"
          type="text"
          placeholder="Enter title here"
          value={paste.title}
          disabled
        />
      </div>

      {/* Box for Content */}
      <div className="border rounded-lg p-4 shadow-md">
        <textarea
          className="w-full p-4 bg-white border border-gray-300 rounded-md outline-none text-black"
          value={paste.content}
          placeholder="Enter content here"
          disabled
          rows={20}
        />
      </div>
    </div>
  );
}

export default ViewPaste;
