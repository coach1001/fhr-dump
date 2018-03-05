<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-container fluid>

        <v-layout row fluid class="mb-3">
            <v-flex>
              <v-btn color="primary" @click="save">Save Changes</v-btn>
              <v-btn color="secondary" @click="revert">Revert Changes</v-btn>
            </v-flex>
        </v-layout>

        <v-layout row class="mb-3">
          <v-flex xs12>
            <v-card>
              <v-toolbar color="indigo darken-4" dark>
                <v-btn fab dark small color="primary" @click="customerOrders.push({id_customer: customerId})">
                  <v-icon dark>add</v-icon>
                </v-btn>
                <v-toolbar-title>Orders</v-toolbar-title>
              </v-toolbar>
              <v-list two-line>
                <v-list-tile v-for="(order, index) in customerOrders" :key="order.id" @click="orderSelected(order)">
                      <v-flex xs3>
                        <v-text-field
                        label="Id"
                        v-model="order.id"
                        disabled
                        ></v-text-field>
                      </v-flex>
                      <div class="ml-5"></div>
                      <v-flex xs3>
                        <v-text-field
                        label="Customer Id"
                        v-model="order.id_customer"
                        disabled
                        ></v-text-field>
                      </v-flex>
                      <div class="ml-5"></div>
                      <v-flex xs2>
                        <v-dialog
                        persistent
                        v-model="modal[index]"
                        lazy
                        full-width
                        width="290px"
                        >
                        <v-text-field
                        slot="activator"
                        label="Picker in dialog"
                        v-model="order.creation_date"
                        prepend-icon="event"
                        readonly
                        ></v-text-field>
                        <v-date-picker v-model="order.creation_date" scrollable actions>
                          <template slot-scope="{ save, cancel }">
                            <v-card-actions>
                              <v-spacer></v-spacer>
                              <v-btn flat color="primary" @click="cancel">Cancel</v-btn>
                              <v-btn flat color="primary" @click="save">OK</v-btn>
                            </v-card-actions>
                          </template>
                        </v-date-picker>
                      </v-dialog>
                    </v-flex>
                    <v-spacer></v-spacer>
                    <v-btn fab dark small color="red" @click.stop="deleteOrder(index)">
                      <v-icon dark>remove</v-icon>
                    </v-btn>
                </v-list-tile>
              </v-list>
            </v-card>
          </v-flex>
        </v-layout>

        <v-layout row class="mb-3">
          <v-flex xs12>
            <v-card>
              <v-toolbar color="indigo darken-4" dark>
                <v-toolbar-title>Order Items ({{order}})</v-toolbar-title>
              </v-toolbar>
              <v-list two-line v-if="orderItems.length > -1">
                <v-list-tile v-for="(oitem, index) in orderItems" v-bind:key="oitem.id">

                  <v-flex xs9>
                    {{items[items.findIndex(it => it.id === oitem.id_item)].name}}
                  </v-flex>

                  <v-flex xs3>
                    {{oitem.units}}
                  </v-flex>

                  <v-btn fab dark small color="red" @click="orderItems.splice(index, 1)">
                    <v-icon dark>remove</v-icon>
                  </v-btn>

                </v-list-tile>
              </v-list>
            </v-card>
          </v-flex>
        </v-layout>

        <v-layout row>
          <v-flex xs12>
            <v-card>
              <v-toolbar color="indigo darken-4" dark>
                <v-toolbar-title>Items</v-toolbar-title>
              </v-toolbar>
              <v-list>
                <v-list-tile v-for="item in items" v-bind:key="item.id" @click.stop="pushItem(item)">
                  <v-btn fab dark small color="primary">
                    <v-icon dark>add</v-icon>
                  </v-btn>
                  {{item.name}}
                  <v-spacer></v-spacer>
                  {{item.price}}
                </v-list-tile>
              </v-list>
            </v-card>
          </v-flex>
        </v-layout>

      </v-container>
    </v-slide-y-transition>
  </v-container>
</template>


<script>
import _ from 'lodash'
import store from '@/store/index.js'

export default {
  name: 'Store',
  data () {
    return {
      modal: [],
      customerId: '3ff93ba3-a0c7-4433-863f-8666b303578e',
      items: _.cloneDeep(this.$store.state.item.all),
      customerOrders: _.cloneDeep(this.$store.state.order.all),
      orderItems: [],
      order: '',
      people: [
        { icon: true, title: 'Jason Oner', avatar: 'https://vuetifyjs.com/static/doc-images/lists/1.jpg' },
        { title: 'Travis Howard', avatar: 'https://vuetifyjs.com/static/doc-images/lists/2.jpg' },
        { title: 'Ali Connors', avatar: 'https://vuetifyjs.com/static/doc-images/lists/3.jpg' },
        { title: 'Cindy Baker', avatar: 'https://vuetifyjs.com/static/doc-images/lists/4.jpg' }
      ]
    }
  },
  computed: {
    loading () {
      return this.$store.getters.loading()
    }
  },
  methods: {
    deleteOrder (index) {
      this.customerOrders.splice(index, 1)
      this.orderItems = []
      this.order = ''
    },
    pushItem (item) {
      if (this.order !== '') {
        let pos = this.orderItems.findIndex(it => it.id_item === item.id)
        if (pos < 0) {
          this.orderItems.push({id_item: item.id, id_order: this.order, units: 1})
        } else {
          this.orderItems[pos].units += 1
        }
      }
    },
    async orderSelected (order) {
      this.order = order.id
      await store.dispatch('FETCH_ARRAY', {
        entity: 'order_item',
        params: [
          {field: 'id_order', value: order.id, operator: 'eq'}
        ]
      })
      this.orderItems = _.cloneDeep(this.$store.state.order_item.all)
    },
    async save () {
      await this.$store.dispatch('ACTION_ARRAY', {entity: 'order', data: this.customerOrders})
      await this.$store.dispatch('ACTION_ARRAY', {entity: 'order_item', data: this.orderItems})
      await this.$store.dispatch('FETCH_ARRAY', {entity: 'order', params: []})
      this.customerOrders = _.cloneDeep(this.$store.state.order.all)
      if (this.order !== '') {
        await store.dispatch('FETCH_ARRAY', {
          entity: 'order_item',
          params: [
            {field: 'id_order', value: this.order, operator: 'eq'}
          ]
        })
        this.orderItems = _.cloneDeep(this.$store.state.order_item.all)
      }
    },
    revert () {
      this.customerOrders = _.cloneDeep(this.$store.state.order.all)
    }
  },
  async beforeRouteEnter (to, from, next) {
    const items = await store.dispatch('FETCH_ARRAY', {entity: 'item'})
    const customerOrders = await store.dispatch('FETCH_ARRAY', {
      entity: 'order',
      params: [
        {field: 'id_customer', value: '3ff93ba3-a0c7-4433-863f-8666b303578e', operator: 'eq'}
      ]
    })
    Promise.all([items, customerOrders]).then(() => {
      next()
    })
  }
}
</script>

<style scoped>
</style>
