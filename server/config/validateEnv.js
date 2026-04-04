// Validate required environment variables
const validateEnv = () => {
    const requiredEnvVars = [
        'PORT',
        'MONGO_URI',
        'JWT_SECRET_KEY',
        'CLIENT_URL',
        'GEMINI_API_KEY',
        'STRIPE_SECRET_KEY',
        'STRIPE_WEBHOOK_SECRET'
    ];

    const missing = requiredEnvVars.filter(envVar => !process.env[envVar]);

    if (missing.length > 0) {
        console.error("❌ Missing required environment variables:", missing);
        process.exit(1);
    }

    console.log("✅ All required environment variables are set");
};

export default validateEnv;
