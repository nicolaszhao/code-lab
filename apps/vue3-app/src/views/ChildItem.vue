<script setup lang="ts">
import { ref } from 'vue';

const a = ref(1);
const b = ref(2);

defineExpose({
  a,
  b,
});
</script>

<template>
  <div>
    <slot a="A" b="B"></slot>
  </div>
</template>
