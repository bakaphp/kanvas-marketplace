export function isDownloadLink(url: string) {
  const fileExtensions = [
    '.zip',
    '.exe',
    '.pdf',
    '.jpg',
    '.png',
    '.rar',
    '.tar',
    '.gz',
    '.mp3',
    '.mp4',
  ];

  return fileExtensions.some((extension) =>
    url.toLowerCase().endsWith(extension),
  );
}
