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
                        @click="removeImg(img.id)"
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
                @click="update"
              >
                Записати
                </v-btn>

                <v-btn
                  color="error"
                  class="mr-4"
                  @click.stop="dialog = true"
                 >
                  Видалити
                </v-btn>
                
                <v-dialog
                  v-model="dialog"
                  max-width="290"
                >
                  <v-card>
                    <v-card-title class="headline">
                      Видалення!
                    </v-card-title>

                    <v-card-text>
                      Ви дійсно хочете видалити данну об'яву ?
                    </v-card-text>

                    <v-card-actions>
                      <v-spacer></v-spacer>

                      <v-btn
                        color="green darken-1"
                        text
                        @click="remove"
                      >
                        Так
                      </v-btn>

                      <v-btn
                        color="green darken-1"
                        text
                        @click="dialog = false"
                      >
                        Ні
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>



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
      dialog: false,
      id: null,
      imagesStart: [],
      mainImages: {
        id: null,
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
    async created(){
       this.id = +this.$route.params.id;
      let item = {}
      if(this.id != 0){
        try{
          await this.$store.dispatch('getPromo', this.id);
        } catch (e) {
          console.log(e);
        } finally{
          item = this.$store.getters.getPromo;
          this.title = item.title;
          this.description = item.description;
          this.price = item.price;
          this.mainImages.id = item.images[0].id;
          this.mainImages.title = item.images[0].title;
          this.mainImages.file = item.images[0].url;
          
          this.imagesStart.push({
            id: item.images[0].id,
            remove: false,
            select: false,
          });

          item.images.map((img, indx) => {
            if(indx > 0){
              this.images.push({
                id: img.id,
                src: img.url,
                title: img.title,
              })
              this.imagesStart.push({
                id: img.id,
                remove: false,
              });
            }
          })
       }   
      }else{
        this.src = null;
      } 
    },
    methods: {
      addMainImg(val){
        this.mainImages = {
          id: val.id,
          title: '',
          file: val.file
        }
        this.imagesStart[0].remove = true;
        this.imagesStart[0].select = true;
      },
      addImage(val){
        console.log(val);
        let item = {
          title: '',
          file: val.file,
          src: val.src
        };
        this.images.push(item);  
      },
      removeImg(id){
        let index = null;
        this.images.find((img, idx) => {
         if(img.id == id) index = idx; 
        })
        this.images.splice(index, 1);

        this.imagesStart = this.imagesStart.map((item, idx) => {
         if(item.id == id && idx == 0) {

          return { id: item.id, remove: true, select: true }

         } else {

           return item.id == id 
                  ? { id: item.id, remove: true}
                  : item
         }


          
        })
      },
      removeMainImg(){
        this.mainImages = {
          file: null,
          title: ""
        }
        this.imagesStart[0].remove = true;
        this.imagesStart[0].select = false;
      },
      async update () {
        const images = this.images.map(img => {
          if(img.file){
            return img.file
          }
        });
        let imagesTitles = [];
        
        imagesTitles.push(this.mainImages.title);
        this.images.map(img => {
          imagesTitles.push(img.title)
        });

        imagesTitles = JSON.stringify(imagesTitles);

        console.log(imagesTitles);
       
        const fd = new FormData()
        fd.append('title', this.title);
        fd.append('description', this.description);
        fd.append('price', this.price);
        fd.append('imagesTitles', imagesTitles);
        fd.append('removeImages', JSON.stringify(this.imagesStart));
        if(typeof this.mainImages.file !== "string"){
          fd.append('image', this.mainImages.file);
        }       
        for(let i = 0; i < images.length; i++){
          if(images[i]){
            fd.append('image', images[i]);
          }
        }
        const data = {
          id: this.id,
          fd
        };
        await this.$store.dispatch('updatePromo', data);
        this.$router.push('/promo-table');
      },
      async remove () {
        await this.$store.dispatch('removePromo', this.id)
        this.$router.push('/promo-table');
        this.dialog = false;
      },
    },
}
</script>
<style scoped>

</style>