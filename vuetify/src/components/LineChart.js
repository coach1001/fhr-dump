import { Line } from 'vue-chartjs'
import { cloneDeep } from 'lodash'

export default {
  extends: Line,
  props: ['data'],
  data () {
    return {
      options: {
        responsive: false,
        maintainAspectRatio: false,
        tooltips: {
          enabled: false
        },
        animation: {
          duration: 0
        },
        hover: {
          animationDuration: 0,
          mode: null
        },
        responsiveAnimationDuration: 0,
        scales: {
          yAxes: [
            {
              display: true,
              ticks: {
                min: -1,
                max: 1
              }
            }
          ],
          xAxes: [
            {
              display: true,
              type: 'linear',
              ticks: {
                min: 0,
                max: 20
              },
              scaleLabel: {
                display: true,
                labelString: 'Time'
              }
            }
          ]
        }
      }
    }
  },
  watch: {
    data: {
      handler (newVal) {
        this.renderChart(cloneDeep(this.data), this.options)
      },
      deep: true
    }
  },
  mounted () {
    this.renderChart(cloneDeep(this.data), this.options)
  }
}
