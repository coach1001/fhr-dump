<template>
  <v-layout column justify-center>
    <h1>Sqlite Test</h1>
    <v-layout row>
      <v-flex xs6>
        <v-list>
          <v-btn @click="createPDF">Export</v-btn>
          <v-list-tile v-for="genre in genres" key="`genre_${genre.GenreId}`">
            <v-list-tile-content>
              <v-list-tile-title>
                {{genre.Name}}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-flex>
      <v-flex xs6>
<!--         <iframe :src="`file:${pdfUrl}`" style="margin: 5px;width: 100%;height: 90vh;">
        </iframe>
 -->      </v-flex>
    </v-layout>
  </v-layout>
</template>

<script>
import { ipcRenderer } from 'electron'

export default {
  name: 'welcome',
  data: () => ({
    genres: [],
    pdfUrl: ''
  }),
  methods: {
    createPDF () {
      ipcRenderer.send('create-pdf')
    }
  },
  mounted () {
    ipcRenderer.send('get-genres')
    ipcRenderer.on('post-genres', (evt, arg) => {
      this.genres = arg
    })
    ipcRenderer.on('created-pdf', (evt, arg) => {
      console.log('path updated')
      this.pdfUrl = arg.path
    })
  }
}
</script>

<style scoped>
</style>
