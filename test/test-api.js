// backend/tests/test-api.js
require('dotenv').config({ path: '../.env' });
const axios = require('axios');

const BASE_URL = 'http://localhost:3000/api';
let authToken;

async function testAPI() {
    try {
        // Test 1: Register
        console.log('\n1. Testing Registration...');
        const registerRes = await axios.post(`${BASE_URL}/auth/register`, {
            email: `test${Date.now()}@example.com`,
            password: 'Test123!@#',
            name: 'Test User'
        });
        console.log('✓ Registration successful');

        // Test 2: Login
        console.log('\n2. Testing Login...');
        const loginRes = await axios.post(`${BASE_URL}/auth/login`, {
            email: registerRes.data.email,
            password: 'Test123!@#'
        });
        authToken = loginRes.data.token;
        console.log('✓ Login successful');
        console.log('Token received:', authToken.substring(0, 20) + '...');

        // Test 3: Create Todo
        console.log('\n3. Testing Todo Creation...');
        const todoRes = await axios.post(
            `${BASE_URL}/todos`,
            {
                title: 'Test Todo',
                description: 'Test Description'
            },
            {
                headers: { Authorization: `Bearer ${authToken}` }
            }
        );
        console.log('✓ Todo created:', todoRes.data);

        // Test 4: Get Todos
        console.log('\n4. Testing Todo Retrieval...');
        const todosRes = await axios.get(
            `${BASE_URL}/todos`,
            {
                headers: { Authorization: `Bearer ${authToken}` }
            }
        );
        console.log('✓ Todos retrieved:', todosRes.data);

        console.log('\n✓ All tests passed successfully!');
    } catch (error) {
        console.error('\n✗ Test failed:', error.response?.data || error.message);
        console.error('Status:', error.response?.status);
        console.error('Headers:', error.response?.headers);
    }
}

// Install required package
// npm install axios

// Run the tests
testAPI();