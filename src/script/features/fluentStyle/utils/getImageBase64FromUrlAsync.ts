async function getImageBase64FromUrlAsync(url: string): Promise<string | ArrayBuffer | null> {
  let result: Response;
  let blob: Blob;

  try {
    result = await fetch(url);
    blob = await result.blob();
  } catch {
    return null;
  }

  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
}

export default getImageBase64FromUrlAsync;
