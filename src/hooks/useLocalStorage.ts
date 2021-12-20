import { ref, watch } from "vue";

/**
 *
 * @param key
 * @param value
 * @returns {*}
 */
export default function (key: string, value: unknown) {
  const data = ref(value);
  if (value) {
    localStorage.setItem(key, JSON.stringify(value));
  } else {
    data.value = JSON.parse(key ?? localStorage.getItem(key));
  }
  watch(data, (newValue) => {
    localStorage.setItem(key, JSON.stringify(newValue));
  });
  return data;
}
