import { ref } from 'vue'

export function useCollaboration() {
  const collaborators = ref([])

  return {
    collaborators
  }
}
