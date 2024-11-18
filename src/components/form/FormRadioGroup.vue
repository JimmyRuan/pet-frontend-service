<template>
  <div>
    <label v-if="label" :for="id" class="block text-gray-700 font-medium text-left mb-2">{{ label }}</label>
    <div v-for="option in options" :key="option.value" class="flex items-center space-x-2">
      <input
          type="radio"
          :name="name"
          :value="option.value"
          :checked="modelValue === option.value"
          @change="updateValue(option.value)"
          :class="['focus:ring-blue-500', customClass]"
      />
      <span class="text-gray-700">{{ option.label }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: false,
    },
    name: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: false,
    },
    options: {
      type: Array,
      required: true,
    },
    modelValue: {
      type: [String, Number],
      required: true,
    },
    customClass: {
      type: String,
      required: false,
      default: '',
    },
  },
  methods: {
    updateValue(value) {
      this.$emit('update:modelValue', value);
    },
  },
};
</script>

<style scoped>
/* Add additional styles if needed */
</style>
