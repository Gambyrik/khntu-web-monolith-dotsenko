import { AppError } from '../utils/AppError';
import { Vehicle } from '../types/vehicle.types';

export class VehicleService {
  private vehicles: Vehicle[] = [
    { id: 1, brand: 'Toyota', model: 'Corolla', plateNumber: 'BX1234AA', pricePerDay: 1200, status: 'AVAILABLE' },
    { id: 2, brand: 'Skoda', model: 'Octavia', plateNumber: 'BX5678AB', pricePerDay: 1400, status: 'RENTED' },
    { id: 3, brand: 'Renault', model: 'Duster', plateNumber: 'BX9012AC', pricePerDay: 1600, status: 'AVAILABLE' }
  ];

  getAll(status?: string): Vehicle[] {
    if (!status) return this.vehicles;
    return this.vehicles.filter(v => v.status === status.toUpperCase());
  }

  getById(id: number): Vehicle {
    if (!Number.isInteger(id) || id <= 0) throw new AppError('Некоректний ідентифікатор авто', 400);
    const vehicle = this.vehicles.find(v => v.id === id);
    if (!vehicle) throw new AppError('Автомобіль не знайдено', 404);
    return vehicle;
  }

  create(data: Partial<Vehicle>): Vehicle {
    const { brand, model, plateNumber, pricePerDay } = data ?? {};
    if (!brand || !model || !plateNumber || typeof pricePerDay !== 'number' || pricePerDay <= 0) {
      throw new AppError('Потрібні поля brand, model, plateNumber та pricePerDay > 0', 400);
    }
    if (this.vehicles.some(v => v.plateNumber === plateNumber)) {
      throw new AppError('Авто з таким номерним знаком уже існує', 409);
    }
    const vehicle: Vehicle = {
      id: Math.max(0, ...this.vehicles.map(v => v.id)) + 1,
      brand,
      model,
      plateNumber,
      pricePerDay,
      status: 'AVAILABLE'
    };
    this.vehicles.push(vehicle);
    return vehicle;
  }

  delete(id: number): void {
    const vehicle = this.getById(id);
    if (vehicle.status === 'RENTED') throw new AppError('Неможливо видалити: авто зараз в оренді', 400);
    this.vehicles = this.vehicles.filter(v => v.id !== id);
  }
}
