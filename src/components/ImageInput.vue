<template id="image-input-template">
    <div class="Image-input">
        <div :style="'height:' + height + 'px'" class="Image-input__image-wrapper">
            <i v-show="!image.data" class="icon fa fa-picture-o"></i>
            <img v-show="image.data || src" class="Image-input__image" :src="image.data || src">
        </div>

        <div class="Image-input__input-wrapper" v-if="!src">
            <v-btn
                class="mx-2"
                fab
                dark
                color="grey "
            >
                <v-icon dark>mdi-plus</v-icon>
                <input @change="previewThumbnail" class="Image-input__input" name="thumbnail" type="file">
            </v-btn>
        </div>
        <div class="Image-remove-wrapper" v-else>
           <v-btn
                class="mx-2"
                fab
                dark
                small
                color="grey"
                @click="remove"
            >
                <v-icon dark>
                    mdi-delete-outline
                </v-icon>
            </v-btn>
        </div>
    </div>
</template>
<script>
export default {
  props: {
      src: {
          type: [String, File],
      },
      height: {
          type: Number,
      },
      clear:{
          type: Boolean,
          default: false
      }
  },
  data(){
      return {
          image: {
              fileName: '',
              data: ''
          }
      }
  },
   methods: {
       remove(){
           this.image.fileName = '';
           this.image.data = '';
           this.$emit('remove');
       },
        previewThumbnail: function(event) {
            const input = event.target;
            const file = input.files[0]
            this.image.fileName = file.name;

            if (input.files && file) {
                var reader = new FileReader();
                reader.onload = e => {
                    this.image.data = e.target.result;
                    this.$emit('addImage', ({
                       src: e.target.result,
                       file 
                    }));

                    if(this.clear){
                         this.image.data = '',
                         this.image.fileName = ''
                    }
                }
                reader.readAsDataURL(file);
            }
            
        }
    }
}
</script>
<style scoped>
  .Image-input {
    display: flex;
    position: relative;
    z-index: 0;
}

.Image-input__image-wrapper {
    flex-basis: 100%;
    flex: 2.5;
    border-radius: 1px;
    overflow-y: hidden;
    border-radius: 1px;
    background: #eee;
    justify-content: center;
    align-items: center;
    display: flex;
}

.Image-input__image-wrapper > .icon {
    color: #ccc;
    font-size: 50px;
    cursor: default;
}

.Image-input__image {
    max-width: 100%;
    border-radius: 1px;
}

.Image-input__input-wrapper {
    overflow: hidden;
    position: relative;
    border-radius: 1px;
    float: left;
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.4s background;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
}
.Image-remove-wrapper{
    position: absolute;
    bottom: 5px;
    right: 0px;
}

.Image-input__input-wrapper:hover {
    background: #e0e0e0;
}


.Image-input__input {
    cursor: inherit;
    display: block;
    font-size: 999px;
    min-height: 100%;
    opacity: 0;
    position: absolute;
    right: 0;
    text-align: right;
    top: 0;
    cursor: pointer;
}
</style>