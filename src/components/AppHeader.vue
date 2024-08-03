<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed } from 'vue';
import { useRoute } from "vue-router";
import config from "@/developer.json";
import { useMenuState } from '@/storages/useMenuState';

const { menuOpen, toggleMobileMenu } = useMenuState();

const isMobile = ref(false);

// check if mobile
onMounted(() => {
  checkIfMobile();
  window.addEventListener('resize', checkIfMobile);
});

// remove event listener
onBeforeUnmount(() => {
  window.removeEventListener('resize', checkIfMobile);
});

function checkIfMobile() {
  isMobile.value = window.innerWidth <= 1024;
}

// link active
const route = useRoute();
const isActive = computed(() => {
  return (routePath: string) => route.path === routePath
})

</script>


<template>
    <header>
        <!-- Navbar pour Desktop -->
        <nav v-if="!isMobile" class="desktop w-full h-full flex justify-between">
          <div class="flex h-full">
            <div class="flex justify-center items-center max-w-80 min-w-80 border-right">
              {{ config.logo_name }}
            </div>

            <NuxtLink class="flex justify-center items-center px-8 hover:bg-border hover:text-white border-right" to="/" :class="{ active: isActive('/') }">
              _hello
              <span class="border-bottom"/>
            </NuxtLink>

            <NuxtLink class="flex justify-center items-center px-8 hover:bg-border hover:text-white border-right" to="/about-me" :class="{ active: isActive('/about-me') }">
              _about-me
              <span class="border-bottom"/>
            </NuxtLink>

            <NuxtLink class="flex justify-center items-center px-8 hover:bg-border hover:text-white border-right" to="/projects" :class="{ active: isActive('/projects') }">
              _projects
              <span class="border-bottom"/>
            </NuxtLink>
          </div>

          <NuxtLink class="flex justify-center items-center px-8 hover:bg-border hover:text-white border-left" to="/contact-me" :class="{ active: isActive('/contact-me')}">
            _contact-me
            <span class="border-bottom"/>
          </NuxtLink>
        </nav>

        <!-- Navbar pour Mobile/Tablette -->
        <nav v-else class="flex flex-col w-full p-4">
            <div class="flex justify-between items-center">
                <NuxtLink to="/" class="text-xl font-bold">{{ config.logo_name }}</NuxtLink>
                <div @click="toggleMobileMenu">
                    <img v-if="!menuOpen" src="/svg/burger.svg" alt="" class="w-6 h-6"/>
                    <img v-else src="/svg/burger-close.svg" alt="" class="w-6 h-6"/>
                </div>
            </div>

        </nav>

    </header>

    <div v-if="menuOpen" class="mobileMenu z-20">
      <div class="flex flex-col">
        <NuxtLink to="/" :class="['block py-2', { active: isActive('/') }]" @click="toggleMobileMenu" class="flex justify-start items-center h-20 pl-6 text-xl border-bottom">
            _hello
        </NuxtLink>
        <NuxtLink to="/about-me" :class="['block py-2', { active: isActive('/about-me') }]" @click="toggleMobileMenu" class="flex justify-start items-center h-20 pl-6 text-xl border-bottom">
            _about-me
        </NuxtLink>
        <NuxtLink to="/projects" :class="['block py-2', { active: isActive('/projects') }]" @click="toggleMobileMenu" class="flex justify-start items-center h-20 pl-6 text-xl border-bottom">
            _projects
        </NuxtLink>
        <NuxtLink to="/contact-me" :class="['block py-2', { active: isActive('/contact-me') }]" @click="toggleMobileMenu" class="flex justify-start items-center h-20 pl-6 text-xl border-bottom">
            _contact-me
        </NuxtLink>
      </div>
    </div>
</template>

<style scoped>

.desktop .router-link-active {
  position: relative;
}

.desktop .router-link-active::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: orange;
  animation: transitionScale 0.5s ease-in-out forwards;
}

@keyframes transitionScale {
  0% {
    transform: scaleX(0);
  }
  100% {
    transform: scaleX(1);
  }
}
</style>