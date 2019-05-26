Vue.component('JsonView', {
  props: {
    jsonObj: {}
  },

  template: `
  <div>
    <pre id="json"><code>{{ jsonObj }}</code></pre>
  </div>
  `
})
