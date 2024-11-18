<template>
  <ul v-if="errorList.length" class="text-red-500 text-sm mt-2">
    <li v-for="(error, index) in errorList" :key="index">{{ error }}</li>
  </ul>
</template>

<script>
import useErrors from "@/mixins/useErrors";
export default {
  mixins: [useErrors],
  computed: {
    errorList() {
      // If errors is a string, wrap it in an array; otherwise, return the array as is
      return Array.isArray(this.errors) ? this.errors : [this.errors];
    },
  },
};
</script>

<style scoped>
</style>
