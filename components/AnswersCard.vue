<template lang="pug">
v-card.main-card
  v-card-title Respuestas {{ code.formulario.name }}
  v-card-text.content
    v-card(
      v-for="(form, idx) in code.formulario.form" :key="idx"
      max-width="860px" width="calc(100vw - 40px)"
    )
      v-card-title {{ form.question }}
      v-card-text(v-if="form.type === 'CHECKBOX'") {{ answers[idx].join(', ') }}
      v-card-text(v-else) {{ answers[idx] }}

    v-btn(color="primary" to="/mainpage") Volver al inicio
</template>

<script setup>
const props = defineProps({
  answers: {
    type: Array,
    required: true,
  },
  code: {
    type: Object,
    required: true,
  },
})

</script>

<style lang="scss" scoped>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}
</style>