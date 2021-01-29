import { reactive, ref } from 'vue'

export function useSelector (items, selectedIndex = 0) {
  const _items = reactive(items)
  const selectedValue = ref(_items[selectedIndex])
  return [selectedValue, _items]
}
