<template>
 <div id="app">
    <v-app>
        <AppBar />
        <NavigationDrawer />
          <v-main>
              <v-container fluid>
                <v-row class="fill-height">
                    <v-col>
                      <transition name="slide" mode="out-in">
                        <router-view></router-view>
                      </transition>
                    </v-col>
                </v-row>
            </v-container>
          </v-main>
        <v-footer 
          color="primary"
          app
          dark
        >
          Promo
        </v-footer>
    </v-app>
</div>
</template>
<script>

import AppBar from "./components/particles/AppBar";
import NavigationDrawer from "./components/particles/NavigationDrawer";

export default {
  components: {
    AppBar,
    NavigationDrawer
  }
}
</script>