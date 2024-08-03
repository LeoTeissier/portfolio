<script setup lang="ts">
import { ref, onMounted }from 'vue';
import config from "@/developer.json";

const social = config.contacts.social
const isMobile = ref(false);

// check if mobile
onMounted(() => {
  checkIfMobile();
  window.addEventListener('resize', checkIfMobile);
});
function checkIfMobile() {
  isMobile.value = window.innerWidth <= 1024;
}
</script>

<template>
    <footer>

        <!-- footer pour Desktop -->
        <div v-if="!isMobile" class="w-full h-full flex justify-between">
            <!-- social icons -->
            <div class="flex h-full">
                <div id="social-title" class="flex justify-center items-center max-w-80 min-w-80 border-right">
                  find me in:
                </div>

                <NuxtLink :to="social.linkedin.url + '/' + social.linkedin.user" target="_blank" class="flex justify-center items-center px-8 border-right hover:bg-[#1E2D3D]">
                  <img src="/svg/social/linkedin.svg" alt="linkedin icon"/>
                </NuxtLink>

            </div>

            <!-- github user -->
            <div class="flex h-full border-left">

                <NuxtLink :to="social.github.url + '/' + social.github.user" target="_blank" class="flex justify-center items-center px-8 hover:bg-[#1E2D3D]">
                    @{{ social.github.user }}
                    <img src="/svg/social/github.svg" alt="github icon" class="pl-2"/>
                </NuxtLink>

            </div>
        </div>

      <!-- footer pour Mobile/Tablette -->
      <div v-else class="w-full h-full flex justify-between">
        <!-- social icons -->
        <div class="flex h-full">
          <div id="social-title" class="flex justify-center items-center pl-10">
            find me in:
          </div>
        </div>

        <!-- github user -->
        <div class="flex h-full border-left">

          <NuxtLink :to="social.github.url + '/' + social.github.user" target="_blank" class="flex justify-center items-center px-8 hover:bg-[#1E2D3D]">
            <img src="/svg/social/github.svg" alt="github icon" class="pl-2"/>
          </NuxtLink>

        </div>
      </div>

    </footer>
</template>

<style scoped>

</style>
