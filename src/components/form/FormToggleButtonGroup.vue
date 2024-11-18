<template>
  <div>
    <label :for="id" class="block text-gray-700 font-medium text-left mb-2">{{ label }}</label>
    <div class="flex items-center">
      <button
          v-for="option in options"
          :key="option.value"
          type="button"
          :class="{
          'custom-blue-bg text-white custom-blue-border': modelValue === option.value,
          'bg-white text-blue-500 custom-blue-border': modelValue !== option.value,
          'rounded-l-lg': option === options[0],
          'rounded-r-lg': option === options[options.length - 1]
        }"
          class="border px-6 py-1 w-1/4 focus:outline-none"
          @click="updateValue(option.value)"
      >
        {{ option.label }}
      </button>
    </div>

    <ErrorList :errors="errors" />
  </div>
</template>

<script>
import useErrors from "@/mixins/useErrors";
import ErrorList from "@/components/form/ErrorList.vue";

export default {
  components: {ErrorList},
  mixins: [useErrors],
  props: {
    id: {
      type: String,
      required: false,
    },
    label: {
      type: String,
      required: true,
    },
    options: {
      type: Array,
      required: true,
    },
    modelValue: {
      type: [String, Number],
      required: true,
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
.custom-blue-bg {
  background-color: #0096e1;
}

.custom-blue-border {
  border-color: #0096e1;
}
</style>
