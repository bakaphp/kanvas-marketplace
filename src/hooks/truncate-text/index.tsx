export function truncateText(text: string, max_height: number): string {
    if (text.length <= max_height) {
      return text;
    } else {
      let truncatedText = text.substring(0, max_height);
      const lastWordBoundary = truncatedText.lastIndexOf(" ");
  
      if (lastWordBoundary !== -1) {
        truncatedText = truncatedText.substring(0, lastWordBoundary) + "...";
      } else {
        truncatedText = truncatedText.substring(0, max_height) + "...";
      }
  
      return truncatedText;
    }
  }
  