<template>
  <v-app>
    <v-toolbar fixed app>
      <v-toolbar-title>Chart</v-toolbar-title>
    </v-toolbar>
    <main>
      <v-content>
        <v-container fluid>
          <v-slide-y-transition mode="out-in">
            <v-layout column align-center>
              <v-layout row>
                <v-btn flat outline class="green" @click="startTimer">Start Timer</v-btn>
                <v-btn flat outline class="orange" @click="stopTimer">Stop Timer</v-btn>
                <v-btn class="primary" @click="addPoint(1, 1)">Add Point</v-btn>
                <v-btn class="red" @click="removePoint">Delete Point</v-btn>
              </v-layout>
              <h4>Chart</h4>
            </v-layout>
          </v-slide-y-transition>
        </v-container>
      <scatter-chart ref="chart" :library="defaults" :data="defaults.series" :height="800"></scatter-chart>
      </v-content>
    </main>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      defaults: {
        title: {
          text: 'y = sin(x)'
        },
        subtitle: {
          text: ''
        },
        yAxis: {
          min: -5,
          max: 5,
          title: {
            text: 'f(x)'
          }
        },
        xAxis: {
          type: 'linear',
          tickInterval: 1,
          title: {
            text: 'x'
          }
        },
        series: [
          {
            name: 'Sin',
            data: [[0, 0]]
          },
          {
            name: 'Cosin',
            data: [[0, 1]]
          },
          {
            name: 'Tan',
            data: [[0, 0]]
          }
        ],
        legend: {
          layout: 'vertical',
          align: 'right',
          verticalAlign: 'middle'
        },
        plotOptions: {
          scatter: {
            lineWidth: 1,
            marker: {
              enabled: false
            }
          }
        },
        responsive: {
          rules: [{
            condition: {
              maxWidth: 500
            },
            chartOptions: {
              legend: {
                layout: 'horizontal',
                align: 'center',
                verticalAlign: 'bottom'
              }
            }
          }]
        }
      }
    }
  },
  methods: {
    addPoint (x, y) {
    },
    removePoint () {
    },
    startTimer () {
      this.started = new Date()
      this.timer = setInterval(() => {
        let now = new Date()
        let x = (now.getTime() - this.started.getTime()) / 1000
        let y1 = Math.sin(x)
        let y2 = Math.cos(x)
        let y3 = Math.tan(x)

        this.defaults.series[0].data.push([x, y1])
        this.defaults.series[1].data.push([x, y2])
        this.defaults.series[2].data.push([x, y3])
        this.$refs.chart.chart.redraw()

        if (x > 12) {
          this.defaults.series[0].data.shift()
          this.defaults.series[1].data.shift()
          this.defaults.series[2].data.shift()
        }
      }, 1000 / 30)
    },
    stopTimer () {
      clearInterval(this.timer)
      this.defaults.series[0].data = [[0, 0]]
      this.defaults.series[1].data = [[0, 1]]
      this.defaults.series[2].data = [[0, 0]]
    }
  }
}
</script>
