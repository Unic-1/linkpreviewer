const cheerio = require("cheerio");
const axios = require("axios");
const fs = require("fs");

// url is video
// const url = "https://www.youtube.com/watch?v=svhsstvqaE0";

function fetchDetails(data, url) {
  let $ = cheerio.load(data.toString());
  const thumbnail = $("meta[property='og:image']").get()[0]?.attribs?.content;
  const title =
    $("meta[property='og:title']").get()[0]?.attribs?.content || "Youtube";
  const description = $("meta[name='description']").get()[0]?.attribs?.content;
  const result = {
    thumbnail,
    title,
    url,
    description,
  };
  return result;
}

exports.fetchUrl = async (url) => {
  return await axios
    .get(url, {
      args: {},
      data: "",
      files: {},
      form: {},
      headers: {
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
        // "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "en-US",
        "Cp-Extension-Installed": "Yes",
        Referer: "https://www.youtube.com",
        "Sec-Fetch-Dest": "document",
        "Sec-Fetch-Mode": "navigate",
        "Sec-Fetch-Site": "cross-site",
        "Sec-Fetch-User": "?1",
        "Sec-Gpc": "1",
        "Upgrade-Insecure-Requests": "1",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.5112.81 Safari/537.36",
        "X-Amzn-Trace-Id": "Root=1-62ee1373-64ec4b185a0444b337e49daf",
      },
      origin: "https://www.google.com",
      url: "https://httpbin.org/anything",
    })
    .then((res) => {
      return fetchDetails(res.data, url);
    })
    .catch((err) => {
      console.log(err);
    });
};
