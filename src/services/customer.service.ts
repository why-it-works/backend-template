import { CustomerRepository } from '../repositories/customer.repository';
import { v4 as uuid } from 'uuid';
import { Customer } from '../models/customer.model';

export class CustomerService {
	private customerRepository = new CustomerRepository();

	constructor() {
		this.customerRepository = new CustomerRepository();
	}

	public async create(data: Customer) {
		try {
			const customer: Customer = {
				id: data.id || uuid(), // Generate ID if not provided
				name: data.name,
				email: data.email,
				created_at: new Date(),
				updated_at: new Date(),
			};

			if (!customer.name || !customer.email) {
				throw new Error('Name and email are required');
			}

			const response = await this.customerRepository.create(customer);

			return response;
		} catch (error) {
			throw error;
		}
	}

	public async findAll() {
		try {
			const response = await this.customerRepository.findAll();

			return response;
		} catch (error) {
			throw error;
		}
	}

	public async findById(id: string) {
		try {
			const response = await this.customerRepository.findById(id);

			return response;
		} catch (error) {
			throw error;
		}
	}

	public async update(id: string, updateData: Partial<Customer>) {
		try {
			if (!updateData.name || !updateData.email) {
				throw new Error('Name and email are required');
			}

			const response = await this.customerRepository.update(id, updateData);

			return response;
		} catch (error) {
			throw error;
		}
	}

	public async delete(id: string) {
		try {
			const response = await this.customerRepository.delete(id);

			return response;
		} catch (error) {
			throw error;
		}
	}
}
