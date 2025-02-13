import React from "react";
import toast from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";

export const useSuccessDone = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  React.useEffect(() => {
    let toastMessage = "";

    if(searchParams.has('paid')){
      toastMessage = "Заказ успешно оплачен! Информация отправлена на почту."
    }

    if(searchParams.has('verified')){
      toastMessage = "Почта успешно подтверждена"
    }

    if(searchParams.has('verified') || searchParams.has('paid')){
      console.log("searchParams");
      setTimeout(() => {
        toast.success(toastMessage);
        router.replace('/');
      }, 500);
    }

  }, []);
}