import { AppError } from '../utils/AppError';
import { RentalOption } from '../types/vehicle.types';

export class OptionService {
  private options: RentalOption[] = [
    { id: 1, title: 'Дитяче крісло', basePricePerDay: 100 },
    { id: 2, title: 'GPS-навігатор', basePricePerDay: 80 },
    { id: 3, title: 'Повне страхування (КАСКО)', basePricePerDay: 250 }
  ];

  getAll(): RentalOption[] {
    return this.options;
  }

  getById(id: number): RentalOption {
    if (!Number.isInteger(id) || id <= 0) throw new AppError('Некоректний ідентифікатор опції', 400);
    const option = this.options.find(o => o.id === id);
    if (!option) throw new AppError('Опцію не знайдено', 404);
    return option;
  }

  create(data: Partial<RentalOption>): RentalOption {
    const { title, basePricePerDay } = data ?? {};
    if (!title || typeof basePricePerDay !== 'number' || basePricePerDay < 0) {
      throw new AppError('Потрібні поля title та basePricePerDay >= 0', 400);
    }
    const option: RentalOption = {
      id: Math.max(0, ...this.options.map(o => o.id)) + 1,
      title,
      basePricePerDay
    };
    this.options.push(option);
    return option;
  }
}
