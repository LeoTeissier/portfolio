<script setup lang="ts">
import { ref } from 'vue';

defineProps({
  email: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  }
});

const submitted = ref(false);

const resetForm = () => {
  submitted.value = false;
};


const onSubmit = async () => {
  try {
    submitted.value = true;
  } catch (error) {
    console.error(error);
  }
};
</script>


<template>
  <div v-if="submitted" class="flex flex-col items-center justify-center h-full">
    <h2 class="text-white text-2xl text-center">Thank you! 🤘</h2>
    <p class="text-center my-2">Your message has been accepted. You will recieve an answer really soon!</p>
    <button @click="resetForm" class="bg-border hover:bg-secondary-dark text-white rounded-lg py-2 px-4">send-new-message</button>
  </div>
  <form v-else @submit.prevent="onSubmit" class="flex flex-col max-w-lg w-full mx-auto text-sm">
    <div class="flex flex-col mb-5">
      <label for="email" class="mb-3">_email:</label>
      <input type="email" name="email" :value="email" :placeholder="email" @input="$emit('update:email', $event.target.value)" class="bg-[#01080E] border-2 border-color rounded-lg p-2 mb-5 placeholder-secondary" required>
    </div>
    <div class="flex flex-col mb-5">
      <label for="subject" class="mb-3">_subject:</label>
      <input type="text" name="subject" :value="subject" :placeholder="subject" @input="$emit('update:subject', $event.target.value)" class="bg-[#01080E] border-2 border-color rounded-lg p-2 mb-5 placeholder-secondary" required>
    </div>
    <div class="flex flex-col mb-5">
      <label for="message" class="mb-3">_message:</label>
      <textarea name="message" :value="message" :placeholder="message" @input="$emit('update:message', $event.target.value)" class="h-36 bg-[#01080E] border-2 border-color rounded-lg resize-none p-2 placeholder-secondary scrollbar" required></textarea>
    </div>
    <button type="submit" class="bg-[#1E2D3D] hover:bg-[#4D5BCE] text-white rounded-lg py-2 px-4">submit-message</button>
  </form>
</template>

<style scoped>

</style>