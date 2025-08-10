import { useState } from "react";
import { FaImage } from "react-icons/fa";

export default function ImageUpload({ handleImageChange, preview }) {
  const [fileName, setFileName] = useState("");

  const onFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name); // حفظ اسم الملف
    } else {
      setFileName("");
    }
    handleImageChange(e); // استدعاء الدالة الأصلية
  };

  return (
    <div className="space-y-4 border-2 border-gray-300 shadow-lg flex flex-col items-center justify-center p-6 rounded-lg w-full">
      {/* label */}
      <label
        htmlFor="image"
        className="cursor-pointer flex flex-col items-center gap-2 p-4 border-2 border-dashed border-gray-400 rounded-lg hover:border-primary transition w-full"
      >
        {preview ? (
          <img
            src={preview}
            alt="Preview"
            className="rounded shadow-md w-full md:h-[500px] object-cover"
          />
        ) : (
          <FaImage size={40} className="text-gray-500" />
        )}
        {fileName && !preview && (
          <span className="text-sm text-gray-600 break-all">{fileName}</span>
        )}
      </label>

      {/* input file */}
      <input
        id="image"
        type="file"
        name="image"
        onChange={onFileChange}
        accept="image/*"
        className="hidden"
      />
    </div>
  );
}
