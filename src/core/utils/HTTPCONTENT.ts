export const enum HTTPCONTENT {
  VIDEO_MP4 = "video/mp4",
  VIDEO_OGG = "video/ogg",
  VIDEO_WEBM = "video/webm",
  VIDEO_AVI = "video/avi",
  VIDEO_MPEG = "video/mpeg",

  HTML = "text/html",
  PLAIN = "text/plain",
  CSS = "text/css",
  JAVASCRIPT = "text/javascript",

  IMAGE_SVG = "image/svg+xml",
  IMAGE_JPEG = "image/jpeg+xml",
  IMAGE_PNG = "image/png+xml",
  IMAGE_GIF = "image/gif+xml",
  IMAGE_TIFF = "image/tiff+xml",

  AUDIO_WAV = "audio/wav+xml",
  AUDIO_MP4 = "audio/mp4+xml",
  AUDIO_MP3 = "audio/mpeg; codecs=mp3",
  AUDIO_OGG = "audio/ogg; codecs=vorbis",

  XHTML_XML = "application/xhtml+xml",
  XML = "application/xml",
  JSON = "application/json",
  BINARY = "application/octet-stream",
  PDF = "application/pdf",
}
export function contentTypeByExt(extension: string) {
  switch (extension) {
    case "mp4":
      return HTTPCONTENT.VIDEO_MP4;
    case "ogg":
      return HTTPCONTENT.VIDEO_OGG;
    case "webm":
      return HTTPCONTENT.VIDEO_WEBM;
    case "avi":
      return HTTPCONTENT.VIDEO_AVI;
    case "mpeg":
      return HTTPCONTENT.VIDEO_MPEG;
    case "html":
    case "xhtml":
      return HTTPCONTENT.HTML;
    case "text":
      return HTTPCONTENT.PLAIN;
    case "css":
      return HTTPCONTENT.CSS;
    case "js":
      return HTTPCONTENT.JAVASCRIPT;
    case "svg":
      return HTTPCONTENT.IMAGE_SVG;
    case "":
      return HTTPCONTENT.IMAGE_JPEG;
    case "":
      return HTTPCONTENT.IMAGE_PNG;
    case "":
      return HTTPCONTENT.IMAGE_GIF;
    case "":
      return HTTPCONTENT.IMAGE_TIFF;
    case "":
      return HTTPCONTENT.AUDIO_WAV;
    case "":
      return HTTPCONTENT.AUDIO_MP4;
    case "":
      return HTTPCONTENT.AUDIO_MP3;
    case "":
      return HTTPCONTENT.AUDIO_OGG;
    case "":
      return HTTPCONTENT.XHTML_XML;
    case "":
      return HTTPCONTENT.XML;
    case "":
      return HTTPCONTENT.JSON;
    case "":
      return HTTPCONTENT.PDF;
  }
  return HTTPCONTENT.BINARY;
}
