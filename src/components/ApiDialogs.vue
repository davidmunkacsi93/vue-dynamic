<template>
  <div>
    <md-dialog-alert
      :md-active.sync="requestSuccessful"
      md-title="Successful"
      :md-content="successMessage"
      md-confirm-text="Ok"
    />
    <md-dialog-alert
      :md-active.sync="requestFailed"
      md-title="Error"
      :md-content="errorMessage"
      md-confirm-text="Ok"
    />
  </div>
</template>

<script>
export default {
  props: {
    requestSuccessful: {
      type: Boolean,
      required: true
    },
    requestFailed: {
      type: Boolean,
      required: true
    },
    errorMessage: {
      type: String,
      required: true
    },
    successMessage: {
      type: String,
      required: true
    }
  }
};
</script>

<style></style>
