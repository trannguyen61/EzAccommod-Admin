<script>
export default {
    middleware ({ redirect, store }) {
      if (!store.getters['user/loggedIn']) {
        redirect('/')
      } else {
        const user = store.getters['user/user']
        redirect('/app/post-list')
      }
    }
}
</script>