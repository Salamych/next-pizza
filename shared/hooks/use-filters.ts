import React from "react";
import { useSearchParams } from "next/navigation";
import { useSet } from "react-use";

interface PriceProps {
  priceFrom?: number;
  priceTo?: number;
}

interface QueryFilters extends PriceProps{
  pizzaTypes: string;
  sizes: string;
  ingredients: string;
}

export interface Filters {
  selectedIngredients: Set<string>;
  prices: PriceProps;
  sizes: Set<string>;
  pizzaTypes: Set<string>;
}

interface ReturnProps extends Filters {
  setPrices: (name: keyof PriceProps, value: number) => void;
  setSizes: (value: string) => void; 
  setPizzaTypes: (value: string) => void;
  setSelectedIngredients: (value: string) => void;
}

export const useFilters = (): ReturnProps => {

  const searchParams = useSearchParams() as unknown as Map<keyof QueryFilters, string>;

  /* Фильтр ингредиентов */
  const [selectedIngredients, { toggle: toggleIngredients }] = useSet(
    new Set<string>(searchParams.get("ingredients")?.split(','))
  );

  /* Фильтр стоимости */
  const [prices, setPrices] = React.useState<PriceProps>({
    priceFrom: Number(searchParams.get("priceFrom")) || undefined,
    priceTo: Number(searchParams.get("priceTo")) || undefined,
  });

  /* Фильтр размеров */
  const [ sizes, {toggle: toggleSizes}] = useSet(new Set<string>(
    searchParams.get("sizes") ? searchParams.get("sizes")?.split(',') : [] 
  ));
  
  /* Фильтр типов пицц */
  const [ pizzaTypes, {toggle: togglePizzaTipes}] = useSet(new Set<string>(
    searchParams.get("pizzaTypes") ? searchParams.get("pizzaTypes")?.split(',') : []
  ));

  const updatePrice = (name: keyof PriceProps, value: number) => {
    setPrices(prev => ({...prev, [name]: value }));
  }

  

  return React.useMemo(
    () => ({
    selectedIngredients,
    prices,
    sizes,
    pizzaTypes,
    setPrices: updatePrice,
    setSizes: toggleSizes,
    setPizzaTypes: togglePizzaTipes,
    setSelectedIngredients: toggleIngredients
  }), [sizes, selectedIngredients, prices, pizzaTypes]
  )
}