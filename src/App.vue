<script setup lang="ts">
import { f7App, f7View, f7Page, f7Navbar, f7Toolbar, f7Link } from 'framework7-vue'
</script>

<template>
  <f7-app v-bind="{ theme: 'auto', name: '九千定制', id: 'com.jiuqian'}">
    <f7-view main>
      <f7-page>
        <f7-navbar title="Awesome App"></f7-navbar>
        <f7-toolbar bottom>
          <f7-link>Link 1</f7-link>
          <f7-link>Link 2</f7-link>
        </f7-toolbar>
        <p>Page content goes here</p>
        <f7-link href="/about/">About App</f7-link>
      </f7-page>
    </f7-view>
  </f7-app>
</template>

<style scoped>
</style>
