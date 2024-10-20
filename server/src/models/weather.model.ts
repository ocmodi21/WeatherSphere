import mongoose, { Schema, Document } from "mongoose";

// Interface for the Weather document
export interface Weather extends Document {
  city: string;
  main: string;
  temp: number;
  feels_like: number;
  dt: number;
}

// Weather schema definition
const WeatherSchema: Schema = new Schema(
  {
    city: { type: String, required: true },
    main: { type: String, required: true },
    temp: { type: Number, required: true },
    feels_like: { type: Number, required: true },
    dt: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

// Creating the Weather model
const WeatherModel = mongoose.model<Weather>("Weather", WeatherSchema);

export default WeatherModel;
