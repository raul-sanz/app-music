<template lang="pug">
    .section.hero.is-info
        .hero-head
            header.nav
                .container
                    .navbar-start
                        .nav-item
                            strong R- Music
                    .navbar-end.nav-menu
                        router-link.nav-item(to="/") Buscar
                        router-link.nav-item(to="about") Nosotros           
        .hero-body
            .container.has-text-centered
                h1.title R-Music
                h2.sutitle Musica gratis
                pm-player

</template>

<script>
import PmPlayer from '../../components/Player.vue'

export default {
    components:{PmPlayer}
}
</script>
