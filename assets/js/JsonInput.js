Vue.component('JsonInput', {
  data() {
    return {
      rootName: "Root"
    }
  },

  props: {
    currentPath: Array
  },

  template: `
  <div>
    <textarea
      @input="$emit('input', $event.target.value)"
      rows="20"
      cols="150"
      placeholder="Type JSON here"
    ></textarea>
  </div>
  `
})
