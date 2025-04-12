import { Knex } from 'knex';
import { getDb } from './knex';
import { Customer } from '../models/customer.model';

export class CustomerRepository {
	private static readonly tableName = 'customers';
	private db: Knex;

	constructor(trx?: Knex.Transaction) {
		this.db = trx ?? getDb();
	}

	public async create(customer: Customer): Promise<any> {
		try {
			await this.db(CustomerRepository.tableName).insert({
				id: customer.id,
				name: customer.name,
				email: customer.email,
				created_at: customer.created_at,
				updated_at: customer.updated_at,
			});

			return customer;
		} catch (err) {
			throw err;
		}
	}

	public async findAll(): Promise<any> {
		try {
			const response = await this.db(CustomerRepository.tableName).select('*');
			return response;
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

	public async update(id: string, updateData: Partial<Customer>): Promise<any> {
		try {
			await this.db(CustomerRepository.tableName)
				.where({ id })
				.update({
					...updateData,
					updated_at: new Date(),
				});

			const response = await this.findById(id);
			return response;
		} catch (err) {
			throw err;
		}
	}

	public async delete(id: string): Promise<any> {
		try {
			const deletedRows = await this.db(CustomerRepository.tableName).where({ id }).del();

			return deletedRows;
		} catch (err) {
			throw err;
		}
	}
}
