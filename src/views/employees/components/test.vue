<template>
  <div>
    12312
    {{ $attrs['user-id'] }}
    <button @click="mytest">123123</button>
  </div>
</template>

<script>

export default {
  name: 'Hrsaas1Test',
  inheritAttrs: false,
  data() {
    return {

    }
  },

  mounted() {

  },

  methods: {
    mytest() {
      console.log(this.$listeners)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
