<script setup lang="ts">
import BaseCard from "./components/BaseCard.vue";
import SignUpForm from "./components/SignUpForm.vue";
</script>

<template>
  <div class="flex h-screen w-screen flex-col items-center justify-center">
    <BaseCard>
      <template #title>Sign Up</template>
      <template #content>
        <SignUpForm id="signUpForm" />
      </template>
    </BaseCard>
  </div>
</template>
