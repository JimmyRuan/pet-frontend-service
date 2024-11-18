<template>
  <div>
    <select
        :id="id"
        :value="modelValue"
        @change="$emit('update:modelValue', $event.target.value)"
        :class="['w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500', errors ? 'border-red-500' : '']"
    >
      <option
          v-for="option in options"
          :key="option.value"
          :value="option.value"
          :disabled="option.disabled || false"
      >
        {{ option.label }}
      </option>
    </select>


    <ErrorList :errors="errors" />

  </div>
</template>

<script>
import ErrorList from "@/components/form/ErrorList.vue";
import useErrors from "@/mixins/useErrors";

export default {
  mixins: [useErrors],
  components: {ErrorList},
  props: {
    modelValue: {
      required: true,
    },
    id: String,
    options: {
      type: Array,
      required: true,
      default: () => [],
    }
  },
};
</script>
