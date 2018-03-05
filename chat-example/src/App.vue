<template>
  <v-app>
    <v-content>
      <v-container fluid>

        <v-layout row>
          <v-flex xs3>
            <v-text-field label="Channel" v-model="channel"></v-text-field>
          </v-flex>
          <v-flex xs1>
            <v-btn color="primary" @click="setChannel">Set Channel</v-btn>
          </v-flex>
        </v-layout>

        <v-layout row>
          <v-flex xs3>
            <v-text-field label="Message" v-model="message"></v-text-field>
          </v-flex>
          <v-flex xs3>
            <v-btn color="secondary" @click="sendMessage">Send Message</v-btn>
          </v-flex>
        </v-layout>

        <v-layout row>
          <v-flex xs12>
            <v-text-field multi-line label="Message Log" v-model="messageLog"></v-text-field>
          </v-flex>
        </v-layout>
        <v-btn color="flat" @click="clearLog">Clear Log</v-btn>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  export default {
    data () {
      return {
        channel: 'chat',
        message: '',
        messageLog: '',
        jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2RlIjoicncifQ.QKGnMJe41OFZcjz_qQSplmWAmVd_hmVjijKUNoJYpis',
        base: 'ws://localhost:3000',
        $socket: null
      }
    },
    methods: {
      openSocket () {
        if (this.$socket === null) {
        } else {
          this.$socket.close()
        }
        this.$socket = new WebSocket(`${this.base}/${this.channel}/${this.jwt}`)
        console.log(this.$socket)
        this.$socket.onopen = function (evt) {
          this.$socket.onmessage = function (evt) {
            this.messageLog += `${evt.data}\n`
          }.bind(this)
        }.bind(this)
      },
      setChannel () {
        this.openSocket()
      },
      sendMessage () {
        this.$socket.send(this.message)
        this.message = ''
      },
      clearLog () {
        this.messageLog = ''
      }
    },
    mounted () {
      console.log('Mounted')
      this.openSocket()
    },
    beforeDestroy () {
      this.$socket.close()
      this.$socket = null
    }
  }
</script>
