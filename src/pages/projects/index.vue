<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import config from '@/developer.json';
import type Projet from '@/interfaces/projet';

const projects = ref<Projet[]>([]);
const techs = ref<string[]>([]);
const filters = ref(['all']);
const loading = ref(true);
const isFilterMenuVisible = ref(false);

onMounted(() => {
  projects.value = config.projects;
  loading.value = false;
  techs.value = getUsedTechs();
})

function getUsedTechs() {
  const projectArray = config.projects;
  const techSet = new Set<string>();

  if (Array.isArray(projectArray)) {
    projectArray.forEach(project => {
      if (Array.isArray(project.tech)) {
        project.tech.forEach(tech => techSet.add(tech));
      }
    });
  }

  return Array.from(techSet);
}

function filterProjects(tech: string) {
  const allIndex = filters.value.indexOf('all');
  if (tech === 'all') {
    filters.value = ['all'];
  } else {
    if (allIndex > -1) {
      filters.value.splice(allIndex, 1); // Retire 'all' si présent
    }
    const techIndex = filters.value.indexOf(tech);
    if (techIndex > -1) {
      filters.value.splice(techIndex, 1); // Désélectionne la technologie
    } else {
      filters.value.push(tech); // Sélectionne la nouvelle technologie
    }
  }

  if (filters.value.length === 0) {
    filters.value.push('all');
  }

  projects.value = filterProjectsBy(filters.value);
}

const filtersKey = computed(() => filters.value.join(','));

function filterProjectsBy(filters: string[]) {
  if (filters.includes('all')) {
    return config.projects;
  }

  const projectArray = config.projects;
  return projectArray.filter(project => {
    return project.tech.some(tech => filters.includes(tech));
  });
}

function isFilterActive(tech: string) {
  return filters.value.includes(tech);
}

function fadeDirection() {
  const directions = ['left', 'right', 'up', 'down'];
  const direction = directions[Math.floor(Math.random() * directions.length)];
  return `fade-${direction}`;
}

function fadeDelay(key: number) {
  return key * 200;
}
</script>

<template>
  <main v-if="!loading" class="page flex flex-col flex-auto lg:flex-row overflow-hidden">

    <div class="lg:hidden flex justify-start items-center w-full min-h-16 pl-10 text-white text-xl border-bottom">
      <h2>_projects</h2>
    </div>

    <!-- section title (mobile) -->
    <div class="lg:hidden flex items-center bg-border min-h-10 mb-1 pl-10 border-bottom" @click="isFilterMenuVisible = !isFilterMenuVisible">
      <img alt="" class="section-arrow" src="/svg/arrow.svg">
      <p class="text-white text-sm ml-2">projects</p>
    </div>

    <div data-aos="fade-right" class="w-full flex-col border-0 text-menu-text lg:flex lg:max-w-80 lg:min-w-80 border-color lg:border-r">
      <!-- title -->
      <div class="hidden lg:flex items-center min-w-full min-h-14 border-bottom px-6 py-2">
        <img src="/svg/arrow.svg" alt="" class="section-arrow mx-3 rotate-90">
        <p class="text-white">projects</p>
      </div>

      <!-- filter menu -->
      <nav class="hidden lg:block w-full flex-col pl-10 pt-5">

        <div v-for="tech in techs" :key="tech" class="flex items-center py-2">
          <input type="checkbox" :id="tech" @click="filterProjects(tech)">
          <img :id="'icon-tech-' + tech" :src="'/svg/techs/' + tech + '.svg'" alt="" class="w-6 h-6 mx-4" :style="{ opacity: isFilterActive(tech) ? 1 : 0.4 }">
          <span :id="'title-tech-' + tech" class="text-xl" :style="{ opacity: isFilterActive(tech) ? 1 : 0.4 }">{{ tech.charAt(0).toUpperCase() + tech.slice(1) }}</span>
        </div>
      </nav>

      <nav v-show="isFilterMenuVisible" class="lg:hidden block w-full flex-col px-10 py-2 border-bottom">

        <div v-for="tech in techs" :key="tech" class="flex items-center py-2">
          <input type="checkbox" :id="tech" @click="filterProjects(tech)">
          <img :id="'icon-tech-' + tech" :src="'/svg/techs/' + tech + '.svg'" alt="" class="w-6 h-6 mx-4" :style="{ opacity: isFilterActive(tech) ? 1 : 0.4 }">
          <span :id="'title-tech-' + tech" class="text-xl" :style="{ opacity: isFilterActive(tech) ? 1 : 0.4 }">{{ tech.charAt(0).toUpperCase() + tech.slice(1) }}</span>
        </div>
      </nav>
    </div>

    <!-- content -->

    <div class="flex flex-grow flex-col w-full overflow-hidden">

      <!-- windows tab -->
      <div data-aos="fade-left" class="w-full min-h-14 hidden lg:flex border-bottom items-center">
        <div class="flex items-center border-right h-full">
          <p v-for="filter in filters" :key="filter" class="font-fira_regular text-menu-text px-3">{{ filter }};</p>
          <img src="/svg/close.svg" alt="" class="m-3">
        </div>
      </div>

      <!-- windows tab mobile -->
      <div class="flex lg:hidden items-center my-4 pl-10">
        <span class="text-white"> // </span>
        <p class="text-white px-3">projects</p>
        <span class="text-menu-text"> / </span>
        <p v-for="filter in filters" :key="filter" class="text-menu-text px-3">{{ filter }};</p>
      </div>

      <!-- projects -->
      <div data-aos="fade-up"  class="flex flex-wrap justify-evenly w-full h-full py-4 px-10 lg:p-10 overflow-y-scroll scrollbar">

        <transition-group v-if="projects.length > 0" name="fade" tag="div" :key="filtersKey" class="flex flex-wrap justify-evenly">

          <div v-for="(project, key) in projects" :key="key" class="w-full mb-4 lg:w-[30%] lg:h-fit" :data-aos="fadeDirection()" :data-aos-delay="fadeDelay(key)">
            <!-- title -->
            <span class="flex text-sm mb-3">
              <h3 class="text-accent mr-3">Project {{ key + 1 }}</h3>
              <h4 class="text-menu-text"> // {{ project.title }}</h4>
            </span>

            <!-- info -->
            <div class="flex flex-col border border-color rounded-xl">
              <div class="relative">
                <div class="absolute flex right-3 top-3">
                  <img v-for="tech in project.tech" :key="tech" :src="'/svg/techs/filled/' + tech + '.svg'" alt="" class="w-6 h-6 mx-1 hover:opacity-75">
                </div>
                <img v-if="project.img" :src="project.img" alt="" class="rounded-t-xl">
                <div v-else class="in-progess-background rounded-t-xl"></div>
              </div>

              <div class="pb-8 pt-6 px-6 border-top">
                <p class="text-menu-text mb-5">
                  {{ project.description }}
                </p>
                <div class="flex justify-between">
                  <a v-if="project.url != ''" :href="project.url" target="_blank" class="bg-[#1E2D3D] hover:bg-[#4D5BCE] text-white py-2 px-4 w-fit rounded-lg">
                    view-project
                  </a>

                  <p v-else class="bg-border hover:bg-secondary-dark text-white py-2 px-4 w-fit rounded-lg">
                    work-in-progress
                  </p>

                  <a v-if="project.github" :href="project.github" target="_blank" class="bg-[#1E2D3D] hover:bg-[#4D5BCE] text-white py-2 px-4 w-fit rounded-lg ml-2">
                    view-github
                  </a>
                </div>
              </div>
            </div>
          </div>

        </transition-group>

        <div v-else class="flex flex-col text-menu-text my-5 h-full justify-center items-center">
          <span class="flex justify-center text-4xl pb-3">
            X__X
          </span>
          <span class="text-white flex justify-center text-xl">
            No matching projects
          </span>
          <span class="flex justify-center">
            for these technologies
          </span>
        </div>

      </div>
    </div>
  </main>
</template>

<style scoped>

.in-progess-background {
  background: linear-gradient(180deg, #1a202c 0%, #2d3748 100%);
  height: 150px;
}

input[type="checkbox"] {
  appearance: none;
  background-color: transparent;
  width: 1.25em;
  height: 1.25em;
  border: 2px solid currentColor;
  border-radius: 0.15em;
  margin-top: 1px;
}

input[type="checkbox"]:checked {
  background-color: currentColor;
  background-image: url("data:image/svg+xml;utf8,<svg width='13' height='10' viewBox='0 0 13 10' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M5.38587 7.2802L11.9718 0.693573L12.9856 1.70668L5.38587 9.30641L0.826172 4.74671L1.83928 3.73361L5.38587 7.2802Z' fill='white'/></svg>");
  background-repeat: no-repeat;
  background-position: center;
}

input[type="checkbox"]:checked:hover {
  box-shadow: #607b968b 0 0 0 2px;
}

input[type="checkbox"]:not(:checked) {
  border-color: currentColor;
}

input[type="checkbox"]:hover {
  cursor: pointer;
  background-color: currentColor;
  background-image: url("data:image/svg+xml;utf8,<svg width='13' height='10' viewBox='0 0 13 10' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M5.38587 7.2802L11.9718 0.693573L12.9856 1.70668L5.38587 9.30641L0.826172 4.74671L1.83928 3.73361L5.38587 7.2802Z' fill='white'/></svg>");
  background-repeat: no-repeat;
  background-position: center;
  box-shadow: #607b968b 0 0 0 2px;
}

input[type="checkbox"]:hover:not(:checked) {
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.1);
  background-image: none;
  box-shadow: #607b968b 0 0 0 2px;
}

input[type="checkbox"]:focus {
  box-shadow: none;
}
</style>
