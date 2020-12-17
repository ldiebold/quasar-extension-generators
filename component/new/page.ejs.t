---
to: <%= type %>/ui/dev/src/pages/000-<%= name %>.vue
---
<template>
  <q-page padding>
    <div class="text-h2 q-mb-xl"><%= Name %></div>

    <<%= Name %> />
  </q-page>
</template>

<script>
import { <%= Name %> } from '../../../src'

export default {
  components: {
    <%= Name %>
  },

  mounted () {
    // this.$M
  },

  data() {
    return {

    }
  }
}
</script>