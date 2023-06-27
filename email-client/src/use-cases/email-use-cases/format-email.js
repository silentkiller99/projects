module.exports = function makeFormatEmails({ b64Decode }) {
  /**
   * Decodes a url safe Base64 string to its original representation.
   * @param  {string} string
   * @return {string}
   */
  function urlB64Decode(string) {
    return string
      ? decodeURIComponent(
          escape(b64Decode(string.replace(/\-/g, "+").replace(/\_/g, "/")))
        )
      : "";
  }

  /**
   * Takes the header array filled with objects and transforms it into a more
   * pleasant key-value object.
   * @param  {array} headers
   * @return {object}
   */
  function indexHeaders(headers) {
    if (!headers) {
      return {};
    } else {
      return headers.reduce(function (result, header) {
        result[header.name] = header.value;
        return result;
      }, {});
    }
  }

  /**
   * Takes a response from the Gmail API's GET message method and extracts all
   * the relevant data.
   * @param  {object} response
   * @return {object}
   */
  return function formatEmail({ response }) {
    let result = {
      id: response.id,
      threadId: response.threadId,
      labelIds: response.labelIds,
      snippet: response.snippet,
      historyId: response.historyId,
    };
    if (response.internalDate) {
      result.internalDate = parseInt(response.internalDate);
    }

    let payload = response.payload;
    if (!payload) {
      return result;
    }

    let headers = indexHeaders(payload.headers);
    result.headers = headers;

    let parts = [payload];
    let firstPartProcessed = false;
    while (parts.length !== 0) {
      let part = parts.shift();
      if (part.parts) {
        parts = parts.concat(part.parts);
      }
      if (firstPartProcessed) {
        headers = indexHeaders(part.headers);
      }

      if (!part.body) {
        continue;
      }

      let isHtml = Boolean(
        part.mimeType && part.mimeType.includes("text/html")
      );
      let isPlain = Boolean(
        part.mimeType && part.mimeType.includes("text/plain")
      );
      let isAttachment = Boolean(
        part.body.attachmentId &&
          headers["Content-Disposition"] &&
          headers["Content-Disposition"].includes("attachment")
      );
      let isInline = Boolean(
        headers["Content-Disposition"] &&
          headers["Content-Disposition"].includes("inline")
      );
      // console.log(part);

      if (isHtml && !isAttachment) {
        result.textHtml = urlB64Decode(part.body.data);
      } else if (isPlain && !isAttachment) {
        result.textPlain = urlB64Decode(part.body.data);
      } else if (isAttachment) {
        let body = part.body;
        if (!result.attachments) {
          result.attachments = [];
        }
        result.attachments.push({
          filename: part.filename,
          mimeType: part.mimeType,
          size: body.size,
          attachmentId: body.attachmentId,
          headers: indexHeaders(part.headers),
        });
      } else if (isInline) {
        let body = part.body;
        if (!result.inline) {
          result.inline = [];
        }
        result.inline.push({
          filename: part.filename,
          mimeType: part.mimeType,
          size: body.size,
          attachmentId: body.attachmentId,
          headers: indexHeaders(part.headers),
        });
      }

      firstPartProcessed = true;
    }

    return result;
  };
};
