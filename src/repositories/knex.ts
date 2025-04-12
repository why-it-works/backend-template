import knex, { Knex } from 'knex';

let db: knex.Knex<any, unknown[]>;

const connectToDb = async (): Promise<Knex> => {
	if (!db) {
		db = knex({
			client: 'sqlite3',
			connection: {
				filename: ':memory:', // In-memory DB
			},
			useNullAsDefault: true,
			pool: {
				afterCreate: (conn: any, done: any) => {
					// Optional: run schema setup after connection
					conn.run('PRAGMA foreign_keys = ON', done);
				},
			},
		});

		console.log('Connected to in-memory SQLite DB');
	}

	return db;
};

export const getDb = (): Knex => {
	if (!db) throw new Error('Database not connected.');
	return db;
};

export { connectToDb, db };
