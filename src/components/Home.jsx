import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { addToPastes, updateToPastes } from "../redux/pasteSlice"; 
import { useSearchParams } from "react-router-dom";

const Home = () => {
    const [title, setTitle] = useState(""); 
    const [value, setValue] = useState("");
    const [searchParams] = useSearchParams();
    const pasteId = searchParams.get("pasteId");
    const dispatch = useDispatch();
    const allPastes = useSelector((state) => state.paste.pastes);

    const [titleFocused, setTitleFocused] = useState(false);
    const [contentFocused, setContentFocused] = useState(false);

    useEffect(() => {
      if (pasteId) {
        const paste = allPastes.find((p) => p._id === pasteId);
        setTitle(paste.title);
        setValue(paste.content);
      }
    }, [pasteId]);

    function createPaste() {
        const paste = {
            title: title,
            content: value,
            _id: pasteId || Date.now().toString(36),
            createdAt: new Date().toISOString(),
        };

        if (pasteId) {
            dispatch(updateToPastes(paste));
        } else {
            dispatch(addToPastes(paste));
        }

        setTitle('');
        setValue('');
        setSearchParams({});
    }

    return (
        <div className="w-full h-full py-10 max-w-[1200px] mx-auto px-5 lg:px-0">
            <div className="flex flex-col gap-y-5 items-start">
                <div className="w-full flex flex-row gap-x-4 justify-between items-center">
                    <input
                        className={`${
                            titleFocused ? "border-blue-500" : "border-gray-400"
                        } ${pasteId ? "w-[80%]" : "w-[85%]"} text-black border rounded-md p-2 bg-white bg-gray-100`}
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        onFocus={() => setTitleFocused(true)}
                        onBlur={() => setTitleFocused(false)}
                    />

                    <button 
                        onClick={createPaste} 
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5">
                        {pasteId ? "Update My Paste" : "Create My Paste"}
                    </button>
                </div>
                <textarea
                    className={`rounded-2xl w-full h-full p-4 border ${contentFocused ? "border-blue-500" : "border-gray-400"} bg-white resize-none text-black bg-gray-50`}
                    value={value}
                    placeholder="Write Your Content Here..."
                    onChange={(e) => setValue(e.target.value)}
                    onFocus={() => setContentFocused(true)}
                    onBlur={() => setContentFocused(false)}
                    rows={20}
                />
            </div>  
        </div>
    )
}

export default Home;
