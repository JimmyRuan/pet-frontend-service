<template>
  <div>
    <label class="block text-gray-700 font-medium text-left mb-2">{{ label }}</label>
    <div class="flex space-x-4">
      <!-- Month -->
      <FormSelect
          id="month"
          label="Month"
          :options="monthOptions"
          v-model="model.month"
          :error="errors.month"
      />
      <!-- Day -->
      <FormInput
          id="day"
          label="Day"
          type="number"
          v-model="model.day"
          placeholder="dd"
          :error="errors.day"
      />
      <!-- Year -->
      <FormInput
          id="year"
          label="Year"
          type="number"
          v-model="model.year"
          placeholder="yyyy"
          :error="errors.year"
      />
    </div>
    <ul v-if="Object.values(errors).some((err) => err)" class="text-red-500 text-sm mt-2">
      <li v-for="(error, key) in errors" :key="key" v-if="error">{{ error }}</li>
    </ul>
  </div>
</template>

<script>
import FormInput from "./FormInput.vue";
import FormSelect from "./FormSelect.vue";

export default {
  components: { FormInput, FormSelect },
  props: {
    label: { type: String, required: true },
    model: { type: Object, required: true },
    errors: { type: Object, required: true },
  },
};
</script>
