export default {
    namespaced: true,
    state: {
        loading: false,
    },
    mutations: {
        SET_LOADING(state, status) {
            state.loading = status;
        },
    },
    actions: {
        showLoading({ commit }) {
            commit("SET_LOADING", true);
        },
        hideLoading({ commit }) {
            commit("SET_LOADING", false);
        },
    },
    getters: {
        isLoading: (state) => state.loading,
    },
};
