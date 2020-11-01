<template>
  <v-container>
      <v-row dense class="d-flex justify-center">
        <v-col
          v-for="(item, i) in items"
          :key="i"
          cols="10"
          class="my-2"
        >
          <v-card
            :color="item.color"
            dark
          >
            <div class="d-flex flex-no-wrap justify-space-between">
              <v-col cols="6">
                <v-card-title
                  class="headline"
                  v-text="item.title"
                ></v-card-title>
                <v-card-subtitle v-text="item.description" />
                <v-card-actions>
                    <v-btn
                      v-if="item.artist === 'Ellie Goulding'"
                      class="ml-2 mt-3"
                      fab
                      icon
                      height="40px"
                      right
                      width="40px"
                    >
                      <v-icon>mdi-play</v-icon>
                    </v-btn>

                    <v-btn
                      v-else
                      class="ml-2 mt-5"
                      outlined
                      rounded
                      small
                    >
                      START RADIO
                    </v-btn>
                  </v-card-actions>
              </v-col>

              <v-col cols="6">
                <v-carousel>
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
    </v-container>
</template>
<script>
export default {
  data: () => ({
      items: [],
  }),
  created(){
    this.getItems()
  },
  methods: {
    async getItems(){
      const items = await this.$store.dispatch('getPromoAll');
      items.map((item, index) => {
        const text = item.description.slice(0, 100) + '...';
        items[index].description = text;
      })
      this.items = items;
    },
  }

}
</script>
<style scoped>

</style>