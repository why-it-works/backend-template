import { Body, Controller, Post, Route, Tags, Security, SuccessResponse, Get, Path, Put, Delete } from 'tsoa';
import { CustomerService } from '../services/customer.service';
import { Customer } from '../models/customer.model';

@Route('api/customer')
@Tags('Customers')
@Security('anonymous')
export class CustomerController extends Controller {
	public customerService = new CustomerService();

	@SuccessResponse('201')
	@Post()
	@Security('anonymous')
	public async createCustomer(@Body() requestBody: Customer): Promise<any> {
		try {
			const response = await this.customerService.create(requestBody);
			this.setStatus(201);
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

	@SuccessResponse('200')
	@Get()
	@Security('anonymous')
	public async findAllCustomers(): Promise<any> {
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

	@SuccessResponse('200')
	@Get('/:id')
	@Security('anonymous')
	public async findCustomerById(@Path() id: string): Promise<any> {
		try {
			const response = await this.customerService.findById(id);
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

	@SuccessResponse('200')
	@Put('/:id')
	@Security('anonymous')
	public async updateCustomer(
		@Path() id: string,
		@Body() requestBody: { id: string; name: string; email: string },
	): Promise<any> {
		try {
			const response = await this.customerService.update(id, requestBody);
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

	@SuccessResponse('200')
	@Delete('/:id')
	@Security('anonymous')
	public async deleteCustomer(@Path() id: string): Promise<any> {
		try {
			const response = await this.customerService.delete(id);
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
