const shortid = require("shortid");
const Joi = require("joi");
const URL = require("../models/url");

// Define Joi schema for URL validation
const urlSchema = Joi.object({
  url: Joi.string().uri({
    scheme: ["http", "https"]
  }).required()
});

async function handleGenerateNewShortURL(req, res) {
  const body = req.body;

  // Validate URL using Joi
  const { error } = urlSchema.validate(body);
  if (error) {
    return res.status(400).json({ error: 'Invalid URL format' });
  }

  try {
    const shortID = shortid.generate(); // Generate unique short ID

    // Save the new short URL entry in the database
    const newUrlEntry = await URL.create({
      shortId: shortID,
      redirectURL: body.url,
      visitHistory: [],
    });

    // Send successful response with status 200 and success message
    return res.status(200).json({ 
      message: 'URL created successfully', 
      id: newUrlEntry.shortId 
    });
  } catch (dbError) {
    // Handle any database errors
    return res.status(500).json({ error: 'Database error while creating short URL' });
  }
}
async function handleGetAnalytics(req, res) {
  const shortId = req.params.shortId;
  
  try {
    const result = await URL.findOne({ shortId });
    
    if (!result) {
      return res.status(404).json({ error: 'URL not found' });
    }
    
    return res.json({
      totalClicks: result.visitHistory.length,
      analytics: result.visitHistory
    });
  } catch (dbError) {
    return res.status(500).json({ error: 'Database error while fetching analytics' });
  }
}

module.exports = {
  handleGenerateNewShortURL,
  handleGetAnalytics,
};
