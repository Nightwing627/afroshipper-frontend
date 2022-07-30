<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  data() {
    return {
      togglerClicked: null
    };
  },
  created: function() {
    document.onclick = this.onClickDocument;
  },
  methods: {
    // hide dropdown on click inside
    onClickDocument(e) {
      let isContentClicked = false;
      let container = null;

      for (let i = 0; i < e.path.length; i++) {
        if (e.path[i].matches(".dropdown-toggle")) {
          this.togglerClicked = e.path[i];
          break;
        }
        if (e.path[i].matches("body")) break;
        if (e.path[i].matches(".dropdown-box")) {
          isContentClicked = true;
          break;
        }
      }
      if (isContentClicked && this.togglerClicked) {
        this.togglerClicked.click();
        this.togglerClicked = null;
      }
    }
  }
};
</script>
