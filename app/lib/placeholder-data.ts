// This file contains placeholder data that you'll be replacing with real data in the Data Fetching chapter:

import { count } from "console";

// https://nextjs.org/learn/dashboard-app/fetching-data
const users = [
  {
    id: '410544b2-4001-4271-9855-fec4b6a6442a',
    name: 'User',
    email: 'user@nextmail.com',
    password: '123456',
  },
];

const customers = [
  {
    id: 'd6e15727-9fe1-4961-8c5b-ea44a9bd81aa',
    name: 'Evil Rabbit',
    email: 'evil@rabbit.com',
    image_url: '/customers/evil-rabbit.png',
  },
  {
    id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
    name: 'Delba de Oliveira',
    email: 'delba@oliveira.com',
    image_url: '/customers/delba-de-oliveira.png',
  },
  {
    id: '3958dc9e-742f-4377-85e9-fec4b6a6442a',
    name: 'Lee Robinson',
    email: 'lee@robinson.com',
    image_url: '/customers/lee-robinson.png',
  },
  {
    id: '76d65c26-f784-44a2-ac19-586678f7c2f2',
    name: 'Michael Novotny',
    email: 'michael@novotny.com',
    image_url: '/customers/michael-novotny.png',
  },
  {
    id: 'CC27C14A-0ACF-4F4A-A6C9-D45682C144B9',
    name: 'Amy Burns',
    email: 'amy@burns.com',
    image_url: '/customers/amy-burns.png',
  },
  {
    id: '13D07535-C59E-4157-A011-F8D2EF4E0CBB',
    name: 'Balazs Orban',
    email: 'balazs@orban.com',
    image_url: '/customers/balazs-orban.png',
  },
];

const invoices = [
  {
    customer_id: customers[0].id,
    amount: 15795,
    status: 'pending',
    date: '2022-12-06',
  },
  {
    customer_id: customers[1].id,
    amount: 20348,
    status: 'pending',
    date: '2022-11-14',
  },
  {
    customer_id: customers[4].id,
    amount: 3040,
    status: 'paid',
    date: '2022-10-29',
  },
  {
    customer_id: customers[3].id,
    amount: 44800,
    status: 'paid',
    date: '2023-09-10',
  },
  {
    customer_id: customers[5].id,
    amount: 34577,
    status: 'pending',
    date: '2023-08-05',
  },
  {
    customer_id: customers[2].id,
    amount: 54246,
    status: 'pending',
    date: '2023-07-16',
  },
  {
    customer_id: customers[0].id,
    amount: 666,
    status: 'pending',
    date: '2023-06-27',
  },
  {
    customer_id: customers[3].id,
    amount: 32545,
    status: 'paid',
    date: '2023-06-09',
  },
  {
    customer_id: customers[4].id,
    amount: 1250,
    status: 'paid',
    date: '2023-06-17',
  },
  {
    customer_id: customers[5].id,
    amount: 8546,
    status: 'paid',
    date: '2023-06-07',
  },
  {
    customer_id: customers[1].id,
    amount: 500,
    status: 'paid',
    date: '2023-08-19',
  },
  {
    customer_id: customers[5].id,
    amount: 8945,
    status: 'paid',
    date: '2023-06-03',
  },
  {
    customer_id: customers[2].id,
    amount: 1000,
    status: 'paid',
    date: '2022-06-05',
  },
];

const revenue = [
  { month: 'Jan', revenue: 2000 },
  { month: 'Feb', revenue: 1800 },
  { month: 'Mar', revenue: 2200 },
  { month: 'Apr', revenue: 2500 },
  { month: 'May', revenue: 2300 },
  { month: 'Jun', revenue: 3200 },
  { month: 'Jul', revenue: 3500 },
  { month: 'Aug', revenue: 3700 },
  { month: 'Sep', revenue: 2500 },
  { month: 'Oct', revenue: 2800 },
  { month: 'Nov', revenue: 3000 },
  { month: 'Dec', revenue: 4800 },
];









// placeholder-data.ts

export const client_types = [
  {
    id: '34671842-c4c2-42c0-aaf0-2ca050a0a093',
    name: 'Corporate',
  },
  {
    id: '66666666-7777-8888-9999-aaaaaaaaaaaa',
    name: 'Prospect',
  },
];

export const clients = [
  {
    id: 'aceed847-5158-4735-aa92-7f5acf1948ab',
    name: 'Billy Corp',
    website: 'https://billycorp.com',
    main_number: '+1-800-555-0199',
    state: 'California',
    address: '123 Main St, Los Angeles, CA 90001',
    country: 'USA',
    client_type: '34671842-c4c2-42c0-aaf0-2ca050a0a093', // Corporate
    brief: 'Leading provider of innovative solutions in the tech industry.',
  },
  {
    id: 'd0834ae7-4e10-4394-b419-05a969365eae',
    name: 'BillyGon Unlimited',
    website: 'https://billygon.com',
    main_number: '+1-800-555-0198',
    state: 'New York',
    address: '456 Elm St, New York, NY 10001',
    country: 'USA',
    client_type: '66666666-7777-8888-9999-aaaaaaaaaaaa', // Prospect
    brief: 'Super corporate in various industries including aviation, architecture, logistics and general goods.',
  },
  {
    id: '4509057c-e359-4488-bd20-ffdab7a65dad',
    name: 'BillyBoom LLC',
    website: 'https://billyboom.com',
    main_number: '+1-800-555-0197',
    state: 'Texas',
    address: '789 Oak St, Houston, TX 77001',
    country: 'USA',
    client_type: '34671842-c4c2-42c0-aaf0-2ca050a0a093', // Corporate
    brief: 'A well-established firm specializing in financial services.',
  },
];

export const suppliers_manufacturers = [
  {
    id: '05e80e18-e381-488c-9179-924347d79db2',
    name: 'HP',
    website: 'https://www.hp.com',
    main_number: '+1-800-555-0100',
    country: 'USA',
    brief: 'Leading global provider of personal computing and other access devices, imaging and printing products, and related technologies, solutions and services.',
  },
  {
    id: 'afb95c3b-7cf5-4477-bb74-cbb2dca4a5d9',
    name: 'IKEA',
    website: 'https://www.ikea.com',
    main_number: '+1-800-555-0101',
    country: 'Sweden',
    brief: 'Multinational group that designs and sells ready-to-assemble furniture, kitchen appliances and home accessories.',
  },
];

export const product_types = [
  {
    id: 'c4011bcb-fb6a-4927-a8ae-e68569db592a',
    name: 'Laser Printer',
    supplier1: 'afb95c3b-7cf5-4477-bb74-cbb2dca4a5d9',
    supplier2: 'afb95c3b-7cf5-4477-bb74-cbb2dca4a5d9',
    manufacturer: 'afb95c3b-7cf5-4477-bb74-cbb2dca4a5d9',
    price: 299,
  },
  {
    id: '5af6a343-d4c4-41f1-acf9-c77d3ab93b94',
    name: 'Office Chair',
    supplier1: '05e80e18-e381-488c-9179-924347d79db2',
    supplier2: '05e80e18-e381-488c-9179-924347d79db2',
    manufacturer: '05e80e18-e381-488c-9179-924347d79db2',
    price: 149,
  },
  {
    id: '6e405b29-5602-4d55-bc68-f5da7419d10e',
    name: 'Coffee Machine',
    supplier1: '05e80e18-e381-488c-9179-924347d79db2',
    supplier2: '05e80e18-e381-488c-9179-924347d79db2',
    manufacturer: '05e80e18-e381-488c-9179-924347d79db2',
    price: null, // Price not fixed, to be quoted
  },
];

export const assets = [
  {
    product_type_id: 'c4011bcb-fb6a-4927-a8ae-e68569db592a',
    client_id: 'd0834ae7-4e10-4394-b419-05a969365eae',
    manufacturer_number: 'HP-PRN-12345',
    supplier_id: '05e80e18-e381-488c-9179-924347d79db2', // HP
    purchase_date: '2023-01-15',
    last_service_date: '2024-01-10',
    note: 'Under warranty until 2025',
  },
  {
    product_type_id: '5af6a343-d4c4-41f1-acf9-c77d3ab93b94',
    client_id: 'd0834ae7-4e10-4394-b419-05a969365eae',
    manufacturer_number: 'IKE-CHR-67890',
    supplier_id: '05e80e18-e381-488c-9179-924347d79db2', // IKEA
    purchase_date: '2022-07-01',
    last_service_date: '2023-06-15',
    note: 'Reupholstered in 2023',
  },
  {
    product_type_id: '6e405b29-5602-4d55-bc68-f5da7419d10e',
    client_id: '4509057c-e359-4488-bd20-ffdab7a65dad',
    manufacturer_number: 'NESP-CFM-54321',
    supplier_id: '05e80e18-e381-488c-9179-924347d79db2', // HP
    purchase_date: '2024-03-20',
    last_service_date: null,
    note: 'Quote pending for maintenance plan',
  },
];


export { users, customers, invoices, revenue };
