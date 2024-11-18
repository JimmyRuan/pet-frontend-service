<template>
  <button
      :class="[
      'px-4 py-2 rounded-lg text-white',
      disabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600',
    ]"
      :disabled="disabled"
      @click="onClick"
  >
    <slot />
  </button>
</template>

<script>
export default {
  props: {
    disabled: { type: Boolean, default: false },
  },
  methods: {
    onClick() {
      this.$emit("click");
    },
  },
};
</script>
