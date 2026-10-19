const { nanoid } = require("nanoid");
const URL = require('../models/url');

async function handleGenerateNewShortURL(req, res) {
    const redirectURL = req.body?.redirectURL?.trim();
    if (!redirectURL) {
        return res.status(400).send("Please enter a URL.");
    }
    const existing = await URL.findOne({
        redirectURL,
        createdBy: req.user._id,
    });

    if (existing) {
        const shortURL = `${req.protocol}://${req.get('host')}/url/${existing.shortId}`;
        return renderURLPage(req, res, shortURL);
    }

    // Generate a new shortID and save it...
    const shortID = nanoid(7);

    await URL.create({
        shortId: shortID,
        redirectURL,
        createdBy: req.user._id,
        visitHistory: [],
    });

    const shortURL = `${req.protocol}://${req.get('host')}/url/${shortID}`;
    return renderURLPage(req, res, shortURL);
}

async function renderURLPage(req, res, shortURL = null) {
    const urls = await URL.find({ createdBy: req.user._id }).sort({ createdAt: -1 });
    const baseURL = `${req.protocol}://${req.get('host')}`;
    return res.render('url', { shortURL, urls, baseURL });
}

async function handleGetUrl(req, res) {
    return renderURLPage(req, res);
}

async function handleGetOriginalURL(req, res) {
    const entry = await URL.findOneAndUpdate(
        { shortId: req.params.shortId },
        { $push: { "visitHistory": { timestamp: Date.now() } } },
        { new: true }
    );
    if (!entry) {
        return res.status(404).json({ error: "short URL not found" });
    }
    return res.redirect(entry.redirectURL);
}
async function handleGetAnalytics(req,res){
    const shorId=req.params.shortId;
    const entry = await URL.findOne({shortId: shorId});
    if (!entry) {
        return res.status(404).json({ error: "short URL not found" });
    }
    return res.json({ visitCount: entry.visitHistory.length });
}
module.exports = {
    handleGenerateNewShortURL,
    handleGetOriginalURL,
    handleGetUrl,
    handleGetAnalytics
}
