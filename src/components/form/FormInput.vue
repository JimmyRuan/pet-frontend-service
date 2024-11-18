<template>
  <div>
    <input
        :id="id"
        :type="type"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        :placeholder="placeholder"
        :class="['w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500', errors ? 'border-red-500' : '']"
    />

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
      type: String,
      required: true,
    },
    id: String,
    type: {
      type: String,
      default: 'text',
    },
    placeholder: String,
  },
};
</script>
