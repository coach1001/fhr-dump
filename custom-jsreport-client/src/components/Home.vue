<template>
  <div class="">
    <div class="file-container" style="padding-right: 5px;">
      <div class="file-list-container">
        <div class="menu-label">
          <h3 class="title is-4">Reports</h3>
        </div>
        <ul class="menu-list">
          <li><a>Expense Request</a></li>
          <li><a>Project Review</a></li>
        </ul>
      </div>
      <div class="file-options-container">
        <div class="menu-label">
          <h3 class="title is-4">Report Options</h3>
        </div>
      </div>
      <div></div>
    </div>
    <div class="html-container" style="padding-right: 5px;">
      <vue-editor class="html-editor" v-model="content"></vue-editor>
    </div>
    <div class="pdf-container">
      <div class="menu-label">
        <h3 class="title is-4">Preview</h3>
      </div>

    </div>
  </div>
</template>

<script>
import { VueEditor } from 'vue2-editor'

export default {
  name: 'Home',
  components: {
    VueEditor
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      content: '<h1>HTML</h1>'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.is-5-padding{
  padding: 5px;
}
.file-container{
  flex: 3;
  display: flex;
  flex-direction: column;
}
.html-container{
  flex: 4;
  display: flex;
  direction: column;
}
.html-editor {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.pdf-container{
  flex: 5;
}
.file-list-container{
  flex: 4;
}
.file-options-container{
  flex: 5;

}
.ql-container {
  flex: 1 !important;
}
</style>

<style>
#quill-container {
  flex: 1;
}
</style>
