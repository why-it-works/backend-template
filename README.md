# Node.js Microservices Backend Template

This is a production-grade backend template built with Node.js, Express, TypeScript, Knex, and SQLite. It follows a microservices architecture pattern and includes Swagger documentation for API endpoints.

## Features

- **Microservices Architecture**: Organized file structure for scalable applications
- **TypeScript**: Type-safe code with interfaces and models
- **Knex.js**: SQL query builder with migration support
- **SQLite**: Lightweight database (easily swappable with PostgreSQL, MySQL, etc.)
- **Swagger/OpenAPI**: Automatic API documentation
- **Repository Pattern**: Clean separation of concerns
- **Error Handling**: Standardized error responses
- **Validation**: Request validation with TSOA

## Project Structure

```
src/
├── controllers/        // API endpoint logic
├── services/           // Business logic
├── repositories/       // DB logic and knex setup
├── models/             // Type interfaces
├── middleware/         // Async/context middlewares
├── utils/              // Common utilities
├── routes/             // tsoa generated route binder
├── config/             // App configuration
├── static/             // Optional static files (Swagger UI assets)
├── swagger.json        // tsoa-generated Swagger doc
├── index.ts            // Entry point
└── tsconfig.json       // TypeScript config
```

## Getting Started

### Prerequisites

- Node.js (lts)
- npm or yarn

### Installation

1. Fork & Clone the repository

    ```bash
    git clone https://github.com/why-it-works/backend-template
    cd nodejs-microservices-template
    ```

2. Install dependencies

    ```bash
    nvm install --lts
    nvm use --lts
    npm install
    ```

3. Start the development server

    ```bash
    npm run build
    npm run dev
    ```

4. Access the Swagger UI
    ```
    http://localhost:3000/${your-api-document}
    ```

## Architecture Overview

### Controllers

Controllers handle HTTP requests and responses. They:

- Parse request parameters and body
- Call appropriate service methods
- Format and send responses
- Handle route-specific errors

```typescript
// Example controller
@Route('customers')
export class CustomerController extends Controller {
	constructor(private customerService: CustomerService = new CustomerService()) {
		super();
	}

	@Get('/')
	@Security('anonymous')
	public async getCustomers(): Promise<any> {
		try {
			const response = await this.customerService.findAll();
			return {
				success: true,
				message: '',
				data: response,
			};
		} catch (error) {
			this.setStatus(500);
			return {
				success: false,
				message: 'Internal Server Error',
				data: error,
			};
		}
	}
}
```

### Services

Services contain business logic and act as a bridge between controllers and repositories. They:

- Implement business rules and validations
- Orchestrate data operations through repositories
- Handle service-specific errors
- Transform data between controllers and repositories

```typescript
// Example service
export class CustomerService {
	constructor(private customerRepository: CustomerRepository = new CustomerRepository()) {}

	public async findAll() {
		try {
			const response = await this.customerRepository.findAll();
			return response;
		} catch (error) {
			throw error;
		}
	}

	public async create(data: Customer) {
		try {
			if (!data.name || !data.email) {
				throw new Error('Name and email are required');
			}

			const response = await this.customerRepository.create(data);
			return response;
		} catch (error) {
			throw error;
		}
	}
}
```

### Repositories

Repositories handle data access and database operations. They:

- Execute database queries using Knex
- Map database results to domain models
- Handle database-specific errors
- Provide CRUD operations for entities

```typescript
// Example repository
export class CustomerRepository {
	static tableName = 'customers';

	constructor(private db: Knex = connectToDb()) {}

	public async findAll(): Promise<any> {
		try {
			const customers = await this.db(CustomerRepository.tableName).select('*');
			return customers;
		} catch (err) {
			throw err;
		}
	}

	public async findById(id: string): Promise<any> {
		try {
			const customer = await this.db(CustomerRepository.tableName).where({ id }).first();

			return customer ?? null;
		} catch (err) {
			throw err;
		}
	}
}
```

## API Documentation

The API is documented using Swagger/OpenAPI. You can access the documentation at `/${your-api-doc}` when the server is running.

### Endpoints

- **GET /customers**: Get all customers
- **GET /customers/:id**: Get a customer by ID
- **POST /customers**: Create a new customer
- **PUT /customers/:id**: Update a customer
- **DELETE /customers/:id**: Delete a customer

## Database

This template uses SQLite by default for simplicity, but you can easily swap it with any database supported by Knex.js.

### Database Configuration

Database configuration is in `knex.ts`:

```javascript
module.exports = {
	development: {
		client: 'sqlite3',
		connection: {
			filename: ':memory:',
		},
		useNullAsDefault: true,
		migrations: {
			directory: './migrations',
		},
	},
	// Add production, testing configurations here
};
```

### Running Migrations

```bash
# Create a new migration
npx knex migrate:make migration_name

# Run migrations
npx knex migrate:latest

# Rollback migrations
npx knex migrate:rollback
```

## Error Handling

The template includes standardized error handling:

- HTTP 400: Bad Request (validation errors)
- HTTP 404: Not Found
- HTTP 500: Internal Server Error

All API responses follow this structure:

```json
{
  "success": true|false,
  "message": "Error or success message",
  "data": {} | null
}
```

## Extending the Template

### Adding a New Entity

1. Create model in `src/models/`
2. Create repository in `src/repositories/`
3. Create service in `src/services/`
4. Create controller in `src/controllers/`
5. Create migrations if needed

### Changing Database

1. Update `knexfile.js` with new database configuration
2. Install required database driver
    ```bash
    npm install pg # for PostgreSQL
    npm install mysql # for MySQL
    ```
3. Update connection in `src/repositories/knex.ts`

## Best Practices

1. **Validation**: Always validate input data
2. **Error Handling**: Use try/catch blocks and propagate errors properly
3. **Dependency Injection**: Use constructor injection for dependencies
4. **Transactions**: Use transactions for operations that modify multiple tables
5. **Security**: Sanitize inputs and use parameterized queries

## 📄 License

This project is licensed under the [MIT License](./LICENSE).
