CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

create table if not exists products (
	id uuid not null default uuid_generate_v4() primary key,
	title varchar not null,
	description text,
	price int
);

create table if not exists stocks (
	product_id uuid not null,
	count int,
	foreign key (product_id) references products (id)
)

insert into 
	products (title, description, price)
values
	('ProductOne', 'Short Product Description1', 2),
	('ProductNew', 'Short Product Description3', 10),
	('ProductTop', 'Short Product Description2', 100),
	('ProductTitle', 'Short Product Description7', 15),
	('Product', 'Short Product Description9', 88),
	('ProductTest', 'Short Product Description13', 28)
	
insert into
	stocks (product_id, count)
values
	('7d19e805-8dea-45c2-a3a1-40a3b89bd729', 4),
	('7d2a7237-56a4-4991-b99c-c675dbd4a40d', 6),
	('5a8241fe-2bb0-4867-909f-883f2696d47f', 12),
	('04788bd6-13cf-410d-9954-c565c4f55945', 3),
	('70f2fa11-f70a-4c78-9258-5765471cc096', 8),
	('25087620-31c7-4474-8733-41a8188cb926', 2)