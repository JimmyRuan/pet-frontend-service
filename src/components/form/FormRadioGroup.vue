<template>
  <div>
    <label class="block text-gray-700 font-medium text-left mb-2">{{ label }}</label>
    <div class="flex flex-wrap gap-4">
      <label
          v-for="option in options"
          :key="option.value"
          class="flex items-center space-x-2"
      >
        <input
            type="radio"
            :name="name"
            :value="option.value"
            v-model="modelValue"
        />
        <span>{{ option.label }}</span>
      </label>
    </div>
    <p v-if="error" class="text-red-500 text-sm mt-2">{{ error }}</p>
  </div>
</template>

<script>
export default {
  props: {
    label: { type: String, required: true },
    options: { type: Array, required: true },
    name: { type: String, required: true },
    modelValue: { type: String, default: "" },
    error: { type: String, default: "" },
  },
  emits: ["update:modelValue"],
};
</script>
