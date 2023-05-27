<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <router-link to="/products" class="navbar-brand">Products</router-link>
        <router-link to="/about" class="navbar-brand">About</router-link>
        <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
        >
        <span class="navbar-toggler-icon"></span>
        </button>
    </nav>
    <router-view />
</template>

<script setup>

</script>

<style>
body {
  background: lightgray !important;
}
</style>