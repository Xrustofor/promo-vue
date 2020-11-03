<template>

  <v-card>
    <v-data-table
        :headers="headers"
        :items="items"
        sort-by="calories"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar
            flat
          >
            <v-toolbar-title>Список об'яв</v-toolbar-title>
            <v-divider
              class="mx-4"
              inset
              vertical
            ></v-divider>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              dark
              class="mb-2"
              @click="createCard"
            >
              Створити картку
            </v-btn>
          </v-toolbar>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon
            small
            class="mr-2"
            @click="editItem(item)"
          >
            mdi-pencil
          </v-icon>
          <v-icon
            small
            @click.stop="dialog = true; removableID = item.id"
          >
            mdi-delete
          </v-icon>
        </template>
      </v-data-table>

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


  </v-card>
</template>
<script>

export default {
  data: () => ({
      dialog: false,
      items: [],
      dialogDelete: false,
      removableID: null,
      headers: [
        { text: 'id', value: 'id', },
        { text: 'Дата публікації', value: 'data' },
        { text: 'Зображення', value: 'images[0].url' },
        { text: 'Загловок', value: 'title' },
        { text: 'Опис', value: 'description' },
        { text: 'Дії', value: 'actions', sortable: false },
      ],
      editedIndex: -1,
      editedItem: {
        name: '',
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0,
      },
      defaultItem: {
        name: '',
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0,
      },
    }),
    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
    },

    watch: {
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },

    async created () {
      this.getItems();
    },
    methods: {

      async getItems(){
        const items = await this.$store.dispatch('getPromoAll', false);
        items.map((item, index) => {
          const text = item.description.slice(0, 100) + '...';
          items[index].description = text;
        })
        this.items = items;
      },

      createCard(){
        this.$router.push('/create/0')
      },

      editItem (item) {
        this.$router.push(`/edit/${item.id}`)
      },

      async remove(){
        if(this.removableID){
          await this.$store.dispatch('removePromo', this.removableID);
          let key;
          this.items.find((item, idx) => {
            if(item.id === this.removableID){
              key = idx;
            }
          })
          this.items.splice(key, 1);
          this.dialog = false;
        }
      }
    },
}
</script>
<style scoped>

</style>