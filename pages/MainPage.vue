<template lang="pug">
.main
  h1 App Formularios
  
  Transition(appear name="fadein"

  )
    v-card.main-card
      v-card-title.d-flex.align-center
        v-icon.mr-2 mdi-form-select
        h3 Cargar formulario
        
      v-card-text
        .text-body-1.mb-3 Selecciona el origen del formulario
        v-radio-group(v-model="store.fetchFromUrl")
          v-radio(label="Desde una URL" :value="true")
          v-radio(label="Código JSON" :value="false")

        v-text-field(
          v-model="store.url"
          :disabled="!store.fetchFromUrl"
          label="URL" outlined
        )

        Transition(name="expand")
          div(v-if="!store.fetchFromUrl")
            v-textarea.pre(
              v-model="store.jsonCode"
              label="Código" rows="5" outlined
            )

        v-btn(color="primary" to="/formpage") Ver formulario
</template>

<script setup>
import { useMainStore } from '~/stores/useMainStore'

const store = useMainStore()
</script>

<style lang="scss" scoped>
.main {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding-top: 20px;
}

.pre {
  font-family: 'Roboto Mono', monospace;
  white-space: pre;
}

.expand-leave-active,
.expand-enter-active {
  transition: all 350ms ease;
  overflow: hidden;
}

.expand-enter-to,
.expand-leave-from {
  height: 182px;
}

.expand-enter-from,
.expand-leave-to {
  opacity: 0;
  height: 0;
}

.fadein-enter-active,
.fadein-leave-active {
  transition: opacity 5s ease;
}

.fadein-enter-from,
.fadein-leave-to {
  opacity: 0;
}
</style>
