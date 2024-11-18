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
              :errors="errors.name"
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
              :errors="errors.breed"
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
              <FormInput
                  id="mixBreed"
                  v-model="pet.mixBreedDetails"
                  placeholder="Enter mix breed details"
                  :errors="errors.mixBreedDetails"
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
              :options="localAgeOptions"
              :errors="errors.ageOption"
          />
        </div>

        <!-- Date of Birth -->
        <DateOfBirthForm
            v-if="pet.dobOrAge === 'dob'"
            :dob="{ month: pet.dobMonth, day: pet.dobDay, year: pet.dobYear }"
            :months="months"
            :daysInMonth="pet.daysInMonth"
            :currentYear="currentYear"
            :errors="errors.dobErrors"
            @update-dob="handleDobUpdate"
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
              class="text-white px-4 py-1 rounded-lg custom-blue-bg cursor-pointer"
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
import {required, validateYearMonthDay} from "@/services/validationRules";
import {getAllMonths} from "@/services/util";

export default {
  components: {DateOfBirthForm, FormRadioGroup, FormSelect, FormToggleButtonGroup, FormInput},
  data() {
    return {
      months: getAllMonths(),
      pet: {
        name: "",
        type: "Dog",
        breed: "",
        gender: "Male",
        cantFindBreedOption: 'I don’t know',
        mixBreedDetails: "",
        ageOption: "",
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
        mixBreedDetails: null,
      },
    };
  },
  computed: {
    ...mapState('pet', ['petTypes', 'ageOptions']),
    ...mapGetters('pet', ['getBreeds']),
    currentYear() {
      return new Date().getFullYear();
    },
    years() {
      const startYear = this.currentYear;
      const endYear = this.currentYear - 100;
      return Array.from({ length: startYear - endYear + 1 }, (_, i) => startYear - i);
    },
    breedOptions() {
      const breeds = this.getBreeds(this.pet.type) || [];
      return [
        { label: "Choose One", value: "", disabled: true },
        ...breeds.map((breed) => ({ label: breed, value: breed })),
        { label: "Can't find it?", value: "CantFindIt" },
      ];
    },
    localAgeOptions() {
        return [
          { label: "Select Age", value: "", disabled: true },
           ...this.ageOptions.map(age => ({ label: age, value: age }))
        ];
    }
  },
  methods: {
    ...mapActions('pet', ['updatePetField']),
    daysInMonth(month, year) {
      if (!month || !year) return 0;
      return new Date(year, month, 0).getDate();
    },
    updateType() {
      this.updatePetField({ field: 'type', value: this.pet.type });
    },
    handleBreedSelection() {
      if (this.pet.breed !== 'CantFindIt') {
        this.cantFindBreedOption = 'I don’t know';
        this.pet.cantFindBreedOption = 'I don’t know';
      }
    },
    clearDob() {
      this.pet.dobMonth = '';
      this.pet.dobDay = '';
      this.pet.dobYear = '';
    },
    handleDobUpdate({field, value}) {
      if(field === 'month'){
        this.pet.dobMonth = value;
      } else if(field === 'year') {
        this.pet.dobYear = value;
      } else if(field === 'day') {
        this.pet.dobDay = value;
      }
    },
    savePet() {
      // Reset errors
      this.errors = {
        name: null,
        breed: null,
        dobErrors: null,
        ageOption: null,
      };

      // Validate pet name
      this.errors.name = required('Name', this.pet.name);

      // Validate breed
      if (this.pet.type) {
        this.errors.breed = required('Breed', this.pet.breed);
      }

      if(this.pet.cantFindBreedOption === 'It’s a mix'){
        this.errors.mixBreedDetails = required('Breed Detail', this.pet.mixBreedDetails);
      }

      // Validate DOB or Age
      if (this.pet.dobOrAge === 'dob') {
        this.errors.dobErrors = validateYearMonthDay(this.pet.dobDay, this.pet.dobMonth, this.pet.dobYear);
      } else if (this.pet.dobOrAge === 'age') {
        this.errors.ageOption = required('Age Option', this.pet.ageOption);
      }

      // Check for validation errors
      const hasErrors = Object.values(this.errors).some((error) => error);

      // Print errors if any
      if (hasErrors) {
        return;
      }

      // Prepare DOB string if applicable
      if (this.pet.dobOrAge === 'dob') {
        this.pet.dobStr = `${this.dobYear}-${String(this.dobMonth).padStart(2, '0')}-${String(this.dobDay).padStart(2, '0')}`;
      }

      // Save the pet details
      console.log('Saved Pet:', this.pet);
    },
  },
};
</script>

<style scoped>

.custom-blue-text {
  color: #02386d;
}

.custom-blue-bg {
  background-color: #0096e1;
}
</style>