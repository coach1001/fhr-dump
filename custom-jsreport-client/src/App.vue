<template>
  <div id="app" class="main-container">
    <nav class="navbar is-dark">
      <div class="navbar-menu">
        <div class="navbar-start">
          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link" href="/documentation/overview/start/">
              File
            </a>
            <div class="navbar-dropdown">
              <a class="navbar-item" href="/documentation/overview/start/">
                Save Copy of Report
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <router-view class="router-container"/>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
@import './assets/bulma.css';
.main-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  height: 100vh;
}
.router-container {
  flex: 1;
  display: flex;
  flex-direction: row;
  padding: 5px;
}
</style>
