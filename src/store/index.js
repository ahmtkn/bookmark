import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate'
import SecureLS from "secure-ls";
const ls = new SecureLS({ isCompression: false });
export default createStore({
    state: {
        user: null,
        saltKey: "bookmark123456?"
    },
    getters: {
        _isAuthenticated: state => state.user != null,
        _getCurrentUser(state){
            const user = state.user;
            delete user.password;
            return user;
        },
        _saltKey: state => state.saltKey
    },
    mutations: {
        setUser(state, user) {
            state.user = user;
        },
        logout(state){
            state.user = null;
        }
    },
    plugins: [createPersistedState({
        storage: {
            getItem: key => ls.get(key),
            setItem: (key, value) => ls.set(key,value),
            removeItem: key => ls.remove(key)
        }
    })]
})