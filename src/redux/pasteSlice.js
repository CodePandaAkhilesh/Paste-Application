import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const storedPastes = localStorage.getItem("pastes");
// console.log("Stored pastes:", storedPastes); // Log the raw value

let initialPastes = [];
if (storedPastes) {
  try {
    initialPastes = JSON.parse(storedPastes);
  } catch (error) {
    console.error("Error parsing stored pastes:", error);
    console.error("Stored data might be corrupted:", storedPastes);
    // Optionally, clear the bad data
    localStorage.removeItem("pastes");
  }
}

const initialState = {
  pastes: initialPastes,
};

export const pasteSlice = createSlice({
  name: "paste",
  initialState,
  reducers: {
    addToPastes: (state, action) => {
      const paste = action.payload;
      state.pastes.push(paste);
      localStorage.setItem("pastes", JSON.stringify(state.pastes));
      toast("Paste Created Successfully");
    },

    updateToPastes: (state, action) => {
      const paste = action.payload
      const index = state.pastes.findIndex((item) => item._id === paste._id)

      if (index >= 0) {
        // If the course is found in the Pastes, update it
        state.pastes[index] = paste
        // Update to localstorage
        localStorage.setItem("pastes", JSON.stringify(state.pastes))
        // show toast
        toast.success("Paste updated")
      }
    },

    resetAllPastes: (state) => {
      state.pastes = []
      // Update to localstorage
      localStorage.removeItem("pastes")
    },

    removeFromPastes: (state, action) => {
      const pasteId = action.payload

      console.log(pasteId)
      const index = state.pastes.findIndex((item) => item._id === pasteId)

      if (index >= 0) {
        // If the course is found in the Pastes, remove it
        state.pastes.splice(index, 1)
        // Update to localstorage
        localStorage.setItem("pastes", JSON.stringify(state.pastes))
        // show toast
        toast.success("Paste deleted")
      }
    },
  },
});

export const { addToPastes, updateToPastes, resetAllPastes, removeFromPastes } = pasteSlice.actions;

export default pasteSlice.reducer;
