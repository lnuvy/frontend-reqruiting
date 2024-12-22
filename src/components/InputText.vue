<script setup lang="ts">
import { signUpErrorMessages } from "@/constants/regex";
import { ref, computed, watch } from "vue";

type InputTextProps = {
  name: string;
  label: string;
  required?: boolean;
  pattern?: RegExp;
  submitTouched?: boolean;
};

const model = defineModel<string>();
const { label, name, required, pattern, submitTouched } =
  defineProps<InputTextProps>();
const inputRef = ref<HTMLInputElement | null>(null);
const isTouched = ref(false);

const onInput = () => {
  if (model.value) {
    isTouched.value = true;
  }
};

watch(
  () => submitTouched,
  (newValue) => {
    if (newValue) {
      isTouched.value = true;
    }
  },
);

const errorMessage = computed(() => {
  if (!isTouched.value) return "";

  if (!model.value && required) {
    return signUpErrorMessages[name as keyof typeof signUpErrorMessages]
      .required;
  }

  // 값이 있고 패턴이 있을 때 검사
  if (model.value && pattern && !pattern.test(model.value)) {
    return signUpErrorMessages[name as keyof typeof signUpErrorMessages]
      .invalid;
  }

  return "";
});

const clearInput = (event: MouseEvent) => {
  event.preventDefault();
  model.value = "";
  inputRef.value?.focus();
};

const validate = () => {
  isTouched.value = true;
  return errorMessage.value === "";
};

defineExpose({ validate });
</script>

<template>
  <label class="flex flex-col gap-4">
    <p>
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </p>

    <div>
      <div class="relative">
        <input
          ref="inputRef"
          class="h-10 w-full rounded-md border border-gray-400 pl-4 pr-8 hover:border-blue-400 focus:border-green-400 focus:outline-none"
          :class="{
            'border-red-500 hover:border-red-500 focus:border-red-500':
              isTouched && errorMessage,
          }"
          type="text"
          autocomplete="off"
          v-model="model"
          @blur="isTouched = true"
          @input="onInput"
        />
        <button
          type="button"
          v-if="model"
          class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          @click="clearInput"
        >
          ✕
        </button>
      </div>
      <div class="mt-0.5 h-6">
        <Transition
          enter-active-class="transition duration-200 ease-out"
          enter-from-class="transform -translate-y-1 opacity-0"
          enter-to-class="transform translate-y-0 opacity-100"
        >
          <p v-show="errorMessage" class="text-sm text-red-500">
            {{ errorMessage }}
          </p>
        </Transition>
      </div>
    </div>
  </label>
</template>
