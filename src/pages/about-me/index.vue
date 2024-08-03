<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import config from "@/developer.json";
const about = config.about;
const contact = config.contacts;

const currentSectionIndex = ref<number>(0);
const currentFolderIndex = ref<number>(0);
const folderOpen = ref(false);
const contacts = ref(false);
const loading = ref(true);
const hasError = ref(false);

const isActive = computed(() => {
  return (folderIndex: number) => currentFolderIndex.value === folderIndex;
});

const isSectionActive = computed(() => {
  return (index: number) => currentSectionIndex.value === index;
});

const isOpen = computed(() => {
  return (folderIndex: number) => currentFolderIndex.value === folderIndex;
});

function focusCurrentSection(index: number) {
  const section = config.about.sections[index];
  if (section && section.title && section.info) {
    if (currentSectionIndex.value === index) {
      folderOpen.value = !folderOpen.value;
    } else {
      currentSectionIndex.value = index;
      folderOpen.value = true;

      if (section.info.length > 0) {
        currentFolderIndex.value = 0; // Par défaut, sélectionnez le premier dossier
      } else {
        currentFolderIndex.value = -1; // Pas de dossiers disponibles
      }
    }
  }
}

function focusCurrentFolder(folderIndex: number) {
  currentFolderIndex.value = folderIndex;
}

function handleError(error: Error) {
  console.error('Une erreur s\'est produite dans le composant enfant :', error);
  hasError.value = true;
}

onMounted(() => {
  loading.value = false;
});
</script>

<template>
  <main v-if="!loading" class="page flex flex-col lg:flex-row">
    <div data-aos="fade-right" class="flex w-full h-fit lg:max-w-80 lg:min-w-80 lg:h-full">

      <!-- DESKTOP section icons -->
      <div class="hidden lg:flex flex-col items-center w-1/4 border-right">
        <div id="section-icon" v-for="(section, index) in about.sections" :key="section.title" :class="{ active: isSectionActive(index) }" class="my-6 hover:cursor-pointer flex justify-center opacity-40 hover:opacity-100">
          <img :src="section.icon" :alt="section.title + '-section'" @click="focusCurrentSection(index)" class="cursor-pointer">
        </div>
      </div>

      <!-- focused section content -->
      <div class="hidden lg:block w-3/4 h-full border-right">

        <!-- title -->
        <div class="flex items-center min-w-full h-14 border-bottom">
          <img src="/svg/arrow.svg" alt="" class="section-arrow mx-3 rotate-90">
          <p v-html="about.sections[currentSectionIndex].title" class="text-white"></p>
        </div>

        <!-- folders -->
        <div class="border-bottom">
          <div v-for="(folder, folderIndex) in about.sections[currentSectionIndex].info" :key="folderIndex" class="grid grid-cols-2 items-center my-4 font-fira_regular text-menu-text" @click="focusCurrentFolder(folderIndex)">
            <div class="flex col-span-2 hover:text-white hover:cursor-pointer">
              <img src="/svg/diple.svg" alt="" :class="{ open: isOpen(folderIndex) }" class="mx-4">
              <img :src="'/svg/folder' + (folderIndex + 1) + '.svg'" alt="" class="mr-3">
              <p :id="folder.title" v-html="folder.title" :class="{ active: isActive(folderIndex) }"></p>
            </div>
          </div>
        </div>

        <!-- contact-me -->
        <div class="flex items-center min-w-full h-14 border-bottom">
          <img src="/svg/arrow.svg" alt="" class="section-arrow mx-3 rotate-90">
          <p v-html="contact.direct.title" class="text-white"></p>
        </div>
        <div class="lg:flex lg:flex-col my-4">
          <div v-for="(source, key) in contact.direct.sources" :key="key" class="flex items-center mb-4">
            <img v-if="key === 'email'" :src="'/svg/' + key + '.svg'" :alt="`icon email`" class="mx-4">
            <img v-else-if="key === 'phone'" :src="'/svg/' + key + '.svg'" :alt="`icon phone`" class="mx-4">
            <a v-if="key === 'email'" :href="'mailto:' + source" class="text-menu-text hover:text-white truncate">{{ source }}</a>
            <a v-else-if="key === 'phone'" :href="'tel:' + source" class="text-menu-text hover:text-white truncate">{{ source }}</a>
          </div>
        </div>

      </div>

      <!-- mobile -->
      <div class="block lg:hidden w-full">
        <div class="flex justify-start items-center w-full h-16 pl-10 text-white text-xl border-bottom">
          <h2>_about-me</h2>
        </div>

        <div v-for="(section, index) in about.sections" :key="section.title">

          <!-- section title (mobile) -->
          <div :key="section.title" :src="section.icon" class="flex items-center bg-border h-10 mb-1 pl-10 border-bottom" @click="focusCurrentSection(index)">
            <img src="/svg/arrow.svg" :id="'section-arrow-' + section.title" alt="">
            <p v-html="section.title" class="text-white text-sm ml-2"></p>
          </div>

          <!-- folders -->
          <div :id="'folders-' + section.title" v-show="currentSectionIndex === index && folderOpen" class="px-10 py-1">
            <div v-for="(folder, folderIndex) in about.sections[currentSectionIndex].info" :key="folderIndex" class="grid grid-cols-2 items-center my-2 text-menu-text hover:text-white hover:cursor-pointer" @click="focusCurrentFolder(folderIndex)">
              <div class="flex col-span-2">
                <img src="/svg/diple.svg" alt="">
                <img :src="'/svg/folder' + (folderIndex + 1) + '.svg'" alt="" class="mx-3">
                <p :id="folder.title" v-html="folder.title" :class="{ active: isActive(folderIndex) }"></p>
              </div>
            </div>
          </div>

        </div>

        <!-- section content title -->
        <div class="flex items-center bg-border h-10 mb-1 pl-10 border-bottom z-10" @click="contacts = !contacts">
          <img src="/svg/arrow.svg" alt="" class="section-arrow">
          <p v-html="contact.direct.title" class="text-white text-sm ml-2"></p>
        </div>

        <!-- section content folders -->
        <div v-show="contacts" class="pl-10 py-1 border-bottom">
          <div v-for="(source, key) in contact.direct.sources" :key="key" class="flex items-center my-2">
            <img :src="'/svg/' + key + '.svg'" alt="">
            <a v-html="source" href="/" class="text-menu-text hover:text-white ml-4"></a>
          </div>
        </div>

      </div>

    </div>
    <!-- MENU END -->

    <!-- content -->
    <div class="flex flex-grow flex-col w-full lg:grid lg:grid-cols-2">

      <div id="left" class="w-full h-full flex flex-col border-right">

        <!-- windows tab desktop -->
        <div data-aos="fade-left" class="lg:flex hidden items-center tab-height w-full min-h-14 border-bottom">
          <div class="flex items-center border-right h-full">
            <p v-html="about.sections[currentSectionIndex].title" class="text-menu-text px-3"></p>
            <img src="/svg/close.svg" alt="" class="mx-3">
          </div>
        </div>

        <!-- windows tab mobile -->
        <div class="flex lg:hidden my-4 pl-10">
          <span class="text-white">// </span>
          <h3 v-html="about.sections[currentSectionIndex].title" class="text-white px-2"></h3>
          <span class="text-menu-text"> / </span>
          <h3 v-html="about.sections[currentSectionIndex].info[currentFolderIndex].title" class="text-menu-text pl-2"></h3>
        </div>

        <!-- text -->
        <div data-aos="fade-up" class="flex flex-grow w-full lg:border-right">

          <div class="w-full max-h-full mx-10 overflow-y-scroll scrollbar">
            <p data-aos="fade-down" data-aos-delay="300" v-html="about.sections[currentSectionIndex].info[currentFolderIndex].description"></p>
          </div>

          <!-- scroll bar -->
          <div class="min-w-8 h-full border-left hidden lg:flex justify-center py-1">
            <div class="bg-[#607b96] w-3/4 h-3"/>
          </div>

        </div>

      </div>

      <div id="right" class="hidden lg:flex flex-col max-w-full">

        <!-- windows tab -->
        <div data-aos="fade-left" class="items-center tab-height w-full min-h-14 lg:flex border-bottom">
        </div>

        <!-- windows tab mobile -->
        <div class="tab-height w-full h-full flex-none lg:hidden items-center">
        </div>

        <div data-aos="fade-up" class="flex h-full">

          <div v-if="!hasError" class="flex flex-col lg:px-6 lg:py-4 w-full overflow-hidden">
            <!-- title -->
            <h3 class="text-white lg:text-menu-text mb-4 text-sm">// Code snippet showcase:</h3>

            <div class="flex flex-col overflow-y-scroll scrollbar">
              <!-- snippets -->
              <GistSnippet 
                data-aos="fade-down" 
                :data-aos-delay="200 * Number(key)" 
                v-for="(gist, key) in config.gists" 
                :key="key" 
                :id="gist" 
                @error="handleError" 
              />
            </div>
          </div>
          <div v-else>
            <!-- Div affichée en cas d'erreur -->
            <div class="error-message">
              Une erreur s'est produite lors de la récupération des snippets.
            </div>
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

<style scoped>
#section-icon.active {
  opacity: 1;
}
</style>