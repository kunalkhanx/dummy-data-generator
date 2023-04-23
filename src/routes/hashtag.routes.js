const express = require("express");
const axios = require("axios");
const Hashtag = require("../models/Hashtag");
const router = express.Router();

// FUNCTIONS
const hashtagString = (arr) => {
    return arr.join(" ");
};

const extractHashtags = (text) => {
    const hashtagRegex = /#[a-zA-Z0-9_]+/g;
  
    const hashtags = text.match(hashtagRegex);
  
    return hashtags ? hashtags : [];
}
  
const fetchGPT = async (keyword) => {
    const prompt = `Generate 30 popular instagram hashtag related to keyword '${keyword}'`;
    const body = {
        model: "gpt-3.5-turbo",
        messages: [
            {
                role: "user",
                content: prompt,
            },
        ],
    };
    const headers = {
        "content-type": "application/json",
        "X-RapidAPI-Key": "c73aff24f0msh7bee3d91830fdaep1b37f1jsn6950c81b918d",
        "X-RapidAPI-Host": "openai80.p.rapidapi.com",
    };
    const response = await axios.post('https://openai80.p.rapidapi.com/chat/completions', body, {headers})
    console.log(response)
    const content = response.data.choices[0].message.content
    return extractHashtags(content)
};


// ROUTES
router.get("/", async (req, res) => {
    try {
        const keyword = req.query.keyword.toLowerCase();
        let count = req.query.count ? parseInt(req.query.count) : 20;
        count = count > 30 ? 30 : count;
        if (!req.query.keyword) {
            throw new Error();
        }
        let hashtag = await Hashtag.findOne({ keyword });
        if (hashtag) {
            const tags = hashtag.tags.slice(0, count)
            const text = hashtagString(tags);
            res.status(200).json({
                keyword,
                count,
                caption: text,
                tags
            });
            return;
        }
        let gptTags = await fetchGPT(keyword)
        const tags = gptTags.slice(0, count)
        const caption = hashtagString(tags)
        if(tags.length !== 0){
            hashtag = new Hashtag({keyword, tags: gptTags})
            await hashtag.save()
        }
        res.status(200).json({
            keyword,
            count,
            caption,
            tags
            
            
        });
    } catch (e) {
        console.log(e)
        res.status(400).json({ message: "Invalid request." });
    }
});

// router.get('/fix', async (req, res) => {
//     await Hashtag.deleteOne({keyword: 'rose'})
//     res.status(200).send()
// })

module.exports = router;
