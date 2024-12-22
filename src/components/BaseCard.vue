<template>
  <div class="w-[480px] rounded-lg bg-white p-4 shadow-lg">
    <header class="text-2xl font-semibold">
      <slot name="title" />
    </header>
    <slot name="content" />
  </div>
</template>
