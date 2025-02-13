import { CartItemDTO } from '@/shared/services/dto/cart.dto';
import React from 'react';

interface Props {
  orderId: number;
}

export const OrderFailedTemplate: React.FC<Props> = ({ orderId,}) => (
  <div>
    <h1>Что-то пошло не так!</h1>

    <p>Ваш заказ #{orderId} отменен!</p>


  </div>
);