import { Ingredient } from "@prisma/client"
import { axiosInstance } from "./instance"
import { ApiRouts } from "./constants";

export const getAll = async (): Promise<Ingredient[]> => {
  const {data} = await axiosInstance.get<Ingredient[]>(ApiRouts.INGREDIENTS);
  
  return data;
}