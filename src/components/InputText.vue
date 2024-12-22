<script setup lang="ts">
import { ref, watch } from "vue";

type InputTextProps = {
  label: string;
};

const model = defineModel<string>();
defineProps<InputTextProps>();
const inputRef = ref<HTMLInputElement | null>(null);
const showCloseButton = ref(false);

watch(model, (value) => {
  showCloseButton.value = value !== "";
});

const clearInput = (event: MouseEvent) => {
  event.preventDefault();
  model.value = "";
  inputRef.value?.focus();
};
</script>

<template>
  <label class="flex flex-col gap-4">
    {{ label }}
    <div class="relative">
      <input
        ref="inputRef"
        class="h-10 w-full rounded-md border border-gray-400 pl-4 pr-8 invalid:border-red-500 hover:border-blue-400 focus:border-green-400 focus:outline-none"
        type="text"
        autocomplete="off"
        v-model="model"
      />
      <button
        type="button"
        v-if="showCloseButton"
        class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
        @click="clearInput"
      >
        ✕
      </button>
    </div>
  </label>
</template>
