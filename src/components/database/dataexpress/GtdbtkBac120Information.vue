<template>
  <div class="table-container">
    <div class="title-container">
      <span>{{ srp + ' gtdbtk bac120 summary' }}</span>
    </div>
    <el-table
      :data="gtdbtkBac120TableData"
      :header-cell-style="headerCellStyle"
      :cell-style="cellStyle"
      size="small"
      height="300"
      style="width: 100%"
    >								
        <el-table-column prop="user_genome" label="User genome" :width="100"></el-table-column>
        <el-table-column prop="classification" label="Classification" :width="200"></el-table-column>
        <el-table-column prop="fastani_reference" label="Fastani reference" :width="200"></el-table-column>
        <el-table-column prop="fastani_reference_radius" label="Fastani reference radius" :width="200"></el-table-column>
        <el-table-column prop="fastani_taxonomy" label="Fastani taxonomy" :width="200"></el-table-column>
        <el-table-column prop="fastani_ani" label="Fastani ani" :width="200"></el-table-column>
        <el-table-column prop="fastani_af" label="Fastani af" :width="200"></el-table-column>
        <el-table-column prop="closest_placement_reference" label="Closest placement reference" :width="200"></el-table-column>
        <el-table-column prop="closest_placement_radius" label="Closest placement radius" :width="200"></el-table-column>
        <el-table-column prop="closest_placement_taxonomy" label="Closest placement taxonomy" :width="200"></el-table-column>
        <el-table-column prop="closest_placement_ani" label="Closest placement ani" :width="200"></el-table-column>
        <el-table-column prop="closest_placement_af" label="Closest placement af" :width="200"></el-table-column>
        <el-table-column prop="pplacer_taxonomy" label="Pplacer taxonomy" :width="200"></el-table-column>
        <el-table-column prop="classification_method" label="Classification method" :width="200"></el-table-column>
        <el-table-column prop="note" label="Note" :width="200"></el-table-column>
        <el-table-column prop="other_related_references(genome_id,species_name,radius,ANI,AF)" label="Other related references(Genome id,Species name,radius,ANI,AF)" :width="200"></el-table-column>
        <el-table-column prop="msa_percent" label="Msa percent" :width="200"></el-table-column>
        <el-table-column prop="translation_table" label="Translation table" :width="200"></el-table-column>
        <el-table-column prop="red_value" label="Red value" :width="200"></el-table-column>
        <el-table-column prop="warnings" label="Warnings" :width="200"></el-table-column>

      <el-table-column label="Option" width="100" fixed="right">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleView(scope.row)">
            Detail
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    
    
    <!-- dialog -->
    
  </div>
</template>

<script>
import config from '@/config'
import axios from 'axios';

export default {
  name: 'GtdbtkBac120Information',

  props: {
    srp: {
      type: String,
      required: true,
      default() {
        return ''
      }
    }
  },

  data() {
    return {
        headerCellStyle: {
            textAlign: 'center', 
            backgroundColor: 'gray', 
            color: 'white'
        },
        cellStyle: {
            textAlign: 'center'
        },
        gtdbtkBac120TableData: []
    };
  },

  mounted() { },

  watch: {
    srp(newValue, oldValue) {
      if(newValue) {
        this.requestGtdbtkBac120Info(newValue)
      }
    }
  },

  methods: {
    async requestGtdbtkBac120Info(srp) {
      const url = config.baseUrl + config.uri.gtdbtkbac120viewURI + '/' + srp
      axios.get(url, {
        headers: {
            'Content-Type': 'application/json; charset=utf-8' 
        }
      }).then((response) => {
        console.log(response.data.data)
        this.gtdbtkBac120TableData = response.data.data
      })
    },
    handleView(value) {
        this.$emit('gtdbtkBac120Description', value)
    }
  },
};
</script>

<style lang="scss" scoped>
.title-container {
  margin-top: 20px;
  margin-bottom: 20px;
  font-size: 18px;
  font-weight: 700;
}
</style>