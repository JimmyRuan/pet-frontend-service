// src/store/index.js
import { createStore } from 'vuex';
import pet from './modules/pet';
import loader from "@/store/modules/loader";

export default createStore({
    modules: {
        pet,
        loader
    },
});
