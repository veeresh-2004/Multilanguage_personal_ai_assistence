// In your Backend/routes/contactRoutes.js
import express from "express";
import Contact from "../models/Contact.js";

const router = express.Router();

// POST: Create new contact message
router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Please provide name, email, and message"
      });
    }

    // Create new contact message
    const newContact = new Contact({
      name,
      email,
      message
    });

    await newContact.save();

    res.status(201).json({
      success: true,
      message: "Your message has been sent successfully! We'll get back to you soon.",
      data: {
        id: newContact._id,
        name: newContact.name,
        email: newContact.email,
        createdAt: newContact.createdAt
      }
    });

  } catch (error) {
    console.error("Contact submission error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to send message. Please try again later."
    });
  }
});

// GET: Fetch all contact messages (for admin)
router.get("/", async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
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

// PUT: Update contact status (for admin)
router.put("/:id/status", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updatedContact = await Contact.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedContact) {
      return res.status(404).json({
        success: false,
        message: "Contact message not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Status updated successfully",
      data: updatedContact
    });
  } catch (error) {
    console.error("Update contact status error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update status"
    });
  }
});

export default router;