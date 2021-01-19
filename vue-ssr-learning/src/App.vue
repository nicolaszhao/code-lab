<template>
  <main>
    <header>
      <h1>Welcome to Vue SSR learning!</h1>
    </header>
    <footer>
      <p>
        &copy; {{ name }}
      </p>
    </footer>
  </main>
</template>

<script>
export default {
  data: () => {
    return {
      name: 'NZ',
    };
  }
}
</script>
