import mongoose from 'mongoose';
import { OrderStatus } from '@braianmg-ticketing/common';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';

export { OrderStatus };

// An interface that describes the properties
// that are required to create a new Order
interface OrderAttrs {
  id: string;
  status: OrderStatus;
  version: number;
  userId: string;
  price: number;
}

// An interface that describes the properties
// that a Order Document has
interface OrderDoc extends mongoose.Document {
  status: OrderStatus;
  version: number;
  userId: string;
  price: number;
  //   createdAt: string; // We do not use it at the moment
  //   updatedAt: string; // We do not use it at the moment
}

// An interface that describes the properties
// that a Order Model has
interface OrderModel extends mongoose.Model<OrderDoc> {
  build(attrs: OrderAttrs): OrderDoc;
}

const orderSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      required: true,
      enum: Object.values(OrderStatus),
      default: OrderStatus.Created,
    },
    userId: {
      type: String,
      require: true,
    },
    price: {
      type: Number,
      require: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  },
);

orderSchema.set('versionKey', 'version');
orderSchema.plugin(updateIfCurrentPlugin);

orderSchema.statics.build = (attrs: OrderAttrs) => {
  return new Order({
    _id: attrs.id,
    version: attrs.version,
    price: attrs.price,
    userId: attrs.userId,
    status: attrs.status,
  });
};

const Order = mongoose.model<OrderDoc, OrderModel>('Order', orderSchema);

export { Order };
