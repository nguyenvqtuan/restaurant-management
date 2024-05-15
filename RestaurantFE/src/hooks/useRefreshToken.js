import axios from "../assets/js/ApiClient"
import useAuth from './useAuth';

const useRefreshToken = () => {
    const {auth, setAuth } = useAuth();

    const refresh = async () => {
        const response = await axios.post('/refresh-token', {token: auth?.refreshToken}, {
            withCredentials: false
        });
        setAuth(prev => {
            console.log(JSON.stringify(prev));
            console.log(response.data.token);
            return { ...prev, token: response.data.token }
        });
        return response.data.token;
    }
    return refresh;
};

export default useRefreshToken;