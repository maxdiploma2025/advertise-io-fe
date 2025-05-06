<template>
    <div class="p-6 min-h-screen">
      <h2 class="text-2xl font-bold mb-4 text-white">Suggestions</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div
          v-for="(suggestion, index) in suggestions"
          :key="index"
          class="bg-white p-4 rounded-2xl shadow hover:shadow-md transition max-w-[300px] max-h-[200px] hover:bg-gray-300 overflow-hidden cursor-pointer"
          @click="onHandleClick(suggestion)"
        >
          <p class="text-gray-800 line-clamp-5">{{ suggestion }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from "vue";

  const { input } = useGenerate()
  
  const suggestions = ref([
    `Write me short values for adverizing image generation with 6 punkts
  Niche
  Company name
  Image content
  Additional colors
  Call to action
  design style
  
  For It company`,
    `Create me prompt for generating advertisement banner image for ItCompany i need maximum details.`,
  ]);


  const onHandleClick = (suggestion: string) => {
    input.value = suggestion
  }
  </script>
  