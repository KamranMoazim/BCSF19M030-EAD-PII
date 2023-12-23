import { create } from "zustand";
import { LoginResponse } from "../../types/Auth";



interface AuthStore {
    user: LoginResponse | null;
    login: (loginResponse: LoginResponse) => void;
    logout: () => void;
}

const useAuthStore = create<AuthStore>((set) => ({
    // user: null,
    user: {
        token:"fsdf",
        user:{
            email:"",
            role:"ADMIN",
            id:1
        }
    },
    login: (loginResponse: LoginResponse) => set({ user: loginResponse }),
    logout: () => set({ user: null }),
}));

export default useAuthStore;
