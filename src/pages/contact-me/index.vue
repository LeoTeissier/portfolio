<script setup lang="ts">
import { ref } from 'vue';
import config from "@/developer.json";
const contact = config.contacts;

const email = ref('');
const subject = ref('');
const message = ref('');
const contactOpen = ref(false);

const updateEmail = (newEmail: string) => {
  email.value = newEmail;
};

const updateSubject = (newSubject: string) => {
  subject.value = newSubject;
};

const updateMessage = (newMessage: string) => {
  message.value = newMessage;
};
</script>

<template>
  <main class="page flex flex-col lg:flex-row">

      <div class="lg:hidden flex justify-start items-center w-full min-h-16 pl-10 text-white text-xl border-bottom">
        <h2>_contact-me</h2>
      </div>

      <div data-aos="fade-right" class="flex flex-col w-full h-fit lg:h-full border-0 lg:max-w-80 lg:min-w-80 border-right lg:border-r">

        <!-- contacts -->
        <div id="contacts" class="flex flex-col">
          <div class="flex items-center border-bottom h-14 px-6 py-2" @click="contactOpen = !contactOpen">
            <img class="mr-2 rotate-90" src="/svg/arrow.svg" alt="">
            <h3 class="text-white text-lg">
              contacts
            </h3>
          </div>
          <div class="hidden py-2 border-bottom lg:block">
            <div v-for="(source, key) in contact.direct.sources" :key="key" class="flex items-center py-1 px-6">
              <img v-if="key === 'email'" :src="'/svg/' + key + '.svg'" :alt="`icon email`" class="w-4 h-4 mr-2.5">
              <img v-else-if="key === 'phone'" :src="'/svg/' + key + '.svg'" :alt="`icon phone`" class="w-4 h-4 mr-2.5">
              <a v-if="key === 'email'" :href="'mailto:' + source" class="text-white hover:text-gray-300 truncate">{{ source }}</a>
              <a v-else-if="key === 'phone'" :href="'tel:' + source" class="text-white hover:text-gray-300 truncate">{{ source }}</a>
            </div>
          </div>
          <div v-show="contactOpen" class="block py-2 border-bottom lg:hidden">
            <div v-for="(source, key) in contact.direct.sources" :key="key" class="flex items-center py-1 px-6">
              <img v-if="key === 'email'" :src="'/svg/' + key + '.svg'" :alt="`icon email`" class="w-4 h-4 mr-2.5">
              <img v-else-if="key === 'phone'" :src="'/svg/' + key + '.svg'" :alt="`icon phone`" class="w-4 h-4 mr-2.5">
              <a v-if="key === 'email'" :href="'mailto:' + source" class="text-white hover:text-gray-300 truncate">{{ source }}</a>
              <a v-else-if="key === 'phone'" :href="'tel:' + source" class="text-white hover:text-gray-300 truncate">{{ source }}</a>
            </div>
          </div>
        </div>
      </div>

      <div class="flex flex-col w-full">

        <!-- windows tab -->
        <div class="w-full hidden lg:flex min-h-14 border-right border-bottom items-center">

          <div data-aos="fade-left" class="flex items-center border-right h-full">
            <p class="text-menu-text px-3">contacts</p>
            <img src="/svg/close.svg" alt="" class="m-3">
          </div>

        </div>

        <!-- main -->
        <div data-aos="fade-up" class="flex lg:grid lg:grid-cols-2 h-full w-full">

          <div id="left" class="h-full w-full flex flex-col items-center p-16 border-0 border-color lg:border-r">

            <ContactForm
                :email="email"
                :subject="subject"
                :message="message"
                @update:email="updateEmail"
                @update:subject="updateSubject"
                @update:message="updateMessage"
                data-aos="fade-down"
                data-aos-delay="500"
            />

          </div>

          <div id="right" class="h-full w-full hidden lg:flex">

            <div class="w-full p-16">
              <FormContentCode
                  :email="email"
                  :subject="subject"
                  :message="message"
                  data-aos="fade-down"
                  data-aos-delay="500"
              />
            </div>
            <!-- scroll bar -->
            <div class="min-w-8 h-full border-left hidden lg:flex justify-center py-1">
              <div class="bg-[#607b96] w-3/4 h-3"/>
            </div>

          </div>
        </div>

      </div>
  </main>
</template>

<style>

</style>