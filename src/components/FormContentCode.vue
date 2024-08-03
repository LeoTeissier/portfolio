<script setup lang="ts">
import { ref } from 'vue';

defineProps({
  email: String,
  subject: String,
  message: String,
});

const date = ref(new Date().toDateString());

</script>


<template>
<div class="flex items-center">
    <div class="text-white w-full pl-0 break-word text-xl">
        <p>
            <span class="text-extra">
                const
            </span>
            <span class="text-secondary">
                button
            </span>
            <span class="text-white">
                = 
            </span>
            <span class="text-secondary">
                document.querySelector
                <span class="text-primary">
                    (
                        <span class="text-accent">
                            '#sendBtn'
                        </span>
                    );
                </span>
            </span>
        </p>
        <br>
        <p class="text-primary">
            <span class="text-extra">
                const
            </span>
            <span class="text-secondary">
                message
            </span>
            = { <br> &nbsp;&nbsp;
            <span id="email" class="text-secondary">
                email
            </span>
            :
            <span class="text-accent">
                "{{ email }}"
            </span>
            , <br> &nbsp;&nbsp;
            <span class="text-accent">
                subject
            </span>
            :
                <span class="text-accent">
                "{{ subject }}"
            </span>
            , <br> &nbsp;&nbsp;
            <span class="text-secondary">
                message
            </span>
            :
                <span class="text-accent">
                "{{ message }}"
            </span>
            , <br> &nbsp;&nbsp;
                date: 
            <span class="text-accent">
                "{{ date }}"
            </span>
            <br>
            }
        </p>
        <br>
        <p>
            <span class="text-secondary">
                button.addEventListener
                <span class="text-primary">
                    (
                        <span class="text-accent">
                            'click'
                        </span>
                    ), () 
                    <span class="text-extra">
                        =>
                    </span>
                    {
                    <br>
                </span>
                &nbsp;&nbsp;form.send
                <span class="text-primary">(</span>
                    message
                <span class="text-primary">); <br> })</span>
            </span>
        </p>
    </div>
</div>
</template>

<style scoped>

</style>