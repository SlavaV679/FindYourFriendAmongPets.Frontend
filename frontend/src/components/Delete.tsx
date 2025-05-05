import axios from "axios";
import { FilesService } from "../api/files";
import { useState } from "react";

export type DeleteRequestPayload = {
  bucketName: string;
  fileName: string;
  prefix: string;
  contentType: string;
};

export function FileDelete() {
  const [fileId, setFileId] = useState<string>("");
  const [info, setInfo] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async () => {
    setInfo(null);
    setError(null);

    if (!fileId) {
      setError("Введите Id файла");
      return;
    }

    setLoading(true);
    try {
      await FilesService.deleteFile(fileId);

      setInfo("Файл успешно удалён.");
      setFileId("");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.log(
          "err.response?.data?.message: " + err.response?.data?.message
        );
        console.log("err.message: " + err.message);
        setError(
          err.response?.data?.message ||
            err.message ||
            "Ошибка при удалении файла"
        );
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Неизвестная ошибка");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow flex flex-col gap-4">
      <h2 className="text-xl font-semibold text-gray-800">
        Удаление файла по Id
      </h2>
      <input
        type="text"
        className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="Введите Id файла (GUID)"
        value={fileId}
        onChange={(e) => setFileId(e.target.value)}
        disabled={loading}
      />
      <button
        onClick={handleDelete}
        disabled={loading}
        className="bg-red-600 text-white rounded px-4 py-2 hover:bg-red-700 transition-colors disabled:bg-gray-400"
      >
        {loading ? "Удаление..." : "Удалить файл"}
      </button>
      {info && (
        <div className="text-green-600 border border-green-200 bg-green-50 rounded px-3 py-2">
          {info}
        </div>
      )}
      {error && (
        <div className="text-red-600 border border-red-200 bg-red-50 rounded px-3 py-2">
          {error}
        </div>
      )}
    </div>
  );
}
