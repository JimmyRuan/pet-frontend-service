<template>
  <LoadingPage :show="isLoading" />
  <router-view />
</template>

<script>
import LoadingPage from "@/components/LoadingPage.vue";
import {mapGetters} from "vuex";

export default {
  name: 'App',
  components: {LoadingPage},
  computed: {
    ...mapGetters("loader", ["isLoading"]),
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
