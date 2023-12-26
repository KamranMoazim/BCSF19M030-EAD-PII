import { create } from "zustand";
import { LoginResponse } from "../../types/Auth";

// const storedUser = JSON.parse(localStorage.getItem("user")??"null");


interface AuthStore {
    user: LoginResponse | null;
    login: (loginResponse: LoginResponse) => void;
    logout: () => void;
}

const useAuthStore = create<AuthStore>((set) => ({
    // user: storedUser !== null ? storedUser : undefined,
    user: JSON.parse(localStorage.getItem("user")??"null") || undefined,
    // user: {
    //     token:"long token ------------------------------- ",
    //     user:{
    //         email:"kamrannaseer765@gmail.com",
    //         role:"ADMIN",
    //         id:1
    //     }
    // },
    // login: (loginResponse: LoginResponse) => set({ user: loginResponse }),
    login: (loginResponse) => {
        set({ user: loginResponse });
        localStorage.setItem("user", JSON.stringify(loginResponse));
    },
    // logout: () => set({ user: null }),
    logout: () => {
        set({ user: undefined });
        localStorage.removeItem("user");
    },
}));

export default useAuthStore;
