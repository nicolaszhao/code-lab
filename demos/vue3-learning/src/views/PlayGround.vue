<template>
  <ul>
    <li v-for="(value, key, index) in obj" :key="key">
      {{ index }}. {{ value }} - <span v-for="n in value + 1" :key="n">{{ n }}</span>
    </li>
  </ul>
  <a class="link-box" href="https://baidu.com" @click.self.prevent="handle">
    <span></span>
  </a>
  <input v-model.trim="text" placeholder="input text" ref="input" />
  <span>"{{ text }}"</span>
  <ChildItem ref="child" v-slot="{ a, b }"> {{ a }} -- {{ b }} </ChildItem>
  <em>
    {{ $demo('abc') }}
  </em>
  <button @click="add">+</button>
  <button @click="remove">-</button>
  <TransitionGroup name="list" tag="ul">
    <li v-for="(item, index) in items" :key="item">
      {{ item }}
    </li>
  </TransitionGroup>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import ChildItem from './ChildItem.vue';

const obj = ref({
  a: 1,
  b: 2,
  c: 3,
});

const text = ref('');

const items = ref([1, 2, 3]);

function add() {
  items.value.push(Math.ceil(Math.random() * 10));
}

function remove() {
  const index = Math.floor(Math.random() * items.value.length);
  console.log(index);
  items.value.splice(index, 1);
}

const input = ref<HTMLInputElement | null>(null);
const child = ref<InstanceType<typeof ChildItem> | null>(null);

function handle() {
  console.log(`trigget handle`);
  console.log(child.value?.a);
}

watch(text, (newText) => console.log(`"${newText}"`));

onMounted(() => {
  input.value?.focus();
});
</script>

<style>
.link-box {
  display: inline-flex;
  padding: 3em 5em;
  border: 1px dashed rgba(0, 0, 0, 0.15);

  span {
    display: inline-block;
    width: 3em;
    height: 3em;
    border: 1px dotted rgba(0, 0, 0, 0.25);
  }
}

.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.list-leave-active {
  position: absolute;
}
</style>
