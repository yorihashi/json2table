Vue.component('TableView', {
  props: {
    jsonObj: {}
  },

  computed: {
    /**
     * Keys of the partial object
     */
    currentColumns: function() {
      try {
        if(Array.isArray(this.jsonObj)) {
          keys = [];
          this.jsonObj.forEach(function(obj) {
            if(obj != null){
              Object.keys(obj).forEach(function(key) {
                if (keys.indexOf(key) < 0) keys.push(key);
              });
            }
          });
          return keys;
        }
        else {
          return Object.keys(this.jsonObj);
        }
      } catch(error) {
        console.log(error);
        return {};
      }
    },

    /**
     * Judge whether the partial object is Array and includes non-object elements (Number, String, Boolean)
     */
    isArrayOfNonObject: function() {
      return (
        (Array.isArray(this.jsonObj)) &&
        (this.jsonObj.reduce(
          function(acc, item) {
            return acc || typeof item !== 'object'
          }
          , false
        ))
      )
    }
  },

  template: `
  <div>
    <table border="1">
      <thead>
        <tr>
          <th class="index">index</th>
          <th v-if="isArrayOfNonObject"> - </th>
          <th v-else v-for="key in currentColumns">
            {{ key }}
          </th>
        </tr>
      </thead>

      <tbody v-if="isArrayOfNonObject"> <!-- Partial json is Array and includes non-object elements (Number, String, Boolean) -->
        <tr v-for="(item, index) in jsonObj">
          <td class="index">{{ index }}</td>
          <td>
            <span v-if="item == null"></span>
            <span v-else-if="Array.isArray(item)"><a class="psuedo_link" @click="$emit('pushPath', index)">[ ... ]</a></span>
            <span v-else-if="item instanceof Object"><a class="psuedo_link" @click="$emit('pushPath', index)">{ ... }</a></span>
            <span v-else>{{ item }}</span>
          </td>
        </tr>
      </tbody>
      <tbody v-else-if="Array.isArray(jsonObj)"> <!-- Partial json is Array of Object -->
        <tr v-for="(item, index) in jsonObj">
          <td class="index">{{ index }}</td>
          <td v-for="key in currentColumns">
            <span v-if="item == null"></span>
            <span v-else-if="Array.isArray(item[key])"><a class="psuedo_link" @click="$emit('pushPath', index, key)">[ ... ]</a></span>
            <span v-else-if="item[key] instanceof Object"><a class="psuedo_link" @click="$emit('pushPath', index, key)">{ ... }</a></span>
            <span v-else>{{ item[key] }}</span>
          </td>
        </tr>
      </tbody>
      <tbody v-else> <!-- Partial json is Object (not Array) -->
        <tr>
          <td class="index"> - </td>
          <td v-for="key in currentColumns">
            <span v-if="jsonObj[key] == null"></span>
            <span v-else-if="Array.isArray(jsonObj[key])"><a class="psuedo_link" @click="$emit('pushPath', key)">[ ... ]</a></span>
            <span v-else-if="jsonObj[key] instanceof Object"><a class="psuedo_link" @click="$emit('pushPath', key)">{ ... }</a></span>
            <span v-else>{{ jsonObj[key] }}</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  `
})
