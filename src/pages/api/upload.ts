// pages/api/upload.ts

import formidable, { File } from "formidable";
import fs from "fs";
import path from "path";
import { NextApiRequest, NextApiResponse } from "next";

// Important: Disable the default body parser for formidable to work
export const config = {
  api: {
    bodyParser: false,
  },
};

// Create folder if it doesn't exist
const createUploadsFolder = () => {
  const uploadFolder = path.join(process.cwd(), "/public/uploads");
  if (!fs.existsSync(uploadFolder)) {
    fs.mkdirSync(uploadFolder, { recursive: true });
  }
  return uploadFolder;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "الطريقة غير مدعومة" });
  }

  try {
    const uploadFolder = createUploadsFolder();

    const form = formidable({
      multiples: false,
      uploadDir: uploadFolder,
      keepExtensions: true,
      filename: (name, ext, part) => {
        const timestamp = Date.now();
        return `${timestamp}-${part.originalFilename}`;
      },
    });

    form.parse(req, (err, fields, files) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "حدث خطأ أثناء رفع الملف" });
      }

      const fileData = files.file;

      if (!fileData) {
        return res.status(400).json({ message: "يرجى رفع ملف" });
      }

      let file: File;

      if (Array.isArray(fileData)) {
        if (fileData.length === 0) {
          return res.status(400).json({ message: "يرجى رفع ملف" });
        }
        file = fileData[0]; // لو مصفوفة ناخد أول ملف
      } else {
        file = fileData as File; // لو ملف واحد
      }

      const filePath = file.filepath; 

      const fileUrl = `/uploads/${path.basename(filePath)}`;

      return res.status(200).json({ fileUrl });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "حدث خطأ أثناء رفع الملف" });
  }
}
