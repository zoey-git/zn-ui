<template>
    <div class="test" @click="click">
        {{num}}
    </div>
</template>

<script>
export default {
    name: 'ZnTest',
    data() {
        return {
            num: 1
        }
    },
    methods: {
        click() {
            this.num++
        }
    }
}
</script>

<style>
.test {
  width: 100px;
  height: 100px;
  line-height: 100px;
  border-radius: 50%;
  font-size: 30px;
  text-align: center;
  background: #24292e;
  color: white;
}
</style>
