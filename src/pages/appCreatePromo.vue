<template>
  <v-card
    class="pa-5 mt-2"
  >
    <h1>Добавити об'яву</h1>
    
        <v-form
          ref="form"
          v-model="valid"
          lazy-validation
        >
          <v-container>
            <v-row>
              <v-col
                cols="7"
              >
              <v-row>
                <!-- :rules="titleRules" -->
                <v-col cols="8">
                  <v-text-field
                    v-model="title"
                    :counter="50"
                    
                    label="Назва об'яви"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="4">
                  <!-- :rules="priceRules" -->
                  <v-text-field
                    v-model="price"
                    type="number"
                    :counter="50"
                    
                    label="Ціна"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
              
                
                <!-- :rules="descriptionRules" -->
                <v-textarea
                  v-model="description"
                  :counter="1500"
                  auto-grow
                  filled
                  
                  color="deep-purple"
                  label="Опис"
                  rows="5"
                  required
                ></v-textarea>
              </v-col>
              <v-col cols="5">
                <image-input
                  :src="mainImages.file"
                  :height="189"
                  @addImage="addMainImg"
                  @remove="removeMainImg"
                />
                <v-text-field
                  label="Підпис головного зображення"
                  hide-details
                  v-model="mainImages.title"
                ></v-text-field>
              </v-col>

              <v-col
                v-for="(img, id) in images"
                :key="id+'_img'"
                cols="4"
              >
                <v-img
                  :src="img.src"
                  :height="200"
                  :lazy-src="img.title"
                  aspect-ratio="1"
                  class="grey lighten-2"
                >
                  <template v-slot:default>
                    <v-row
                      class="fill-height pr-2 pb-1"
                      align="end"
                      justify="end"
                    >
                      <v-btn
                        class="mx-2"
                        fab
                        dark
                        small
                        color="grey"
                        @click="removeImg(id)"
                    >
                        <v-icon dark>
                            mdi-delete-outline
                        </v-icon>
                    </v-btn>
                    </v-row>
                  </template>
                </v-img>
                <v-text-field
                  label="Підпис зображення"
                  hide-details
                  v-model="img.title"
                ></v-text-field>
              </v-col>
               
              <v-col
                class="d-flex child-flex"
                cols="4"
              >
              <image-input
                :height="248"
                :clear="true"
                @addImage="addImage"
                v-if="images.length < 3"
              />
              </v-col>

              <v-col cols="12">
                <v-btn
                :disabled="!valid"
                color="success"
                class="mr-4"
                @click="save"
              >
                Записати
                </v-btn>

                <!-- <v-btn
                  color="error"
                  class="mr-4"
                  @click="clear"
                >
                  Очистити
                </v-btn> -->
              </v-col>
            </v-row>
          </v-container>
        </v-form>
  </v-card>
</template>
<script>

import ImageInput from "../components/ImageInput";

export default {
  components:{
    ImageInput,
   },
   data: () => ({
      mainImages: {
        file: null,
        title: '',
      },
      images:[],
      valid: true,
      title: '',
      price: null,
      titleRules: [
        v => !!v || "Заголовок обов'язковий",
        v => (v && v.length <= 20) || "Заголовок має містити менше 10 символів",
      ],
      priceRules:[
        v => !!v || "Ціна обов'язкова",
      ],
      description: '',
      descriptionRules: [
        v => !!v || "Опис об'яви обов'язковий",
        v => (v && v.length <= 1000) || "Опис об'яви має містити менше 10 символів",
      ],
    }),
    methods: {
      addMainImg(val){
        this.mainImages = {
          title: '',
          file: val.file
        }
      },
      addImage(val){
        let item = {
          title: '',
          file: val.file,
          src: val.src
        };
        this.images.push(item);        
      },
      removeImg(id){
        this.images.splice(id, 1);
      },
      removeMainImg(){
        this.mainImages = {
          file: null,
          title: ""
        }
      },
      async save () {
        const images = this.images.map(img => {
          return img.file
        });

        let imagesTitles = [];
        
        imagesTitles.push(this.mainImages.title);
        this.images.map(img => {
          imagesTitles.push(img.title)
        });

        imagesTitles = JSON.stringify(imagesTitles);

        const fd = new FormData()

        fd.append('title', this.title);
        fd.append('description', this.description);
        fd.append('price', this.price);
        fd.append('imagesTitles', imagesTitles);

        fd.append('image', this.mainImages.file);
        for(let i = 0; i < images.length; i++){
          fd.append('image', images[i]);
        }
        await this.$store.dispatch('addPromo', fd);
        //this.$router.push('/promo-table');
      },
      // clear () {
      //   this.title = '';
      //   this.description='';
      //   this.price = '';
      //   this.mainImages = {
      //     file: null,
      //     title: '',
      //   },
      //   this.images = [];
      // },
    },
}
</script>
<style scoped>

</style>