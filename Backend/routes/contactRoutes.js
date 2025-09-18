// In your Backend/routes/contactRoutes.js
import express from "express";
import Contact from "../models/Contact.js";

const router = express.Router();

// POST: Create new contact message
router.post("/", async (req, res) => {
  try {
    console.log('=== CONTACT FORM SUBMISSION ===');
    console.log('Request body:', req.body);
    console.log('Request headers:', req.headers);
    
    const { name, email, message } = req.body;

    // Validation
    if (!name || !email || !message) {
      console.log('Validation failed: Missing required fields');
      return res.status(400).json({
        success: false,
        message: "Please provide name, email, and message",
        received: { name: !!name, email: !!email, message: !!message }
      });
    }

    // Additional validation
    if (name.trim().length < 2) {
      return res.status(400).json({
        success: false,
        message: "Name must be at least 2 characters long"
      });
    }

    if (message.trim().length < 10) {
      return res.status(400).json({
        success: false,
        message: "Message must be at least 10 characters long"
      });
    }

    // Create new contact message
    const newContact = new Contact({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      message: message.trim()
    });

    console.log('Attempting to save contact:', {
      name: newContact.name,
      email: newContact.email,
      messageLength: newContact.message.length
    });

    const savedContact = await newContact.save();
    console.log('Contact saved successfully with ID:', savedContact._id);

    res.status(201).json({
      success: true,
      message: "Thank you! Your message has been sent successfully. We'll get back to you soon.",
      data: {
        id: savedContact._id,
        name: savedContact.name,
        email: savedContact.email,
        createdAt: savedContact.createdAt
      }
    });

  } catch (error) {
    console.error("=== CONTACT FORM ERROR ===");
    console.error("Error details:", error);
    console.error("Error stack:", error.stack);
    
    // Handle mongoose validation errors
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: validationErrors
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to send message. Please try again later.",
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// GET: Fetch all contact messages (for admin)
router.get("/", async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: contacts.length,
      data: contacts
    });
  } catch (error) {
    console.error("Fetch contacts error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch contact messages"
    });
  }
});

// GET: Test endpoint
router.get("/test", (req, res) => {
  res.json({
    success: true,
    message: "Contact routes are working!",
    timestamp: new Date()
  });
});

export default router;