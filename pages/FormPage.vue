<template lang="pug">
.main
  Transition(name="page" mode="out-in")
    v-progress-linear(v-if="loading" indeterminate color="primary")

    v-card.main-card(v-else-if="code?.formulario && !viewAnswers")
      v-card-title {{ code.formulario.name }}
      v-card-subtitle {{ code.formulario.descripcion }}

      v-form(ref="formComponent")
        v-card-text.content
          v-card(
            v-for="form, idx in code.formulario.form" :key="idx"
            max-width="860px" width="calc(100vw - 40px)"
          )
            v-card-title {{ form.question }}

            v-card-text(v-if="form.type === 'SELECT'")
              v-select(
                v-model="answers[idx]"
                :items="form.items"
                item-value="value" item-title="value"
                :rules="[v => !!v && v !== '' || 'Este campo es requerido']"
              )

            v-card-text(v-else-if="form.type === 'INPUT'")
              v-text-field(
                v-model="answers[idx]"
                label="Respuesta..."
                :rules="[v => !!v && v !== '' || 'Este campo es requerido']"
              )

            v-card-text(v-else-if="form.type === 'CHECKBOX'")
              v-checkbox(v-for="item in form.items" :key="item" v-model="answers[idx]" :label="item" :value="item" hide-details)

          .buttons
            v-btn(color="primary" outlined :loading="loadingSubmit" to="/mainpage") Volver
            v-btn(color="primary" @click="submit") Confirmar


    AnswersCard(
      v-else-if="viewAnswers"
      :answers="answers"
      :code="code"
    )

</template>

<script setup>
import { useMainStore } from '~/stores/useMainStore'

const store = useMainStore()
const code = ref()
const answers = ref([])
const viewAnswers = ref(false)
const formComponent = ref()
const loading = ref(false)
const loadingSubmit = ref(false)

onBeforeMount(async () => {
  loading.value = true
  code.value = await store.fetchForms()
  answers.value = code.value.formulario.form.map((f) => (f.type === 'CHECKBOX' ? [] : ''))
  loading.value = false
})

const submit = async () => {
  loadingSubmit.value = true
  const { valid } = await formComponent.value.validate()
  loadingSubmit.value = false

  if (!valid) return
  viewAnswers.value = true
}
</script>

<style lang="scss" scoped>
.main {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding-top: 40px;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

</style>
