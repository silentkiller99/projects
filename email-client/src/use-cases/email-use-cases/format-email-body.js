module.exports = function makeFormatEmailBody({
  Joi,
  ValidationError,
  cheerio,
  path,
}) {
  return async function formatEmailBody({ bodyHtml, inline }) {
    // validateInput({ bodyHtml });

    try {
      let $ = cheerio.load(bodyHtml);
      $("img").each((index, element) => {
        const src = $(element).attr("src");

        if (src?.includes("cid:")) {
          $(element).attr("src", "");

          let cid = $(element).attr("src").replace(/^cid:/, "");

          let attachmentPath = path.join(
            "http://localhost:5000/public/",
            `${inline[index].filename}`
          );
          $(element).attr("src", `${attachmentPath}`);
        }
      });
      return $.html();
    } catch (error) {
      console.error(error);
    }
  };
  function validateInput({ bodyHtml }) {
    let fetchUserFolderSchema = Joi.object({
      bodyHtml: Joi.html().required(),
    });
    let { error } = fetchUserFolderSchema.validate({
      bodyHtml,
    });
    if (error) {
      throw new ValidationError(error.message);
    }
  }
};
