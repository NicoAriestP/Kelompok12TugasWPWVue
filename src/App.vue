<template>
    <main>
      //all matched routes will be rendered here
        <router-view :key="$route.path" />
    </main>
</template>

<script>
export default {};
</script>

<style>
body {
  background: lightgray !important;
}
</style>