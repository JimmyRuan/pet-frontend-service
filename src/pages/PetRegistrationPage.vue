<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
      <h1 class="text-xl font-semibold custom-blue-text mb-6 text-left">Register Your Pet</h1>
      <form @submit.prevent="savePet" class="space-y-6">
        <!-- Pet's Name -->
        <div>
          <label for="breed" class="block text-gray-700 font-medium text-left mb-2">
            What is your pet's name?
          </label>
          <FormInput
              id="name"
              v-model="pet.name"
              placeholder="Enter your pet's name"
              :error="!!errors.name"
          />
        </div>

        <!-- Pet Type -->
        <FormToggleButtonGroup
            id="type"
            label="Pet Type"
            v-model="pet.type"
            :options="petTypeOptions"
        />

        <!-- Breed -->
        <div v-if="pet.type">
          <label for="breed" class="block text-gray-700 font-medium text-left mb-2">What breed are they?</label>
          <FormSelect
              id="breed"
              v-if="pet.type"
              v-model="pet.breed"
              :options="breedOptions"
              :error="!!errors.breed"
              @change="handleBreedSelection"
          />
        </div>


        <!-- Buttons for "I don’t know" or "It’s a mix" -->
        <div v-if="pet.breed === 'CantFindIt'" class="mt-4 ml-6">
          <p class="text-sm text-gray-500 mb-2 text-left font-bold">Choose One</p>
          <div class="flex flex-col space-y-4">
            <FormRadioGroup
                name="cantFindBreed"
                v-model="pet.cantFindBreedOption"
                :options="[
                  { label: 'I don’t know', value: 'I don’t know' },
                  { label: 'It’s a mix', value: 'It’s a mix' }
                ]"
                label="Can't find the breed?"
            />

            <div v-if="pet.cantFindBreedOption === 'It’s a mix'" class="ml-6 mt-2">
              <label for="mixBreed" class="block text-gray-700 font-medium text-left mb-2">Mix Breed Details</label>
              <input
                  id="mixBreed"
                  v-model="pet.mixBreedDetails"
                  type="text"
                  placeholder="Enter mix breed details"
                  class="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>


        <FormToggleButtonGroup
            id="dobOrAge"
            label="Do you know their date of birth?"
            v-model="pet.dobOrAge"
            :options="[
              { label: 'Yes', value: 'dob' },
              { label: 'No', value: 'age' }
            ]"
        />

        <div v-if="pet.dobOrAge === 'age'" class="mb-4">
          <label for="ageOption" class="block text-gray-700 font-medium text-left mb-2">Approximate Age</label>
          <FormSelect
              v-if="pet.dobOrAge === 'age'"
              id="ageOption"
              label="Approximate Age"
              v-model="pet.ageOption"
              :options="ageOptions.map(age => ({ label: age, value: age }))"
              :error="!!errors.ageOption"
          />
        </div>

        <!-- Date of Birth -->
        <DateOfBirthForm
            v-if="pet.dobOrAge === 'dob'"
            :dob="{ month: pet.dobMonth, day: pet.dobDay, year: pet.dobYear }"
            :months="months"
            :daysInMonth="pet.daysInMonth"
            :currentYear="currentYear"
            :errors="pet.dobErrors"
            @update-days="updateDays"
            @validate-day="localValidateDay"
            @validate-year="localValidateYear"
        />

        <!-- Gender -->
        <FormToggleButtonGroup
            id="gender"
            label="Gender"
            v-model="pet.gender"
            :options="[
              { label: 'Female', value: 'Female' },
              { label: 'Male', value: 'Male' },
            ]"
        />

        <!-- Submit Button -->
        <div class="flex justify-center">
          <button
              :disabled="!isFormValid"
              :class="isFormValid ? 'bg-blue-500' : 'bg-gray-400 cursor-not-allowed'"
              class="text-white px-4 py-1 rounded-lg"
          >
            Save Pet
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';
import FormInput from "@/components/form/FormInput.vue";
import FormToggleButtonGroup from "@/components/form/FormToggleButtonGroup.vue";
import FormSelect from "@/components/form/FormSelect.vue";
import FormRadioGroup from "@/components/form/FormRadioGroup.vue";
import DateOfBirthForm from "@/components/form/DateOfBirthForm.vue";
import {validateDay, validateYear} from "@/services/validationRules";

export default {
  components: {DateOfBirthForm, FormRadioGroup, FormSelect, FormToggleButtonGroup, FormInput},
  data() {
    return {
      months: [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December',
      ],
      dobErrors: [],
      pet: {
        name: "",
        type: "Dog",
        breed: "",
        gender: "Male",
        cantFindBreedOption: 'I don’t know',
        mixBreedDetails: "",
        dobOrAge: "age",
        dobMonth: "",
        dobDay: "",
        dobYear: "",
        dobErrors: [],
      },
      petTypeOptions: [
        { label: "Cat", value: "Cat" },
        { label: "Dog", value: "Dog" },
      ],
      errors: {
        name: null,
        breed: null,
        dobErrors: null,
        ageOption: null,

      },
    };
  },
  computed: {
    ...mapState(['pet', 'petTypes', 'ageOptions']),
    ...mapGetters(['getBreeds']),
    breeds() {
      return this.getBreeds(this.pet.type);
    },
    currentYear() {
      return new Date().getFullYear();
    },
    years() {
      const startYear = this.currentYear;
      const endYear = this.currentYear - 100;
      return Array.from({ length: startYear - endYear + 1 }, (_, i) => startYear - i);
    },
    daysInMonth() {
      if (!this.dobMonth || !this.dobYear) return [];
      const days = new Date(this.dobYear, this.dobMonth, 0).getDate();
      return Array.from({ length: days }, (_, i) => i + 1);
    },
    isFormValid() {
      return (
          this.pet.name &&
          this.pet.type &&
          this.pet.breed &&
          this.dobOrAge &&
          (this.dobOrAge === 'age' ? this.pet.ageOption : this.isValidDob()) &&
          this.pet.gender
      );
    },
    breedOptions() {
      const breeds = this.getBreeds(this.pet.type) || [];
      return [
        { label: "Choose One", value: "", disabled: true },
        ...breeds.map((breed) => ({ label: breed, value: breed })),
        { label: "Can't find it?", value: "CantFindIt" },
      ];
    },
  },
  methods: {
    ...mapActions(['updatePetField']),
    updateType() {
      this.updatePetField({ field: 'type', value: this.pet.type });
    },
    handleBreedSelection() {
      if (this.pet.breed !== 'CantFindIt') {
        this.cantFindBreedOption = 'I don’t know';
        this.pet.cantFindBreedOption = 'I don’t know';
      }
    },
    selectPetType(type) {
      this.updatePetField({ field: 'type', value: type });
    },
    selectDobOrAge(option) {
      this.dobOrAge = option;
      if (option === 'age') {
        this.clearDob();
      } else {
        this.clearAgeOption();
      }
    },
    selectGender(gender) {
      this.updatePetField({ field: 'gender', value: gender });
    },
    setCantFindBreedOption() {
      this.updatePetField({ field: 'breed', value: 'CantFindIt' });
    },
    clearDob() {
      this.dobMonth = '';
      this.dobDay = '';
      this.dobYear = '';
    },
    clearAgeOption() {
      this.updatePetField({ field: 'ageOption', value: '' });
    },
    updateDays() {
      this.dobDay = ''; // Reset day selection when month changes
    },
    isValidDob() {
      console.log("I am here at 252");
      return (
          this.dobMonth &&
          this.dobDay &&
          this.dobYear &&
          this.dobYear >= this.currentYear - 100 &&
          this.dobYear <= this.currentYear
      );
    },
    localValidateDay() {
      const maxDays = this.daysInMonth;
      this.errors.dobDay = validateDay(this.dobDay, maxDays);
    },
    localValidateYear() {
      this.errors.dobYear = validateYear(this.pet.dobYear, this.currentYear)
    },
    savePet() {
      this.localValidateYear();
      this.localValidateDay();


      if (this.dobOrAge === 'dob' && this.isValidDob()) {
        this.updatePetField({
          field: 'dob',
          value: `${this.dobYear}-${String(this.dobMonth).padStart(2, '0')}-${String(this.dobDay).padStart(2, '0')}`,
        });
      }
      console.log('Saved Pet:', this.pet);
      alert('Pet details saved successfully!');
    },
  },
  mounted() {
  },
};
</script>

<style scoped>

.custom-blue-text {
  color: #02386d;
}
</style>