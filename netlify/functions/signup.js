
// netlify/functions/signup.js

exports.handler = async (event, context) => {
  try {
    // Parse data sent from form
    const data = JSON.parse(event.body);

    // Log to Netlify Functions console (you'll see this in Netlify logs)
    console.log("📩 New fan signup:", data);

    // Example response
    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: "Signup successful!",
        data,
      }),
    };
  } catch (error) {
    console.error("❌ Error processing signup:", error);

    return {
      statusCode: 400,
      body: JSON.stringify({
        success: false,
        message: "Invalid signup request",
        error: error.message,
      }),
    };
  }
};
