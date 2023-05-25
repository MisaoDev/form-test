import { defineStore } from 'pinia'
import defaultForm from '~/assets/defaultForm.json'

const startingCode = JSON.stringify(defaultForm, null, 2)

export const useMainStore = defineStore('main', () => {
  const fetchFromUrl = ref(false)
  const url = ref('https://run.mocky.io/v3/6bd01347-72e9-49da-809a-d5002ca63b2c')
  const jsonCode = ref(startingCode)

  const fetchForms = async () => {
    if (!fetchFromUrl.value) {
      return JSON.parse(jsonCode.value)
    }
    const { data } = await useFetch(url.value)
    return data.value
  }

  return { fetchFromUrl, url, jsonCode, fetchForms }
})
