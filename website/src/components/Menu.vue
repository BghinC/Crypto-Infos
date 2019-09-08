<template>
  <div id="option">
    <div id="separate-option">
        <div
          v-if="$route.name === 'randomizer'"
          class="sorting-option"
          @click="$emit('update', 'new')">
          <div class="option-possibility">
            <span class="option-possibility-span">
              New Random
            </span>
          </div>
        </div>
        <div class="option-title">Currency</div>
        <div class="sorting-option">
          <sortingoption
            v-for="(item, index) in currency"
            :key="index"
            :currency="item"
            classColorName="currency"
            v-on:update="$emit('update', $event)">
          </sortingoption>
        </div>
      <!-- / Currency option -->
      <div>
        <div class="option-title">Time Period</div>
        <div class="sorting-option">
          <sortingoption
            v-for="(item, index) in timeperiod"
            :key="index"
            :currency="item"
            classColorName="timePeriod"
            v-on:update="$emit('update', $event)">
          </sortingoption>
        </div>
      </div>
      <!-- / Time period option -->
      <div v-if="$route.name === 'home'">
        <div class="option-title">Sort by</div>
        <div class="sorting-option">
          <sortingoption
            v-for="(item, index) in sortoption"
            :key="index"
            :currency="item"
            classColorName="sort"
            v-on:update="$emit('update', $event)">
          </sortingoption>
        </div>
      </div>
      <!-- / Sort option -->
      <div v-if="$route.name === 'home'">
        <div class="option-title">Order</div>
        <div class="sorting-option">
          <sortingoption
            v-for="(item, index) in order"
            :key="index"
            :currency="item"
            classColorName="order"
            v-on:update="$emit('update', $event)">
          </sortingoption>
        </div>
      </div>
      <!-- / Order option -->
    </div>
    <!-- / separate-option -->
  </div>
  <!-- / option -->
</template>

<script>
import sortingoption from '@/components/sortingoption.vue';

export default {
  components: { sortingoption },
  props: {
    currency: { type: Array, default: null },
    timeperiod: { type: Array, default: null },
    sortoption: { type: Array, default: null },
    order: { type: Array, default: null },
  },
};
</script>
