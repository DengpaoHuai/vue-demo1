import { ref, onMounted } from "vue";

export const url = "explication as";

//T c'est quoi ? C'est générique Typescript.
const useFetch = <T>(url: string) => {
  const loading = ref(false);
  const data = ref<T | null>(null);
  const error = ref<string | null>(null);

  const getData = async () => {
    loading.value = true;
    try {
      const response = await fetch(url);
      const results = await response.json();
      data.value = results;
    } catch (err: unknown) {
      //narrowing
      if (err instanceof Error) {
        error.value = err.message;
      } else if (typeof err === "string") {
        error.value = err;
      } else {
        error.value = "une erreur est survenue";
      }
    } finally {
      loading.value = false;
    }
  };

  onMounted(() => {
    getData();
  });

  return {
    data,
    error,
    loading,
  };
};

export default useFetch;
