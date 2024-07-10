export const mockPromise = <T>(
  path: string,
  input: unknown,
  output: { error?: unknown; success: T },
  delay = 1500
) => {
  console.log("Mock Promise:", { input, path });
  return new Promise<T>((resolve, reject) => {
    setTimeout(() => {
      if (output.error) {
        console.log("Mock Promise Error:", output.error);
        reject(output.error);
      } else {
        console.log("Mock Promise Success:", output.success);
        resolve(output.success);
      }
    }, delay);
  });
};
