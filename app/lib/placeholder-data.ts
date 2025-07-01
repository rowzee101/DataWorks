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
    id: '1a2b3c4d-5e6f-78a-9b0c-d1e2f3g4h5i6',
    name: 'Corporate',
  },
  {
    id: '222b3c4d-5e6f-78a-9b0c-d1e2f3g4h5i6',
    name: 'Prospect',
  },
];

export const clients = [
  {
    id: 'a1111111-1111-1111-1111-111111111111',
    name: 'Billy Corp',
    website: 'https://billycorp.com',
    main_number: '+1-800-555-0199',
    state: 'California',
    address: '123 Main St, Los Angeles, CA 90001',
    country: 'USA',
    client_type: '1a2b3c4d-5e6f-78a-9b0c-d1e2f3g4h5i6', // Corporate
    brief: 'Leading provider of innovative solutions in the tech industry.',
  },
  {
    id: 'b2222222-2222-2222-2222-222222222222',
    name: 'BillyGon Unlimited',
    website: 'https://billygon.com',
    main_number: '+1-800-555-0198',
    state: 'New York',
    address: '456 Elm St, New York, NY 10001',
    country: 'USA',
    client_type: '1a2b3c4d-222b3c4d-78a-9b0c-d1e2f3g4h5i6', // Prospect
    brief: 'Super corporate in various industries including aviation, architecture, logistics and general goods.',
  },
  {
    id: 'c3333333-3333-3333-3333-333333333333',
    name: 'BillyBoom LLC',
    website: 'https://billyboom.com',
    main_number: '+1-800-555-0197',
    state: 'Texas',
    address: '789 Oak St, Houston, TX 77001',
    country: 'USA',
    client_type: '1a2b3c4d-5e6f-78a-9b0c-d1e2f3g4h5i6', // Corporate
    brief: 'A well-established firm specializing in financial services.',
  },
];

export const suppliers_manufacturers = [
  {
    id: 'a1111111-1111-1111-1111-111111111111',
    name: 'HP',
    website: 'https://www.hp.com',
    main_number: '+1-800-555-0100',
    country: 'USA',
    brief: 'Leading global provider of personal computing and other access devices, imaging and printing products, and related technologies, solutions and services.',
  },
  {
    id: 'b2222222-2222-2222-2222-22222222222',
    name: 'IKEA',
    website: 'https://www.ikea.com',
    main_number: '+1-800-555-0101',
    country: 'Sweden',
    brief: 'Multinational group that designs and sells ready-to-assemble furniture, kitchen appliances and home accessories.',
  },
];

export const product_types = [
  {
    id: 'd4444444-4444-4444-4444-444444444444',
    name: 'Laser Printer',
    supplier1: 'HP',
    supplier2: 'HP',
    manufacturer: 'IKEA',
    price: 299,
  },
  {
    id: 'e5555555-5555-5555-5555-555555555555',
    name: 'Office Chair',
    supplier1: 'IKEA',
    supplier2: 'HP',
    manufacturer: 'IKEA',
    price: 149,
  },
  {
    id: 'f6666666-6666-6666-6666-666666666666',
    name: 'Coffee Machine',
    supplier1: 'Nespresso',
    supplier2: 'HP',
    manufacturer: 'IKEA',
    price: null, // Price not fixed, to be quoted
  },
];

export const assets = [
  {
    id: 'g7777777-7777-7777-7777-777777777777',
    product_type_id: 'd4444444-4444-4444-4444-444444444444',
    client_id: 'a1111111-1111-1111-1111-111111111111',
    manufacturer_number: 'HP-PRN-12345',
    supplier_id: 'a1111111-1111-1111-1111-111111111111', // HP
    purchase_date: '2023-01-15',
    last_service_date: '2024-01-10',
    note: 'Under warranty until 2025',
  },
  {
    id: 'h8888888-8888-8888-8888-888888888888',
    product_type_id: 'e5555555-5555-5555-5555-555555555555',
    client_id: 'b2222222-2222-2222-2222-222222222222',
    manufacturer_number: 'IKE-CHR-67890',
    supplier_id: 'b2222222-2222-2222-2222-22222222222', // IKEA
    purchase_date: '2022-07-01',
    last_service_date: '2023-06-15',
    note: 'Reupholstered in 2023',
  },
  {
    id: 'i9999999-9999-9999-9999-999999999999',
    product_type_id: 'f6666666-6666-6666-6666-666666666666',
    client_id: 'c3333333-3333-3333-3333-333333333333',
    manufacturer_number: 'NESP-CFM-54321',
    supplier_id: 'a1111111-1111-1111-1111-111111111111', // HP
    purchase_date: '2024-03-20',
    last_service_date: null,
    note: 'Quote pending for maintenance plan',
  },
];


export { users, customers, invoices, revenue };
