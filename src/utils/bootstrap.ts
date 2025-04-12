import { getDb } from '../repositories/knex';

export const initializeSchema = async () => {
	const db = getDb();

	const hasCustomer = await db.schema.hasTable('customers');
	if (!hasCustomer) {
		await db.schema.createTable('customers', (table) => {
			table.string('id').primary();
			table.string('name').notNullable();
			table.string('email').notNullable().unique();
			table.timestamps(true, true);
		});
		console.log('Customers table created');
	}
};
