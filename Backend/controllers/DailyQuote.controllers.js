import Quote from "../Models/DailyQuote.js";

export const dailyQuote = async (req, res) => {
    try {
        const quotes = await Quote.find();
        if (!quotes) {
            return res.status(404).json({ message: 'No quote found' });
        }
        const quotesCount = quotes.length;
        const randomIndex = Math.floor(Math.random() * quotesCount);
        res.json(quotes[randomIndex]);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error!", error: error })
    }
}