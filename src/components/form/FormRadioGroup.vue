<template>
  <div>
    <div v-for="option in options" :key="option.value" class="flex items-center space-x-2">
      <input
          :name="name"
          type="radio"
          :value="option.value"
          :checked="modelValue === option.value"
          @change="$emit('update:modelValue', option.value)"
      />
      <span>{{ option.label }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    modelValue: {
      required: true,
    },
    name: String,
    options: {
      type: Array,
      required: true,
    },
  },
};
</script>
