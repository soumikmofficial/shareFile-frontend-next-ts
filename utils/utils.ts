export const convertBytes = (bytes: number) => {
  const mb = bytes / (1024 * 1024);
  return mb.toFixed(3);
};
