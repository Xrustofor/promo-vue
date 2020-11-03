<template>
  <v-container>
      <v-row dense class="d-flex justify-center">
        <v-col
          v-for="(item, i) in items"
          :key="i"
          cols="10"
          class="my-3"
          style="position: relative; z-index: 1;"
        >
          <v-card
            :color="item.color"
            dark
          >
            <div class="d-flex justify-space-between">
              <v-col cols="6">
                <v-row>
                  <v-card-title
                    class="headline"
                    v-text="item.title"
                  ></v-card-title>
                  <v-spacer />
                  <v-card-title
                    class="headline"
                    v-text="`Ціна: ${item.price} грн.`"
                    style="font-size: 17px !important"
                  ></v-card-title> 
                </v-row>

                <v-card-subtitle 
                  v-text="item.description"
                  style="max-height: 120px; overflow: hidden;"
                />
              </v-col>
              <v-card-actions 
                style="position: absolute; bottom: 10px;"
              >
                
                <v-btn class="ml-2 mt-5">
                  <router-link class="style-tag" :to="`/promo/${item.id}`">Переглянути</router-link>
                </v-btn>
              </v-card-actions>

              <v-col cols="6">
                <v-carousel height="300">
                  <v-carousel-item
                    v-for="(img, i) in item.images"
                    :key="i"
                    :src="`http://localhost:3000/${img.url}`"
                    reverse-transition="fade-transition"
                    transition="fade-transition"
                  ></v-carousel-item>
                </v-carousel>
              </v-col>
            </div>
          </v-card>
        </v-col>
      </v-row>
      <div class="text-center mt-4">
        <v-pagination
          v-model="currentPage"
          :length="count"
          :disabled="paginationLoad"
        ></v-pagination>
      </div>
    </v-container>
</template>
<script>
export default {
  data: () => ({
      paginationLoad: false,
      currentPage: null,
  }),
  async created(){
    await this.$store.dispatch('getPromoAll', true);
    this.currentPage = this.$store.getters.getCurrentPage;    
  },
  watch: {
    async currentPage(val){
      this.$store.commit('setCurrentPage', val);
      this.paginationLoad = true;
      await this.$store.dispatch('getPromoAll', true);
      this.paginationLoad = false;
    }
  },
  computed:{
    count(){
      return this.$store.getters.getCountPages;
    },
    items() {
      let items = this.$store.getters.getItems;
      return items.result
    },
  },
}
</script>
<style scoped>

</style>