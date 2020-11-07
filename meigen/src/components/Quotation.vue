<template>
  <v-ons-page>
    <v-ons-toolbar>
      <div class="center">Quotation</div>
    </v-ons-toolbar>
    <v-ons-pull-hook :action="loadItem" @changestate="state = $event.state">
      <span v-show="state === 'initial'"> Pull to refresh </span>
      <span v-show="state === 'preaction'"> Release </span>
      <span v-show="state === 'action'"> Loading... </span>
    </v-ons-pull-hook>
    <ons-list>
      <div v-for="(quotation, index) in quotations" :key="index">
        <ons-list-header class="font14 list-header-color"><a :href="`https://www.google.com/search?q=` + quotation[1]" target="_blank" rel="noopener">{{ quotation[1] }}</a></ons-list-header>
        <ons-list-item>
          <div class="left">
            <img class="list-item__thumbnail" :src="quotation[2]" />
          </div>
          <div class="center">
            <span class="list-item__subtitle word-break font16"><a :href="`https://www.google.com/search?q=` + quotation[0]" target="_blank" rel="noopener" style="text-decoration:none; color:black;">{{
              quotation[0]
            }}</a></span>
          </div>
        </ons-list-item>
      </div>
    </ons-list>
  </v-ons-page>
</template>

<script>
// Webpack CSS import
import 'onsenui/css/onsenui.css'
import 'onsenui/css/onsen-css-components.css'
import axios from 'axios'
import Vue from 'vue'
axios.defaults.headers.get['Content-Type'] = 'application/json;charset=utf-8';
axios.defaults.headers.get['Access-Control-Allow-Origin'] = '*';

const VueOnsen = require('vue-onsenui')
Vue.use(VueOnsen)

export default Vue.extend({
  name: 'Quotation',
  data() {
    return {
      quotations: [
        [
          '',
          '',
          '',
        ],
      ],
      state: 'initial',
      spdVisible: true,
      spdOpen: false,
    }
  },
  created: function () {
    this.getQuotations()
  },
  methods: {
    getQuotations() {
      this.quotations = [
        [
          'please wait a second.',
          '(^o^)',
          'https://joeschmoe.io/api/v1/random',
        ],
      ]

      const self = this // axios内にthisが届かないため
      axios
        .get(`https://meigen.doodlenote.net/api/?c=10`, {
          timeout: 5000,
          // XML形式
          responseType: 'document',
          withCredentials: true,
        })
        .then(function (response) {
          const resp = response.data
          const meigens = resp.getElementsByTagName('meigen')
          const authors = resp.getElementsByTagName('auther')
          const meigenLength = meigens.length
          const min = 1 ;
          const max = 12 ;

            for (let index = 0; index < meigenLength; index++) {
              const imageIndex = String(Math.floor( Math.random() * (max + 1 - min) ) + min)
              self.quotations.push([
                meigens[index].textContent,
                authors[index].textContent,
                `image/${imageIndex.length == 1 ? `0${imageIndex}` : imageIndex}.svg`,
              ])
            }
            self.quotations.shift()
        })
    },
    loadItem(done) {
      setTimeout(() => {
        this.getQuotations()
        done()
      }, 600)
    },
  },
})
</script>

<style>
.word-break {
  word-break: break-all;
}
.font14 {
  font-size: 14px;
}
.font16 {
  font-size: 16px;
}
.list-header-color {
  background-color: floralwhite;
}
</style>