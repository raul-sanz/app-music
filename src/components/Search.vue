<template lang="pug">
  main
    transition(name="move")
      pm-notification(v-show="showNotification")
        p(slot="body") No se encontraron resultados

    transition(name="move")
      pm-loader(v-show="isLoading")
    section.section(v-show="!isLoading")
      nav.nav.has-shadow
        .container
          .columns
            input.input.is-large.column.is-three-fifths.is-mobile(
              type="text", 
              placeholder="Buscar Canciones", 
              v-model="searchQuery",
              @keyup.enter="search"
              )
            a.button.is-info.is-large(@click="search") Buscar
            a.button.is-large.is-danger &times;
    .section
        .container
          p
            small {{ searchMessage }}

        .container.result
          .columns.is-multiline
            .column.is-one-quarter(v-for="track in tracks") 
              pm-track(

                v-blur="track.preview_url"
                :class="{ 'is-active': track.id == selectedTrack }",  :track="track", 
                @select="setSelectedTrack"
                )
                  
</template>

<script>
import trackService from '@/services/track'

import PmNotification from '@/components/shared/Notification.vue'
import PmTrack from '@/components/Track.vue'
import PmLoader from '@/components/shared/Loader.vue'

export default {
  name: 'app',
  components:{PmTrack,PmLoader, PmNotification},
  data(){
    return{
     searchQuery:'',
     tracks: [],
     isLoading: false,
     showNotification:false,
     selectedTrack:''
    }
  },
  computed:{
    searchMessage(){
      return `Encontradas ${this.tracks.length}`
    }
  },
  watch:{
    showNotification(){
      if(this.showNotification){
        setTimeout( () => {
          this.showNotification = false
        },3000)
      }
    }
  },
  methods:{
    search(){
      if(!this.searchQuery){return}
      this.isLoading=true
      trackService.search(this.searchQuery)
        .then(res => {
          this.showNotification = res.tracks.total === 0
          this.tracks = res.tracks.items
          this.isLoading=false
        } )
    },
    setSelectedTrack(id){
      this.selectedTrack = id
    }
     
  }
}
</script>

<style lang="scss">
.result{
  margin: 30px;
}
.is-active{
  border: 3px #209cee solid;
}
</style>
