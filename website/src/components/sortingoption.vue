<template>
  <div
    ref="sorting"
    :id="currency"
    class="option-possibility"
    :class="[classColorName, mobileClass]"
    @click="changeBackground(currency)">
    <span class="option-possibility-span">
      {{ currency }}
    </span>
  </div>
</template>

<script>
export default {
  name: 'sortingoptioncurrency',
  props: ['currency', 'classColorName', 'mobileClass'],
  mounted() {
    document.getElementsByClassName(this.classColorName)[0].style.backgroundColor = '#FF7F50';
    if (this.mobileClass) {
      document.getElementsByClassName(this.mobileClass)[0].style.backgroundColor = '#FF7F50';
    }
  },
  methods: {
    changeBackground(id) {
      /* Get all the elements corresponding to the same class */
      const elements = document.getElementsByClassName(this.classColorName);

      for (let i = 0; i < elements.length; i += 1) {
        if (id == elements[i].id) {
          /* Change background color */
          elements[i].style.backgroundColor = '#FF7F50';
        } else {
          /* Reset background color */
          elements[i].style.backgroundColor = '#404040';
        }
      }

      /* Rename the id to match with what we need */
      id = id.toLowerCase().replace(' ', '');

      /* When item is clicked we change background and we call the function to uptade datas depending on the options */
      this.$emit('update', id);
    },
  },
};
</script>

<style scoped>
@media screen and (max-width: 900px) {
  .option-possibility {
    width: 30%;
    color: #fff;
  }
}
</style>
