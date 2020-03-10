<template>
  <div>
    <el-button @click="sendParent(comment)" type="text">{{comment.nickname}}</el-button>
    : {{comment.content}}
    <div style="padding-left:20px;" v-bind:key="child.label" v-for="child in comment.children">
      <ChildComment v-bind:comment="child"></ChildComment>
    </div>
  </div>
</template>

<script>
import bus from '../utils/bus'
export default {
  name: "ChildComment",
  props: ["comment"],
  methods: {
    sendParent: (comment) => {
      bus.$emit("sendParent", comment);
    }
  }
};
</script>

<style>
</style>