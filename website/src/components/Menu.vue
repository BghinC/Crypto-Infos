<template>
  <div>
    <div id="option">
      <div id="separate-option">
        <div
          v-if="$route.name === 'randomizer'"
          class="sorting-option"
          @click="$emit('update', 'new')"
        >
          <div class="option-possibility">
            <span class="option-possibility-span"> New Random </span>
          </div>
        </div>
        <div class="option-title">Currency</div>
        <div class="sorting-option">
          <sortingoption
            v-for="(item, index) in currency"
            :key="index"
            :currency="item"
            classColorName="currency"
            v-on:update="$emit('update', $event)"
          >
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
              v-on:update="$emit('update', $event)"
            >
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
              v-on:update="$emit('update', $event)"
            >
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
              v-on:update="$emit('update', $event)"
            >
            </sortingoption>
          </div>
        </div>
        <!-- / Order option -->
      </div>
      <!-- / separate-option -->
    </div>
    <!-- / option -->
    <transition name="slide">
      <div v-show="responsive" id="responsive-menu">
        <div id="separate-option">
          <div
            v-if="$route.name === 'randomizer'"
            class="sorting-option"
            @click="$emit('update', 'new')"
          >
            <div class="option-possibility">
              <span class="option-possibility-span"> New Random </span>
            </div>
          </div>
          <div class="option-title">Currency</div>
          <div class="sorting-option">
            <sortingoption
              v-for="(item, index) in currency"
              :key="index"
              :currency="item"
              classColorName="currency"
              mobileClass="currency-mobile"
              v-on:update="$emit('update', $event)"
            >
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
                mobileClass="timePeriod-mobile"
                v-on:update="$emit('update', $event)"
              >
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
                mobileClass="sort-mobile"
                v-on:update="$emit('update', $event)"
              >
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
                mobileClass="order-mobile"
                v-on:update="$emit('update', $event)"
              >
              </sortingoption>
            </div>
          </div>
          <!-- / Order option -->
        </div>
        <!-- / separate-option -->
      </div>
      <!-- / responsive-menu -->
    </transition>
  </div>
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
    responsive: { type: Boolean, default: false },
  },
};
</script>

<style scoped>
#option {
  max-width: 194px;
}

#responsive-menu {
  display: none;
}

@media screen and (max-width: 900px) {
  #option {
    max-width: unset;
    display: none;
  }

  #responsive-menu {
    display: block;
    position: fixed;
    font-family: Bahnschrift, sans-serif;
    z-index: 999;
    background-color: #404040;
    width: 200px;
    overflow-y: auto;
    height: calc(100% - 100px);
  }

  #separate-option {
    height: 100%;
  }

  .slide-enter-active,
  .slide-leave-active {
    transition-duration: 0.4s;
    transition-property: transform;
  }
  .slide-enter,
  .slide-leave-to {
    transform: translate(-200px, 0);
  }

  .sorting-option {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
  }

  .option-title {
    color: #fff;
  }
}
</style>
