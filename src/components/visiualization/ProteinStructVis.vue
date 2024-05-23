<template>
  <div class="vis-container">
    <div id="mol-container"></div>
  </div>
  
</template>

<script>
import config from '@/config'
import axios from 'axios';
import * as $3Dmol from '3dmol';

export default {
  name: 'ProteinStructVis',

  data() {
    return {
      viewer: null,
    };
  },

  props: {
    proteinSeqID: {
      type: String,
      required: true
    }
  },

  mounted() {
    if (!this.viewer) {
      this.viewer = $3Dmol.createViewer(document.getElementById('mol-container'))
      this.viewer.onLoad = () => { }
      this.handleProteinStructView(this.proteinSeqID)
    }
  },

  methods: {
    async handleProteinStructView(value) {
      const srp = value.split('_')[0]
      const code = value.split('_')[1]
      const url = config.baseUrl + config.uri.proteinPdbViewURI + '/' + srp + '/' + code
      axios.get(url, {
        headers: {
            'Content-Type': 'application/json; charset=utf-8' 
        }
      }).then((response) => {
        this.proteinStructVis(response.data.data)
      })
    },

    async proteinStructVis(data) {
      this.viewer.addModel(data, "pdb");
      this.viewer.addUnitCell()
      this.viewer.setStyle({}, {sphere : {}})
      this.viewer.zoomTo()
      this.viewer.center()
      this.viewer.render()
      document.querySelector('#mol-container canvas').removeAttribute('style')
    }
  }
};
</script>

<style lang="scss" scoped>
.vis-container {
  display: flex;
  justify-content: center;
  #mol-container {
    width: 400px;
    height: 300px;

    ::v-deep canvas {
      width: 400px;
      height: 300px;
    }
  }
}

</style>