<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import SnakeGame from "~/components/SnakeGame.vue";
import config from "~/developer.json";
import { useMenuState } from '~/storages/useMenuState';
import { checkIfMobile } from "~/utils/is-mobile";

const { menuOpen } = useMenuState();

const isMobile = ref(false);
const loading = ref(true);

const updateIsMobile = () => checkIfMobile(isMobile);

onMounted(() => {
  updateIsMobile();
  window.addEventListener('resize', updateIsMobile);
  loading.value = false;
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateIsMobile);
});

</script>

<template>
  <main v-if="!loading" class="page flex h-full w-full flex-1 overflow-hidden">
    <!-- gradients -->
    <div v-show="!menuOpen" class="css-blurry-gradient-blue"></div>
    <div v-show="!menuOpen" class="css-blurry-gradient-green"></div>

    <section data-aos="fade-right" class="flex flex-col w-full justify-center xl:pl-64 lg:pl-32 md:pl-16 pl-8">
      <div class="head pb-[3rem]">
                <span class="block text-xl leading-none text-[#E5E9F0]">
                    Hi all, I am
                </span>
        <h1 class="text-7xl leading-none text-[#E5E9F0] pt-4 pb-4">
          {{ config.name }}
        </h1>
        <h2 class="text-5xl leading-none text-[#4D5BCE]">
          > {{ config.role }}
        </h2>
      </div>

      <div id="info" class="flex flex-col space-y-4">
                <span class="text-l leading-none text-[#607B96]" :class="{ 'hidden': isMobile }">
                    // you can also see it on my Github page
                </span>
        <span class="text-l leading-none text-[#607B96]" :class="{ 'hidden': !isMobile }">
                    // find my profile on Github:
                </span>
        <p class="code text-[#E5E9F0]">
                    <span class="text-[#4D5BCE]">
                        const
                    </span>
          <span class="text-[#43D9AD]">
                        githubLink
                    </span>
          <span class="text-text">
                        =
                    </span>
          <a class="text-[#E99287] underline underline-offset-4" :href="'https://github.com/' + config.contacts.social.github.user">
            "https://github.com/{{ config.contacts.social.github.user }}"
          </a>
        </p>
        <span class="text-l leading-none text-[#607B96]" :class="{ 'hidden': isMobile }">
                    // you can also see it on my Root-Me page
                </span>
        <span class="text-l leading-none text-[#607B96]" :class="{ 'hidden': !isMobile }">
                    // find my profile on Root-Me:
                </span>
        <p class="code text-[#E5E9F0]">
                    <span class="text-[#4D5BCE]">
                        const
                    </span>
          <span class="text-[#43D9AD]">
                        RootMeLink
                    </span>
          <span class="text-l leading-none text-[#607B96]" :class="{ 'hidden': !isMobile }">
            // find my profile on Root-Me:
            </span>
          <a class="text-[#E99287] underline underline-offset-4" :href="config.contacts.social.root_me.url + '/' + config.contacts.social.root_me.user">
            "{{ config.contacts.social.root_me.url }}/{{ config.contacts.social.root_me.user }}"
          </a>
        </p>
      </div>
    </section>

    <section data-aos="fade-up" class="game flex flex-col w-full h-full justify-center z-50" v-if="!isMobile">
      <SnakeGame />
    </section>
  </main>
</template>

<style scoped>
.css-blurry-gradient-blue {
  position: fixed;
  bottom: 25%;
  right: 5%;
  width: 300px;
  height: 300px;
  border-radius: 0 0 50% 50%;
  rotate: 10deg;
  filter: blur(70px);
  background: radial-gradient(circle at 50% 50%,rgba(77, 91, 206, 1), rgba(76, 0, 255, 0));
  opacity: 0.5;
  z-index: 10;
  animation: move-blurry-gradient-blue 5s ease-in-out infinite alternate;
}

.css-blurry-gradient-green {
  position: absolute;
  top: 20%;
  right: 30%;
  width: 300px;
  height: 300px;
  border-radius: 0 50% 0 50%;
  filter: blur(70px);
  background: radial-gradient(circle at 50% 50%,rgba(67, 217, 173, 1), rgba(76, 0, 255, 0));
  opacity: 0.5;
  z-index: 10;
  animation: move-blurry-gradient-green 5s ease-in-out infinite alternate;
}

@keyframes move-blurry-gradient-blue {
  0% { transform: translate(-50px, -50px); }
  100% { transform: translate(50px, 50px); }
}

@keyframes move-blurry-gradient-green {
  0% { transform: translate(50px, 50px); }
  100% { transform: translate(-50px, -50px); }
}
</style>