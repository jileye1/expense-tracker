// Test runner with setup and teardown

const { execSync } = require('child_process');

console.log('🚀 Starting API Tests...\n');

try {
    // Run different test suites
    console.log('📋 Running Model Tests...');
    execSync('npm run test -- --testNamePattern="Model"', { stdio: 'inherit' });
    
    console.log('\n🔐 Running Authentication Tests...');
    execSync('npm run test -- tests/api/auth.test.js', { stdio: 'inherit' });
    
    console.log('\n💰 Running API Tests...');
    execSync('npm run test -- tests/api/expenses.test.js', { stdio: 'inherit' });
    execSync('npm run test -- tests/api/income.test.js', { stdio: 'inherit' });
    execSync('npm run test -- tests/api/category.test.js', { stdio: 'inherit' });
    
    console.log('\n🔄 Running Integration Tests...');
    execSync('npm run test -- tests/integration.test.js', { stdio: 'inherit' });
    
    console.log('\n📊 Generating Coverage Report...');
    execSync('npm run test:coverage', { stdio: 'inherit' });
    
    console.log('\n✅ All tests completed successfully!');
    console.log('📈 Check coverage report in coverage/lcov-report/index.html');
    
} catch (error) {
    console.error('\n❌ Tests failed:', error.message);
    process.exit(1);
}

/*
USAGE:
node tests/scripts/testRunner.js
*/
