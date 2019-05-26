const sampleJson = `
{"_comment": "sample json",
  "menu": {
  "id": "file",
  "value": "File",
  "popup": {
    "menuitem": [
      {"value": "New", "onclick": "CreateNewDoc()"},
      {"value": "Open", "onclick": "OpenDoc()"},
      {"value": "Close", "onclick": "CloseDoc()"}
    ]
  }
}}
`

let app = new Vue({
  el: '#app',

  data () {
    return {
      currentPath: [],
      input: ""
    }
  },

  computed: {
    /**
     * Object just parsed from the json input
     */
    originalJsonObj: function() {
      try {
        return JSON.parse(this.input);
      } catch(error) {
        console.log(error);
        return {};
      }
    },

    /**
     * Partial object extracted from the original one with the selected path
     */
    currentJsonObj: function() {
      try {
        return this.getPartialJson(this.originalJsonObj, this.currentPath);
      } catch(error) {
        console.log(error);
        return {};
      }
    }
  },

  methods: {
    /**
     * Get partial json at the specified path from full json (recursive function)
     * @param  {json} full json
     * @param  {path} path
     * @return {Object} partial json 
     */
    getPartialJson: function(json, path) {
      var _path = path.concat();
      if(_path.length === 0) return json;
      else if(_path.length === 1) return json[_path[0]];
      else return this.getPartialJson(json[_path.shift()], _path);
    },

    /**
     * Append all arguments to path array
     * @param  {Array} arguments path elements to append
     */
    pushPath: function() {
      for(var path of arguments){
        this.currentPath.push(path);
      }
    },

    /**
     * Cut path after the specified index
     * @param  {Number} index index from which the path array is cut
     */
    cutPath: function(index) {
      this.currentPath.splice(index, this.currentPath.length - index);
    }
  },

  template: `
  <div>
    <h1>JSON2TABLE</h1>

    <!-- Input -->
    <div id="input-json">
      <h2>JSON Input</h2>
      <json-input v-model="input"></json-input>
    </div>

    <!-- Response -->
    <div id="waiting" v-show="0 === Object.keys(originalJsonObj).length">
      Table will appear below when your input can be parsed as JSON...
    </div>

    <div id="response" v-show="0 !== Object.keys(originalJsonObj).length">
      <h2>Table for the input JSON</h2>

      <!-- Bread Crumb -->
      <bread-crumb id="current_path" :currentPath='currentPath' @cutPath="cutPath"></bread-crumb>

      <!-- Table -->
      <table-view id="table_holder" :jsonObj='currentJsonObj' @pushPath="pushPath"></table-view>

      <!-- Partial JSON -->
      <h2>Partial JSON displayed as the table</h2>
      <json-view id="current-json" :jsonObj='currentJsonObj'></json-view>
    </div>
  </div>
  `
})
