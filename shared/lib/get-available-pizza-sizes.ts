import { ProductItem } from "@prisma/client";
import { pizzaSizes, PizzaType } from "../constants/pizza";
import { Variant } from "../components/shared/choose-variants";

/**
 * Функция возврашает доступные размеры пиц по выбранному типу теста
 * 
 * @param type - тип теста выбранной пиццы
 * @param items - список вариаций
 * @returns - массив доступных размеров пицц по типу теста
 */
export const getAvailablePizzaSizes = (type: PizzaType, items: ProductItem[]): Variant[] => {
  const filteredPizzasByType = items.filter(item => item.pizzaType === type);
    
  return pizzaSizes.map(item => ({
      name: item.name,
      value: item.value,
      disabled: !filteredPizzasByType.some(pizza => Number(pizza.size) === Number(item.value))
    })
  );
}