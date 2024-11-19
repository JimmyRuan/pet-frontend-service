<template>
  <div class="mb-4">
    <label class="block text-gray-700 font-medium text-left mb-2">Date of Birth</label>
    <div class="flex space-x-4">
      <!-- Month Dropdown -->
      <div class="w-1/3">
        <label for="month" class="block text-gray-700 text-sm font-medium mb-1">Month</label>
        <select
            id="month"
            :value="dob.month"
            @change="updateDob('month', $event.target.value)"
            class="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            required
        >
          <option value="" disabled>Select</option>
          <option v-for="(month, index) in months" :key="index" :value="index + 1">
            {{ month }}
          </option>
        </select>
      </div>

      <!-- Day Input -->
      <div class="w-1/3">
        <label for="day" class="block text-gray-700 text-sm font-medium mb-1">Day</label>
        <input
            id="day"
            :value="dob.day"
            @input="updateDob('day', $event.target.value)"
            type="number"

            placeholder="dd"
            class="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            required
            :min="1"
            :max="31"
        />
      </div>

      <!-- Year Input -->
      <div class="w-1/3">
        <label for="year" class="block text-gray-700 text-sm font-medium mb-1">Year</label>
        <input
            id="year"
            :value="dob.year"
            @input="updateDob('year', $event.target.value)"
            type="number"
            placeholder="yyyy"
            class="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            required
            :min="calculateYearsAgo(100)"
            :max="currentYear"
        />
      </div>
    </div>

    <ErrorList :errors="errors" />
  </div>
</template>

<script>
import useErrors from "@/mixins/useErrors";
import ErrorList from "@/components/form/ErrorList.vue";
import {getAllMonths} from "@/services/util";
import moment from "moment";

export default {
  components: {ErrorList},
  mixins: [useErrors],
  props: {
    dob: {
      type: Object,
      required: true,
    },
  },
  computed: {
    currentYear() {
      return new Date().getFullYear(); // Dynamically compute the current year
    },
    months() {
      return getAllMonths();
    },
  },
  methods: {
    updateDob(field, value) {
      this.$emit("update-dob", { field, value });
    },
    calculateYearsAgo(yearsAgo) {
      if (typeof yearsAgo !== 'number' || yearsAgo < 0) {
        throw new Error("Invalid input: 'yearsAgo' must be a non-negative number.");
      }
      return moment().subtract(yearsAgo, 'years').year();
    },
  },
};
</script>
