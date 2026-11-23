# khntu-web-monolith-dotsenko

Наскрізний проєкт з дисципліни **«Технологія розробки Інтернет-застосунків»** (ХНТУ).
Виконав: Доценко Андрій Юрійович, група 3ЦТ.

## Варіант 4. Сервіс оренди авто та автопарку

Сервіс дозволяє клієнтам орендувати автомобілі з автопарку компанії та додавати до
оренди платні опції (дитяче крісло, GPS-навігатор, повна страховка тощо).

* **User** — користувач системи (орендар, менеджер автопарку або адміністратор).
* **Vehicle** — автомобіль автопарку (марка, модель, номерний знак, ціна за добу, статус).
* **Rental** — оренда: хто, яке авто, з якої по яку дату, загальна вартість, статус.
* **Option** — додаткова опція, яку можна замовити до оренди.
* **RentalOption** — проміжна таблиця зв'язку N:M між Rental та Option
  з власними атрибутами `dailyPrice` (ціна опції за добу на момент оренди) та `rentalDays`.

**Зв'язки:** User 1:N Rental, Vehicle 1:N Rental, Rental N:M Option через RentalOption.

**Ролі:** USER (орендар), MANAGER (менеджер автопарку), ADMIN (головний адміністратор).

## ER-діаграма

```mermaid
erDiagram
    USER ||--o{ RENTAL : "оформлює"
    VEHICLE ||--o{ RENTAL : "орендується в"
    RENTAL ||--o{ RENTAL_OPTION : "містить"
    OPTION ||--o{ RENTAL_OPTION : "входить до"
    USER {
        int id PK
        string email
        string fullName
        string role "USER | MANAGER | ADMIN"
        datetime createdAt
    }
    VEHICLE {
        int id PK
        string brand
        string model
        string plateNumber
        float pricePerDay
        string status "AVAILABLE | RENTED | SERVICE"
    }
    RENTAL {
        int id PK
        int userId FK
        int vehicleId FK
        date startDate
        date endDate
        float totalAmount
        string status
    }
    OPTION {
        int id PK
        string title
        float basePricePerDay
    }
    RENTAL_OPTION {
        int id PK
        int rentalId FK
        int optionId FK
        float dailyPrice
        int rentalDays
    }
```

## Запуск

```bash
npm install
cp .env.example .env
npm run dev
# GET http://localhost:3000/api/v1/health
```
