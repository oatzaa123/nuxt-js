<template>
  <div v-show="value" class="styleModal">
    <b-modal id="modal-1" class="modal" :title="`${title}`" hide-footer>
      <slot></slot>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: "Modal",
  props: {
    value: {
      type: Boolean,
      required: true
    },
    title: {
      type: String,
      required: true
    }
  }
};
</script>

<style scoped>
.modal {
  text-align: center;
  min-width: 700px;
}
</style>
