<script setup lang="ts">
import InputText from "./InputText.vue";
import {
  NAME_REGEX,
  ORGANIZATION_REGEX,
  USER_ID_REGEX,
} from "@/constants/regex";
import { useSignUpForm } from "@/composables/useFormValidation";

const { formData, submitTouched, handleSubmit } = useSignUpForm();
</script>

<template>
  <form class="flex flex-col gap-2 py-4" @submit.prevent="handleSubmit">
    <InputText
      label="User ID"
      name="userId"
      v-model="formData.userId"
      required
      :pattern="USER_ID_REGEX"
      :submit-touched="submitTouched"
    />
    <InputText
      label="Name"
      name="name"
      v-model="formData.name"
      required
      :pattern="NAME_REGEX"
      :submit-touched="submitTouched"
    />
    <InputText
      label="Organization"
      name="organization"
      v-model="formData.organization"
      :pattern="ORGANIZATION_REGEX"
      :submit-touched="submitTouched"
    />
    <button class="rounded-md bg-blue-500 px-4 py-2 text-white">Submit</button>
  </form>
</template>
