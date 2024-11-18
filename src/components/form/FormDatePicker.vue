<template>
  <div>
    <input
        type="date"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        class="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
    />
    <ul v-if="errors.length" class="text-red-500 text-sm mt-2">
      <li v-for="(error, index) in filteredErrors" :key="index">{{ error }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    modelValue: {
      type: String,
      required: true,
    },
    errors: {
      type: Array,
      default: () => [], // Ensure errors is always an array
    },
  },
  computed: {
    // filteredErrors() {
    //   return Array.isArray(this.errors) ? this.errors.filter((error) => error.someCondition) : [];
    // },
  },
};
</script>

