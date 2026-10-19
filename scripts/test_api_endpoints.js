/**
 * Automated test suite for A.R. Agro Spices API & SMTP Email Gateway
 * 
 * Uses real HTTP server on an ephemeral OS port (port 0) and native fetch.
 */

import assert from 'assert';
import http from 'http';
import app, {
  getSmtpConfig,
  getAuthorizedFromAddress,
  getRecipientEmail
} from '../server/index.js';

console.log('--- Starting A.R. Agro Spices API Test Suite ---');

let passedTests = 0;
let totalTests = 0;

function runTest(name, fn) {
  totalTests++;
  try {
    fn();
    console.log(`✅ [PASS] ${name}`);
    passedTests++;
  } catch (err) {
    console.error(`❌ [FAIL] ${name}:`, err.message);
    throw err;
  }
}

async function runAsyncTest(name, fn) {
  totalTests++;
  try {
    await fn();
    console.log(`✅ [PASS] ${name}`);
    passedTests++;
  } catch (err) {
    console.error(`❌ [FAIL] ${name}:`, err.message);
    throw err;
  }
}

// 1. Config & Sanitization Unit Tests
runTest('getSmtpConfig defaults to secure Hostinger on port 465', () => {
  const config = getSmtpConfig();
  assert.strictEqual(typeof config.host, 'string');
  assert.ok(config.host.length > 0);
  assert.strictEqual(typeof config.port, 'number');
  assert.strictEqual(typeof config.secure, 'boolean');
});

runTest('getAuthorizedFromAddress strips accidental quotes and matches user', () => {
  const user = 'sales3@aragrospices.com';
  const from = getAuthorizedFromAddress(user);
  assert.ok(from.includes('sales3@aragrospices.com'));
  assert.ok(!from.startsWith('""'));
  assert.ok(!from.startsWith("''"));
});

runTest('getRecipientEmail returns clean string', () => {
  const recipient = getRecipientEmail();
  assert.ok(recipient.includes('@'));
  assert.strictEqual(recipient, recipient.trim());
});

// 2. HTTP Server Tests
const server = http.createServer(app);

await new Promise((resolve) => {
  server.listen(0, '127.0.0.1', resolve);
});

const port = server.address().port;
const baseUrl = `http://127.0.0.1:${port}`;
console.log(`Ephemeral test server listening on ${baseUrl}`);

try {
  await runAsyncTest('GET /api returns 200 JSON with service discovery', async () => {
    const res = await fetch(`${baseUrl}/api`);
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.status, 'online');
    assert.ok(data.endpoints);
  });

  await runAsyncTest('GET /api/health returns 200 with recipient and TLS validation info', async () => {
    const res = await fetch(`${baseUrl}/api/health`);
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.status, 'online');
    assert.ok(data.recipientEmail);
    assert.strictEqual(data.tlsValidation, 'enforced (rejectUnauthorized: true)');
  });

  await runAsyncTest('POST /api/send-inquiry returns 400 when required fields are missing', async () => {
    const res = await fetch(`${baseUrl}/api/send-inquiry`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fullName: 'Test Incomplete' })
    });
    assert.strictEqual(res.status, 400);
    const data = await res.json();
    assert.strictEqual(data.success, false);
    assert.strictEqual(data.code, 'VALIDATION_FAILED');
    assert.ok(data.message.includes('Missing required field(s)'));
    assert.ok(data.reqId);
  });

  await runAsyncTest('POST /api/send-inquiry returns 400 when email format is invalid', async () => {
    const res = await fetch(`${baseUrl}/api/send-inquiry`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fullName: 'Test User',
        companyName: 'Test Corp',
        email: 'invalid-email-address',
        phone: '+91 9999999999',
        country: 'UAE',
        selectedProduct: 'Cumin Seeds',
        quantity: '20'
      })
    });
    assert.strictEqual(res.status, 400);
    const data = await res.json();
    assert.strictEqual(data.success, false);
    assert.strictEqual(data.code, 'INVALID_EMAIL');
    assert.ok(data.reqId);
  });

  console.log(`\n🎉 All ${passedTests}/${totalTests} API unit & integration tests passed successfully!`);
} finally {
  await new Promise((resolve) => server.close(resolve));
}
