<template>
  <v-navigation-drawer
    app
    right
    class="pt-3"
  >
    <span class="mx-3">Кількість об'яв на сторінці.</span>
    <v-container class="py-0">
      <v-overflow-btn
        class="my-2"
        :items="countPromo"
        label="Кількість об'яв на сторінці"
        item-value="id"
        v-model="selectCount"
        dense
        hide-details
      ></v-overflow-btn>
    </v-container>

    <v-col
      cols="12"
    >
      <v-radio-group 
        v-model="selectSortPromos"
        hide-details
        class="mt-0"
        :readonly="load"
      >
        <span class="mb-3">Сортування по даті</span>
        <v-radio
          label="По збільшеню"
          value="date"
          auto-select-first
        ></v-radio>
        <v-radio
          label="По зменшеню"
          value="-date"
        ></v-radio>
        <v-divider class="my-3"/>
        <span class="mb-3">Сортування по заголовкам</span>
        <v-radio
          label="По збільшеню"
          value="title"
        ></v-radio>
        <v-radio
          label="По зменшеню"
          value="-title"
        ></v-radio>
      </v-radio-group>
    </v-col>

  </v-navigation-drawer>
</template>
<script>
export default {
   data () {
    return {
      selectSortPromos: 'data',
      selectCount: 5,
      load: false,
      countPromo: [
        { id: 2, text: '2 обя\'ви' },
        { id: 3, text: '3 обя\'ви' },
        { id: 4, text: '4 обя\'ви' },
        { id: 5, text: '5 обя\'в' },
      ],
    }
  },
  created(){
    this.selectCount = this.$store.getters.getCountPromoOnPage;
    this.selectSortPromos = this.$store.getters.getSort;
  },
  watch: {
    async selectCount(val){
      this.$store.commit('setCountPromoOnPages', val);
      this.load = true;
      await this.$store.dispatch('getPromoAll', true);
      this.load = false;
    },
    async selectSortPromos(val){
      this.$store.commit('setSort', val);
      this.load = true;
      await this.$store.dispatch('getPromoAll', true);
      this.load = false;
    }
  }
}
</script>
