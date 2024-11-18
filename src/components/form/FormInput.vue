<template>
  <div>
    <input
        :id="id"
        :type="type"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        :placeholder="placeholder"
        :class="['w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500', error ? 'border-red-500' : '']"
    />
  </div>
</template>

<script>
export default {
  props: {
    modelValue: {
      type: String,
      required: true,
    },
    id: String,
    type: {
      type: String,
      default: 'text',
    },
    placeholder: String,
    error: Boolean,
  },
};
</script>
