Vue.component('BreadCrumb', {
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
    <span v-if="currentPath.length === 0">
      <b>{{ rootName }}</b>
    </span>
    <span v-else>
      <a class="psuedo_link" @click="$emit('cutPath', 0)">{{ rootName }}</a>
    </span>
    <span v-for="(path, index) in currentPath">
      <span> </span>
      <span v-if="index !== currentPath.length - 1"> <!-- non-last element is displayed with link -->
        <a class="psuedo_link" @click="$emit('cutPath', index+1)">
          <span v-if="isNaN(path)">.{{ path }}</span>
          <span v-else>[{{path}}]</span>
        </a>
      </span>
      <span v-else> <!-- last element is displayed as bold without link -->
        <b>
          <span v-if="isNaN(path)">.{{ path }}</span>
          <span v-else>[{{path}}]</span>
        </b>
      </span>
    </span>
  </div>
  `
})
