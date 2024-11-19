<template>
  <div class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
    <div class="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
      <h2 class="text-xl font-bold mb-4">Pet Registration Response</h2>
      <table class="table-auto w-full border-collapse border border-gray-300">
        <thead>
        <tr>
          <th class="border border-gray-300 px-4 py-2 text-left">Field</th>
          <th class="border border-gray-300 px-4 py-2 text-left">Value</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(value, key) in filteredPetAttributes" :key="key">
          <td class="border border-gray-300 px-4 py-2 capitalize">{{ formatKey(key) }}</td>
          <td
              class="border border-gray-300 px-4 py-2"
              :class="key === 'dangerousAnimal' && value ? 'text-red-500 font-bold' : ''"
          >
            {{ formatValue(key, value) }}
          </td>
        </tr>
        </tbody>
      </table>
      <div class="flex justify-end mt-4">
        <button
            class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            @click="$emit('close')"
        >
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import {capitalizeFirstLetter} from "@/services/util";

export default {
  props: {
    response: {
      type: Object,
      required: true,
    },
  },
  computed: {
    filteredPetAttributes() {
      return this.filterResponse(this.response?.pet || {});
    },
  },
  methods: {
    formatValue(key, value) {
      if (key === "dateOfBirth") {
        // Format date to a more human-readable format
        return new Date(value).toLocaleDateString();
      }
      if (typeof value === "boolean") {
        return value ? "Yes" : "No";
      }
      return value;
    },
    formatKey(key){
      if(key === 'dangerousAnimal'){
        return 'Is Animal Dangerous?';
      } else if(key === 'dateOfBirth'){
        return 'Date of Birth';
      }

      return capitalizeFirstLetter(key);
    },
    filterResponse(fields) {
      return Object.fromEntries(
          Object.entries(fields || {}).filter(([key]) => key !== "id")
      );
    },
  },
};
</script>

<style scoped>
.text-red-500 {
  color: #ef4444;
}
.font-bold {
  font-weight: bold;
}
</style>
