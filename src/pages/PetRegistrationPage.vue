<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
      <h1 class="text-xl font-semibold custom-blue-text mb-6 text-left">Register Your Pet</h1>
      <form @submit.prevent="savePet" class="space-y-6">
        <!-- Pet Name -->
        <FormInput
            id="name"
            label="What is your pet's name?"
            v-model="pet.name"
            placeholder="Enter your pet's name"
            :error="errors.name"
            @blur="() => (errors.name = required(pet.name))"
        />

        <!-- Pet Type -->
        <FormRadioGroup
            label="Pet Type"
            name="type"
            :options="petTypeOptions"
            v-model="pet.type"
            :error="errors.type"
            @update:modelValue="() => (errors.type = required(pet.type))"
        />

        <!-- Breed -->
        <FormSelect
            id="breed"
            label="What breed are they?"
            v-model="pet.breed"
            :options="breedOptions"
            :error="errors.breed"
            @change="() => (errors.breed = required(pet.breed))"
        />

        <!-- Date of Birth -->
        <FormDatePicker
            label="Date of Birth"
            :model="dob"
            :errors="dobErrors"
        />

        <!-- Gender -->
        <FormRadioGroup
            label="Gender"
            name="gender"
            :options="genderOptions"
            v-model="pet.gender"
            :error="errors.gender"
            @update:modelValue="() => (errors.gender = required(pet.gender))"
        />

        <!-- Save Button -->
        <FormButton :disabled="!isFormValid" @click="savePet">
          Save Pet
        </FormButton>
      </form>
    </div>
  </div>
</template>

<script>
// import FormInput from "components/form/FormInput.vue";
// import FormRadioGroup from "@/components/form/FormRadioGroup.vue";
// import FormSelect from "@/components/form/FormSelect.vue";
// import FormDatePicker from "@/components/form/FormDatePicker.vue";
// import FormButton from "@/components/form/FormButton.vue";
// import { required, validateYear, validateDay } from "@/validationRules";

import FormInput from "@/components/form/FormInput.vue";
import FormRadioGroup from "@/components/form/FormRadioGroup.vue";
import FormSelect from "@/components/form/FormSelect.vue";
import FormDatePicker from "@/components/form/FormDatePicker.vue";
import FormButton from "@/components/form/FormButton.vue";

export default {
  components: { FormInput, FormRadioGroup, FormSelect, FormDatePicker, FormButton },
  data() {
    return {
      pet: {
        name: "",
        type: "",
        breed: "",
        gender: "",
      },
      dob: {
        month: null,
        day: null,
        year: null,
      },
      errors: {
        name: null,
        type: null,
        breed: null,
        gender: null,
      },
      dobErrors: {
        month: null,
        day: null,
        year: null,
      },
      petTypeOptions: [
        { label: "Cat", value: "Cat" },
        { label: "Dog", value: "Dog" },
      ],
      breedOptions: [
        { label: "Golden Retriever", value: "golden_retriever" },
        { label: "Bulldog", value: "bulldog" },
      ],
      genderOptions: [
        { label: "Female", value: "Female" },
        { label: "Male", value: "Male" },
      ],
    };
  },
  computed: {
    isFormValid() {
      return (
          !Object.values(this.errors).some((error) => error !== null) &&
          !Object.values(this.dobErrors).some((error) => error !== null)
      );
    },
  },
  methods: {
    savePet() {
      // Validate fields
      this.errors.name = required(this.pet.name);
      this.errors.type = required(this.pet.type);
      this.errors.breed = required(this.pet.breed);
      this.errors.gender = required(this.pet.gender);
      this.dobErrors.year = validateYear(this.dob.year);
      this.dobErrors.day = validateDay(this.dob.day, this.daysInMonth);

      if (this.isFormValid) {
        alert("Pet details saved successfully!");
      }
    },
  },
};
</script>

<style scoped>
.custom-blue-text {
  color: #02386d;
}
</style>
