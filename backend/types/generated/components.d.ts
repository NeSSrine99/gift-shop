import type { Schema, Struct } from '@strapi/strapi';

export interface OrderCartItem extends Struct.ComponentSchema {
  collectionName: 'components_order_cart_items';
  info: {
    displayName: 'CartItem';
    icon: 'shoppingCart';
  };
  attributes: {
    name: Schema.Attribute.String;
    price: Schema.Attribute.Decimal;
    quantity: Schema.Attribute.Integer;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'order.cart-item': OrderCartItem;
    }
  }
}
