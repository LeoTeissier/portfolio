<script setup lang="ts">
import { ref, onMounted } from 'vue';
import hljsVuePlugin from "@highlightjs/vue-plugin";
import 'highlight.js/lib/common';
import type { Gist } from './path-to-your-interface-file';

const props = defineProps({
  id: {
    type: String,
    required: true
  }
});

// Déclaration du composant hljsVuePlugin
const highlightjs = hljsVuePlugin.component;

// Définition des propriétés réactives
const gist = ref<Gist>({
  url: '',
  forks_url: '',
  commits_url: '',
  id: '',
  node_id: '',
  git_pull_url: '',
  git_push_url: '',
  html_url: '',
  files: {},
  public: false,
  created_at: '',
  updated_at: '',
  description: null,
  comments: 0,
  user: null,
  comments_url: '',
  owner: {
    login: '',
    id: 0,
    avatar_url: '',
    gravatar_id: '',
    url: '',
    html_url: '',
    followers_url: '',
    following_url: '',
    gists_url: '',
    starred_url: '',
    subscriptions_url: '',
    organizations_url: '',
    repos_url: '',
    events_url: '',
    received_events_url: '',
    type: '',
    site_admin: false,
  },
  truncated: false,
});
const github_token = ref<string>('');
const monthsAgo = ref<number | null>(null);
const content = ref<string>('');
const language = ref<string>('');
const dataFetched = ref(false);
const showError = ref(false);
const showComments = ref(false);
const comment = ref<string>('');
const stared = ref(false);

// Définition des méthodes
const fetchData = async () => {
  try {
    const response = await fetch(`https://api.github.com/gists/${props.id}`);
    if (!response.ok) { // Vérifie si la réponse est négative
      showError.value = true;
      return;
    }
    const gistData: Gist = await response.json();
    await setValues(gistData);
    dataFetched.value = true;
  } catch (error) {
    console.error(error);
    showError.value = true; // Active l'affichage de l'erreur en cas d'exception
  }
};

const starGist = async (gistId: string) => {
  try {
    await fetch(`https://api.github.com/gists/${gistId}/star`, {
      method: 'PUT',
      headers: {
        'Authorization': `token ${github_token.value}`, // Vous aurez besoin d'un token GitHub pour cette action
      },
    });
    stared.value = true;
  } catch (error) {
    console.error('Erreur lors de l’ajout aux favoris:', error);
  }
};

// Retire un Gist des favoris
const unstarGist = async (gistId: string) => {
  try {
    await fetch(`https://api.github.com/gists/${gistId}/star`, {
      method: 'DELETE',
      headers: {
        'Authorization': `token ${github_token.value}`, // Vous aurez besoin d'un token GitHub pour cette action
      },
    });
    stared.value = false;
  } catch (error) {
    console.error('Erreur lors du retrait des favoris:', error);
  }
};

const setComments = async (commentsUrl: string) => {
  try {
    const response = await fetch(commentsUrl);
    const commentsData = await response.json();
    comment.value = commentsData.length > 0 ? commentsData[0].body : null;
  } catch (error) {
    console.error('Error fetching comments:', error);
  }
};

const setMonths = (date: string) => {
  const createdDate = new Date(date);
  const currentDate = new Date();
  monthsAgo.value = Math.round((currentDate.getTime() - createdDate.getTime()) / (1000 * 60 * 60 * 24 * 30));
};

const setSnippet = (gistData: Gist) => {
  const fileName = Object.keys(gistData.files)[0];
  const fileData = gistData.files[fileName];
  content.value = fileData.content;
  language.value = fileData.language;
};

const setValues = async (gistData: Gist) => {
  gist.value = gistData;
  setMonths(gistData.created_at);
  setSnippet(gistData);
  await setComments(gistData.comments_url);
};

const toggleComments = () => {
  showComments.value = !showComments.value;
};

onMounted(fetchData);
</script>


<template>
  <div class="mb-6" v-if="dataFetched && !showError">
    <!-- Gist Header -->
    <div class="flex justify-between my-2">
      <div class="flex">
        <img :src="gist.owner.avatar_url" alt="Avatar" class="w-8 h-8 rounded-full mr-2">

        <div class="flex flex-col">
          <a :href="'https://github.com/' + gist.owner.login" target="_blank" class="font-fira_bold text-purple-text text-xs pb-1 hover:cursor-pointer">@{{ gist.owner.login }}</a>
          <p class="text-xs text-menu-text">Created {{ monthsAgo }} months ago</p>
        </div>
      </div>

      <div class="flex text-menu-text text-xs justify-self-end lg:mx-2">
        <div class="flex lg:mx-2">
          <img src="/svg/gist/comments.svg" alt="" class="w-4 h-4 mr-2">
          <span class="hover:cursor-pointer hover:text-white" @click="toggleComments">details</span>
        </div>
        <div class="hidden lg:flex">
          <img v-if="!stared" src="/svg/gist/star-line.svg" alt="" class="w-4 h-4 mx-2">
          <img v-else src="/svg/gist/star-fill.svg" alt="" class="w-4 h-4 mx-2">
          <span v-if="!stared" class="hover:cursor-pointer hover:text-white" @click="starGist(gist.id)">stars</span>
          <span v-else class="hover:cursor-pointer hover:text-white" @click="unstarGist(gist.id)">stars</span>
        </div>
      </div>
    </div>

    <!-- Gist Content -->
    <highlightjs class="snippet-container" :code="content" :language="language" />

    <!-- Gist Comments -->
    <div v-if="showComments" :id="'comment' + gist.id" class="flex justify-between text-menu-text mt-4 pt-4 border-top">
      <p id="comment" v-if="comment" class="w-5/6">{{ comment }}</p>
      <p v-else class="w-5/6">No comments.</p>
      <img src="/svg/close.svg" alt="" class="hover:cursor-pointer" @click="toggleComments">
    </div>

    <div v-if="showError" class="flex flex-col text-menu-text my-5 h-full justify-center items-center">
      <span class="flex justify-center text-4xl pb-3">
        X__X
      </span>
        <span class="text-white flex justify-center text-xl">
        No Gist found
      </span>
        <span class="flex justify-center">
        <a href="https://gist.github.com/" target="_blank" class="text-purple-text hover:underline">Create a Gist</a>
      </span>
    </div>

  </div>
</template>

<style>
.snippet-container {
    background-color: #011221;
    padding: 5px;
    border-radius: 15px;
    border: 1px solid #1E2D3D;
    font-size: 12px;
    overflow-y: scroll;
    overflow-x: scroll;
    max-height: 220px;
}

.snippet-container pre {
    margin: 0;
    overflow: hidden;
    width: 100%;
    max-height: 220px;
}

.snippet-container code {
    white-space: pre-wrap;
    max-height: 220px;
    width: max-content;
    overflow: hidden;

}

.snippet-container::-webkit-scrollbar {
    display: none;  /* Safari and Chrome */
}

pre code.hljs{
    display:block;
    /* overflow-x:auto; */
    padding:1.5em
}

code.hljs{
    padding:3px 5px
}

#comment {
    font-size: 14px;
}

.hljs{color:#607B96;background:#011221}.hljs-doctag,.hljs-keyword,.hljs-meta .hljs-keyword,.hljs-template-tag,.hljs-template-variable,.hljs-type,.hljs-variable.language_{color:#ff7b72}.hljs-title,.hljs-title.class_,.hljs-title.class_.inherited__,.hljs-title.function_{color:#d2a8ff}.hljs-attr,.hljs-attribute,.hljs-literal,.hljs-meta,.hljs-number,.hljs-operator,.hljs-selector-attr,.hljs-selector-class,.hljs-selector-id,.hljs-variable{color:#79c0ff}.hljs-meta .hljs-string,.hljs-regexp,.hljs-string{color:#a5d6ff}.hljs-built_in,.hljs-symbol{color:#ffa657}.hljs-code,.hljs-comment,.hljs-formula{color:#8b949e}.hljs-name,.hljs-quote,.hljs-selector-pseudo,.hljs-selector-tag{color:#7ee787}.hljs-subst{color:#c9d1d9}.hljs-section{color:#1f6feb;font-weight:700}.hljs-bullet{color:#f2cc60}.hljs-emphasis{color:#c9d1d9;font-style:italic}.hljs-strong{color:#c9d1d9;font-weight:700}.hljs-addition{color:#aff5b4;background-color:#033a16}.hljs-deletion{color:#ffdcd7;background-color:#67060c}

</style>