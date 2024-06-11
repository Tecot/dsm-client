<template>
  <div class="srp-search-conditions-container">
    <div class="depth-search-item">
      <div class="title">
        Depth range
      </div>
      <div class="search-condition">
        <el-slider
          range
          show-stops
          v-model="depthRange"
          :max="6000"
          :format-tooltip="(value) => value + ' m' ">
        </el-slider>
      </div>
    </div>

    <div class="ll-search-item">
      <div class="title">
        Longitude and latitude range
      </div>
      <div class="up">
        <div class="left">
          <div class="sub-title">W: {{ '[' + wRange[0] + '°,' + wRange[1] + '°]' }}</div>
          <el-slider
            range
            show-stops
            v-model="wRange"
            :max="0"
            :min="-180"
            :format-tooltip="(value) => value + '°' ">
          </el-slider>
        </div>
        <div class="right">
          <div class="sub-title">
            W: {{ '[' + eRange[0] + '°,' + eRange[1] + '°]' }}
          </div>
          <el-slider
            range
            show-stops
            v-model="eRange"
            :max="180"
            :min="0"
            :format-tooltip="(value) => value + '°' ">
          </el-slider>
        </div>
      </div>
      
      <div class="down">
        <div class="left">
          <div class="sub-title">S: {{ '[' + sRange[0] + '°,' + sRange[1] + '°]' }}</div>
          <el-slider
            range
            show-stops
            v-model="sRange"
            :max="0"
            :min="-90"
            :format-tooltip="(value) => value + '°' ">
          </el-slider>
        </div>
        <div class="right">
          <div class="sub-title">
            N: {{ '[' + nRange[0] + '°,' + nRange[1] + '°]' }}
          </div>
          <el-slider
            range
            show-stops
            v-model="nRange"
            :max="90"
            :min="0"
            :format-tooltip="(value) => value + '°' ">
          </el-slider>
        </div>
      </div>
    </div>

    <div class="button-container">
      <el-button size="mini" type="danger" @click="searchConfirm">
        Search
      </el-button>
      <el-button size="mini" type="primary" @click="searchConditionsReset">
        Reset
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GeoSearchConditions',

  data() { 
    return {
      depthRange: [0, 6000],
      wRange: [-180, 0],
      eRange: [0, 180],
      sRange: [-90, 0],
      nRange: [0, 90],

      searchMemory: {
        depthRange: [0, 6000],
        wRange: [-180, 0],
        eRange: [0, 180],
        sRange: [-90, 0],
        nRange: [0, 90]
      },
    };
  },

  mounted() {
    this.$emit('outputSearchConditions', this.searchMemory)
  },

  methods: {
    searchConfirm() {
      const depthFalg = this.searchMemory.depthRange[0] === this.depthRange[0] && this.searchMemory.depthRange[1] === this.depthRange[1]
      const wRangeFlag = this.searchMemory.wRange[0] === this.wRange[0] && this.searchMemory.wRange[1] === this.wRange[1]
      const eRangeFlag = this.searchMemory.eRange[0] === this.eRange[0] && this.searchMemory.eRange[1] === this.eRange[1]
      const sRangeFlag = this.searchMemory.sRange[0] === this.sRange[0] && this.searchMemory.sRange[1] === this.sRange[1]
      const nRangeFlag = this.searchMemory.nRange[0] === this.nRange[0] && this.searchMemory.nRange[1] === this.nRange[1]
      if(!(depthFalg && wRangeFlag && eRangeFlag && sRangeFlag && nRangeFlag)) {
        const searchData = {
          depthRange: this.depthRange,
          wRange: this.wRange,
          eRange: this.eRange,
          sRange: this.sRange,
          nRange: this.nRange
        }
        this.searchMemory = searchData
        this.$emit('outputSearchConditions', searchData)
      }
    },

    searchConditionsReset() {
        this.depthRange = [0, 6000]
        this.wRange = [-180, 0]
        this.eRange = [0, 180]
        this.sRange = [-90, 0]
        this.nRange = [0, 90]
    }
  },
};
</script>

<style lang="scss" scoped>
::v-deep .el-slider__bar {
  background-color: #5DE06C;
}

::v-deep .el-slider__button {
  background-color: #FFD000;
  border: none;
}

.srp-search-conditions-container {
  .depth-search-item {
    .title {
      font-size: 14px;
      color: #FFF;
    }
    .search-condition {
      padding-left: 10px;
      padding-right: 10px;
    }
  }

  .ll-search-item {
    .title {
      font-size: 14px;
      color: #FFF;
    }
    .sub-title {
      font-size: 12px;
      color: #FFF;
      margin-top: 10px;
    }
    .up {
      display: flex;
      padding-left: 10px;
      padding-right: 10px;
      justify-content: space-between;
      .left {
        width: 45%;
      }
      .right {
        width: 45%;
      }
    }
    .down {
      display: flex;
      padding-left: 10px;
      padding-right: 10px;
      justify-content: space-between;
      .left {
        width: 45%;
      }
      .right {
        width: 45%;
      }
    }
  }



  .button-container {
    display: flex;
    margin-top: 20px;
    justify-content: center;
  }
}
</style>