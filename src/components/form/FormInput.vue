<template>
  <div>
    <label :for="id" class="block text-gray-700 font-medium text-left mb-2">{{ label }}</label>
    <input
        :id="id"
        :type="type"
        v-model="modelValue"
        :placeholder="placeholder"
        :class="['w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500', error ? 'border-red-500' : '']"
        @blur="onBlur"
    />
    <p v-if="error" class="text-red-500 text-sm mt-2">{{ error }}</p>
  </div>
</template>

<script>
export default {
  props: {
    id: { type: String, required: true },
    type: { type: String, default: "text" },
    label: { type: String, required: true },
    modelValue: { type: [String, Number], default: "" },
    placeholder: { type: String, default: "" },
    error: { type: String, default: "" },
  },
  emits: ["update:modelValue", "blur"],
  methods: {
    onBlur() {
      this.$emit("blur");
    },
  },
};
</script>
