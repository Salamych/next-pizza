import { Product } from "@prisma/client"
import { axiosInstance } from "./instance"
import { ApiRouts } from "./constants";

export const search = async (query: string): Promise<Product[]> => {
  const {data} = await axiosInstance.get<Product[]>(ApiRouts.SEARCH_PRODUCTS, {params: {query}});
  
  return data;
}