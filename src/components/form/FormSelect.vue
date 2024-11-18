<template>
  <div>
    <label :for="id" class="block text-gray-700 font-medium text-left mb-2">{{ label }}</label>
    <select
        :id="id"
        v-model="modelValue"
        :class="['w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500', error ? 'border-red-500' : '']"
        @change="$emit('change')"
    >
      <option :value="null" disabled>Select {{ label }}</option>
      <option v-for="option in options" :key="option.value" :value="option.value">
        {{ option.label }}
      </option>
    </select>
    <p v-if="error" class="text-red-500 text-sm mt-2">{{ error }}</p>
  </div>
</template>

<script>
export default {
  props: {
    id: { type: String, required: true },
    label: { type: String, required: true },
    options: { type: Array, required: true },
    modelValue: { type: [String, Number, Object], default: null },
    error: { type: String, default: "" },
  },
  emits: ["update:modelValue", "change"],
};
</script>
