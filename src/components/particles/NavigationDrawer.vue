<template>
  <v-navigation-drawer
    app
    dark
  >
    <v-list-item>
      <v-list-item-avatar dense>
        <v-img src="photo.jpg"></v-img>
      </v-list-item-avatar>

      <v-list-item-content>
        <v-list-item-title>Admin</v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>

    <v-list dense>
      <v-list-item
        v-for="item in items"
        :key="item.title"
        link
      >
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <router-link class="style-tag" :to="item.link">{{ item.title }}</router-link>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
<script>
export default {
   data () {
    return {
      drawer: true,
      items: [
        { 
          title: "Список об'яв",
          icon: 'mdi-cart',
          link: '/', 
        },
        { 
          title: "Операції над об'явами",
          icon: 'mdi-cart',
          link: '/promo-table', 
        },
        { 
          title: "Додати об'яву",
          icon: 'mdi-cart',
          link: '/create/0', 
        },
      ],
    }
  },
}
</script>
<style scoped>
  .style-tag{
    color: white;
    text-decoration: none;
  }
</style>