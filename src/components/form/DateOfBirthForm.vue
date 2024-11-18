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
            min="1"
            :max="daysInMonth"
            placeholder="dd"
            class="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            @blur="validateDay"
            required
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
            :min="currentYear - 100"
            :max="currentYear"
            placeholder="yyyy"
            class="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            @blur="validateYear"
            required
        />
      </div>
    </div>
    <ul v-if="errors.length" class="text-red-500 text-sm mt-2">
      <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    dob: {
      type: Object,
      required: true,
    },
    months: {
      type: Array,
      required: true,
    },
    daysInMonth: {
      type: Number,
      required: true,
    },
    currentYear: {
      type: Number,
      required: true,
    },
    errors: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    updateDob(field, value) {
      this.$emit("update-dob", { field, value });
    },
    validateDay() {
      this.$emit("validate-day");
    },
    validateYear() {
      this.$emit("validate-year");
    },
  },
};
</script>
