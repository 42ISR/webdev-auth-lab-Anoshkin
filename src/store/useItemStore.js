import {create} from "zustand";
import { api } from "../api/api"

export const useMessageStore = create((set) => ({
    items: [],
    getItems: async (own = false) => {
        try {
            const res = own 
                ? await api.getMyItems() 
                : await api.getItems()
            set({ items: res.data})
        } catch (error) {
            console.error(error)
        }
    }
}))