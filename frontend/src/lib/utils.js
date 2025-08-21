export function formatDate(dateString) {
  if (!dateString) return ""; // Return empty string if no date is provided
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}