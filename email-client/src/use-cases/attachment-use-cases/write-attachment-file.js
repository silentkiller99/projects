module.exports = function makeWriteAttachmentFile({ fs, path, Joi }) {
  return async function writeAttachmentFile({ data, fileName }) {
    const decode = Buffer.from(data, "base64");
    const filePath = path.join("public", fileName);
    fs.writeFile(`${filePath}`, decode, "binary", (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log(`File ${fileName} written successfully!`);
      }
    });

    return;
  };
};
