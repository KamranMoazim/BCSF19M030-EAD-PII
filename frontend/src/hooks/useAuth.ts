import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { CACHE_KEY_LOGIN, CACHE_KEY_REGISTER } from "../constants/constants";
import AuthServiceCreator from "../services/auth-service"
import { LoginResponse, RegisterOrLoginOrCreate } from "../types/Auth";
import { Response } from "../types/General";




const useAuth = () => {

    const AuthService = AuthServiceCreator()

    const loginQuery = (loginData:RegisterOrLoginOrCreate) => AuthService.login(loginData)

    const registerQuery = (registerData:RegisterOrLoginOrCreate) => AuthService.register(registerData)


    return {
        loginQuery,
        registerQuery
    }
}




export default useAuth;