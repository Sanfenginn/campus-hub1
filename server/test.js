const bcrypt = require("bcrypt");

async function testHash() {
  try {
    const hashedPassword = await bcrypt.hash("12345", 10);
    console.log("Hashed password:", hashedPassword);
  } catch (error) {
    console.error("Error hashing password:", error);
  }
}

testHash();
