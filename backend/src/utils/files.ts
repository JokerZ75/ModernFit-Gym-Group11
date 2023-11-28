import fs from "fs/promises";

const deleteFile = async (path: string) => {
  try {
    await fs.unlink(path);
  } catch (err) {
    console.error(err);
  }
};

export {
  deleteFile,
};
