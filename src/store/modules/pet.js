// src/store/modules/pet.js
import {getAllMonths} from "@/services/util";

const state = () => ({
    petTypes: ['Cat', 'Dog'],
    petTypeOptions: [
        { label: "Cat", value: "Cat" },
        { label: "Dog", value: "Dog" },
    ],
    breeds: {
        Cat: [
            'Persian',
            'Siamese',
            'Bengal',
            'Maine Coon',
            'Ragdoll',
            'Abyssinian',
            'Birman',
            'Russian Blue',
            'Scottish Fold',
            'Sphynx',
            'British Shorthair',
            'Oriental Shorthair',
            'Devon Rex',
            'Norwegian Forest Cat',
            'American Shorthair',
            'Egyptian Mau',
            'Savannah Cat',
            'Manx',
            'Himalayan',
            'Tonkinese',
        ],
        Dog: [
            'Pitbull',
            'Mastiff',
            'Golden Retriever',
            'Labrador Retriever',
            'German Shepherd',
            'Beagle',
            'Bulldog',
            'Poodle',
            'Rottweiler',
            'Boxer',
            'Siberian Husky',
            'Dachshund',
            'Great Dane',
            'Doberman Pinscher',
            'Shih Tzu',
            'Corgi',
            'Chihuahua',
            'Border Collie',
            'Australian Shepherd',
            'Akita',
        ],
    },
    dangerousBreeds: ['Pitbull', 'Mastiff', 'Rottweiler', 'Doberman Pinscher', 'Akita'],
    ageOptions: Array.from({ length: 20 }, (_, i) => i + 1),
    errors: {
        name: null,
        breed: null,
        dobErrors: null,
        ageOption: null,
        mixBreedDetails: null,
    },
    months: getAllMonths()
});

const getters = {
    getBreeds: (state) => (type) => {
        if (type) {
            return state.breeds[type] || [];
        }
        return [];
    },
};

const mutations = {
    setPetField(state, { field, value }) {
        state.pet[field] = value;

        if (field === 'type') {
            state.pet.breedOptions = state.breeds[value] || [];
            state.pet.breed = ''; // Reset breed when type changes
        }
    },
};

const actions = {
    updatePetField({ commit }, payload) {
        commit('setPetField', payload);
    },
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
};
