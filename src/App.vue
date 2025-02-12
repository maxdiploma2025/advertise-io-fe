<template>
  <div class="w-[500px] h-full bg-zink-900">
    <div class="flex justify-center w-[500px]">
    <el-form :model="form" label-width="180px" class="bg-zink-900">

      <el-form-item label="Enter a niche'">
        <el-input 
          v-model="form.niche" 
          placeholder="e.g Healthcare"
        />
      </el-form-item>

      <el-form-item label="Enter a company name">
        <el-input 
          v-model="form.companyName" 
          placeholder="e.g IT Company"
        />
      </el-form-item>

      <el-form-item label="Enter an image content">
        <el-input 
          type="textarea" 
          v-model="form.imageContent" 
          placeholder="e.g Person with laptop"
        />
      </el-form-item>

      <el-form-item label="Enter additional colors">
        <el-input 
          v-model="form.colors" 
          placeholder="e.g blue, green, white'"
        />
      </el-form-item>

      <el-form-item label="Enter a call-to-action text">
        <el-input 
          v-model="form.ctaText" 
          placeholder="e.g Get Started"
        />
      </el-form-item>

      <el-form-item label="Enter a design style">
        <el-input 
          v-model="form.designStyle" 
          placeholder="e.g Minimalistic, Future"
        />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="generateImage" :disabled="isDisabled">
          Згенерувати картинку
        </el-button>
      </el-form-item>

    </el-form>

    <div v-if="image" class="w-full flex justify-center">
      <img :src="image" alt="Generated Image" />
    </div>
  </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import axios from 'axios';

const form = ref({
  niche: 'Healthcare',
  companyName: 'MediCare Hospital',
  imageContent: 'a team of doctors and nurses collaborating in a modern hospital. A doctor explains a diagnosis to a patient using digital medical charts on a screen, while another team member prepares for a procedure. The environment is professional, caring, and technologically advanced.',
  colors: 'blue, white, light gray',
  ctaText: 'Providing Compassionate & Advanced Healthcare!',
  designStyle: 'clean, professional, and reassuring'
})

const image = ref<string | null>('');
const isDisabled = ref(false);

const generatePrompt = () => {
  return `
      Create a promotional banner for the ${form.value.niche} industry.
      The banner is for a company named '${form.value.companyName}', 
      and the logo should be placed in a top of picture.
      The image should depict ${form.value.imageContent}.
      Include ${form.value.colors} as the primary colors.
      Add a call-to-action text that says, '${form.value.ctaText}' 
      positioned at the bottom center.
      The banner should have a ${form.value.designStyle} style. 
      Ensure the overall design is visually balanced and optimized for use in online advertisements.
      Be aware, call to action text is required.
    `
}

const generateImage = async () => {

  const prompt = generatePrompt();
  isDisabled.value = true;

  try {
    const response = await axios.post('https://advertise-io-be.onrender.com/query', {
      prompt
    });
    image.value = response.data.image;
    console.log(image.value);
  } catch (error) {
    console.error('Error generating image:', error);
    alert('Failed to generate image. Please try again.');
  } finally {
    isDisabled.value = false;
  }
};
</script>
