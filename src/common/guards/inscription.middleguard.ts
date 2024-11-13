import { Schema } from 'mongoose';

export function addUpdatedAtMiddleware(schema: Schema) {
  console.log(schema);
  schema.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
  });

  schema.pre('findOneAndUpdate', function (next) {
    this.set({ updatedAt: new Date() });
    next();
  });
}