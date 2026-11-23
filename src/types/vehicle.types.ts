export type VehicleStatus = 'AVAILABLE' | 'RENTED' | 'SERVICE';

export interface Vehicle {
  id: number;
  brand: string;
  model: string;
  plateNumber: string;
  pricePerDay: number;
  status: VehicleStatus;
}

export interface RentalOption {
  id: number;
  title: string;
  basePricePerDay: number;
}
