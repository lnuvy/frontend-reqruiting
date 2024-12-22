import { ref, computed } from "vue";
import {
  NAME_REGEX,
  ORGANIZATION_REGEX,
  USER_ID_REGEX,
} from "@/constants/regex";

export const useSignUpForm = () => {
  const formData = ref({
    userId: "",
    name: "",
    organization: "",
  });
  const submitTouched = ref(false);

  const validationRules = {
    userId: { pattern: USER_ID_REGEX, required: true },
    name: { pattern: NAME_REGEX, required: true },
    organization: { pattern: ORGANIZATION_REGEX, required: false },
  } as const;

  const _validateField = (field: keyof typeof validationRules) => {
    const { pattern, required } = validationRules[field];
    const value = formData.value[field];
    if (!required && !value) return true;
    return value.length > 0 && pattern.test(value);
  };

  const validations = computed(() => ({
    userId: _validateField("userId"),
    name: _validateField("name"),
    organization: _validateField("organization"),
  }));

  const isFormValid = computed(() =>
    Object.values(validations.value).every((isValid) => isValid),
  );

  const handleSubmit = () => {
    submitTouched.value = true;
    if (isFormValid.value) {
      alert(
        `User ID: ${formData.value.userId}\nName: ${formData.value.name}\nOrganization: ${formData.value.organization}`,
      );
    }
  };

  return {
    formData,
    submitTouched,
    isFormValid,
    handleSubmit,
  };
};
