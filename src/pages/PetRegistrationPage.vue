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
              class="text-white px-6 py-1 rounded-lg custom-blue-bg cursor-pointer hover:bg-blue-500 hover:text-xl"
          >
            Save Pet
          </button>
        </div>
      </form>
    </div>


    <!-- PetResponseModal -->
    <PetResponseModal
        v-if="showResponseModal"
        :response="apiResponse"
        @close="showResponseModal = false"
    />
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
import {calculateDateOfBirth, createDateFromYMD, formatDateToString} from "@/services/DateService";
import ConfigService from "@/services/ConfigService";
import HttpClient from "@/services/HttpClient";
import PetResponseModal from "@/components/PetResponseModal.vue";
import _ from 'lodash';

export default {
  components: {PetResponseModal, DateOfBirthForm, FormRadioGroup, FormSelect, FormToggleButtonGroup, FormInput},
  data() {
    return {
      pet: this.defaultPetInfo(),
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
      showResponseModal: false,
      apiResponse: null,
    };
  },
  computed: {
    ...mapState('pet', ['petTypes', 'ageOptions']),
    ...mapGetters('pet', ['getBreeds']),
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
    getBirthDayStr() {
      let birthDay;
      if (this.pet.dobOrAge === 'dob') {
        `${this.pet.dobYear}-${String(this.pet.dobMonth).padStart(2, '0')}-${String(this.pet.dobDay).padStart(2, '0')}`;
        birthDay = createDateFromYMD(this.pet.dobYear, this.pet.dobMonth, this.pet.dobDay);
      } else if (this.pet.dobOrAge === 'age'){
        birthDay = calculateDateOfBirth(this.pet.ageOption);
      } else {
         console.error("This error should not be triggered for getBirthDayStr");
         return;
      }

      return formatDateToString(birthDay);
    },
    validateData() {
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
    },
    transformPetForCreation(pet) {
      return {
        name: pet.name,
        type: pet.type,
        breed: pet.breed,
        date_of_birth: pet.dobStr,
        gender: pet.gender,
      };
    },
    defaultPetInfo() {
      return {
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
            }
    },
    async sendPetData(data) {
      const apiUrl = ConfigService.getApiUrl();
      const url = `${apiUrl}/pets`;

      return await HttpClient.post(url, data);
    },

    async savePet() {
      this.validateData();
      const hasErrors = Object.values(this.errors).some((error) => !_.isEmpty(error));
      if (hasErrors) {
        return;
      }

      this.pet.dobStr = this.getBirthDayStr();
      const petRequestData = this.transformPetForCreation(this.pet);


      try {
        this.$store.dispatch("loader/showLoading");
        this.apiResponse = await this.sendPetData(petRequestData);
        this.showResponseModal = true;
        console.log('Saved Pet:', [this.apiResponse]);
      } catch (error) {
        console.error("Error saving pet:", error);
        alert("There is some issue with our service. please coming back later")
      } finally {
        this.pet = this.defaultPetInfo();
        this.$store.dispatch("loader/hideLoading");
      }
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