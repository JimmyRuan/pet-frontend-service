<template>
  <div>
    <select
        :id="id"
        :value="modelValue"
        @change="$emit('update:modelValue', $event.target.value)"
        :class="['w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500', error ? 'border-red-500' : '']"
    >
      <option v-for="option in options" :key="option.value" :value="option.value">
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  props: {
    modelValue: {
      required: true,
    },
    id: String,
    options: {
      type: Array,
      required: true,
    },
    error: Boolean,
  },
};
</script>
