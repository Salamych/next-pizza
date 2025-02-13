"use client";

import { useForm, FormProvider } from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod"

import { CheckoutAddressForm, CheckoutCart, CheckoutPersonalForm, CheckoutSidebar,  Title } from "@/shared/components";

import { useCart } from "@/shared/hooks";
import { checkoutFormSchema, CheckoutFormValues } from "@/shared/constants/checkout-form-schema";
import { cn } from "@/shared/lib/utils";
import { createOrder } from "@/app/actions";
import toast from "react-hot-toast";
import React from "react";
import { useSession } from "next-auth/react";
import { Api } from "@/shared/services/api-client";




export default function CheckoutPage(){

  const [ submitting, setSubmitting ] = React.useState(false);
  const { totalAmount, items, updateItemQuantity, removeCartItem, loading} = useCart();
  const {data: session} = useSession();

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      phone: '',
      comment: '',
      address: '',
    }
  });

  React.useEffect(() => {
    async function fetchUserInfo(){
      const data = await Api.auth.getMe();
      const [firstName, lastName] = data.fullName.split(" ");

      form.setValue("firstName", firstName);
      form.setValue("lastName", lastName);
      form.setValue("email", data.email);
    }
    if(session){
      fetchUserInfo();
    }
  }, [session, form]);
  
  const onClickCountButton = (id: number, quantity: number, type: 'plus' | 'minus') => {
    const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1;
    updateItemQuantity(id, newQuantity);
  }

  const onSubmit = async (data: CheckoutFormValues) => {

    try {
      setSubmitting(true);
      
      const url = await  createOrder(data);

      toast.success('Заказ успешно оформлен! 📝 Переход на оплату... ', {
        icon: '✅',
      });

      if(url){
        location.href = url;
      }

    } 
    catch (error) {
      console.log(error);
      setSubmitting(false);
      toast.error('Не удалось создать заказ', {
        icon: '❌',
      });
    }
  }

  return (
    <>
      <div className="mt-10">
        <Title
          text="Оформление заказа"
          className="font-extrabold mb-8 text-[36px]"
        />
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex gap-10">
              {/* Левая часть */}
              <div className="flex flex-col gap-10 flex-1 mb-20">
                <CheckoutCart
                  items={items}
                  onClickCountButton={onClickCountButton}
                  removeCartItem={removeCartItem}
                  loading={loading}
                />

                <CheckoutPersonalForm className={cn({"opacity-40 pointer-events-none": loading})}/>

                <CheckoutAddressForm className={cn({"opacity-40 pointer-events-none": loading})}/>
              </div>

              {/* Левая часть */}
              <div className="w-[450px]">
                <CheckoutSidebar totalAmount={totalAmount} loading={loading || submitting}/>
              </div>
            </div>
          </form>
        </FormProvider>
      </div>
    </>
  );
}