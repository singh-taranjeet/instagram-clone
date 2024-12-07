export function getImages(media: { url: string; name: string }[]) {
  return media.map((item) => item.url);
}
