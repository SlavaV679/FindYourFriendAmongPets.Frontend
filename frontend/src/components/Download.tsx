import { FormEvent, useState } from "react";
import { FilesService } from "../api/files";

// Определяем интерфейсы
export type ETagInfo = {
  partNumber: number;
  eTag: string;
};

export type FileDTO = {
  id: string;
  name: string;
  contentType: string;
  fullPath: string;
  size: number;
  storageInfo: string;
  bucketName: string;
  prefix: string;
  key: string;
  uploadId: string;
  downloadUrl: string;
  partNumber: number;
  createdDate: string;
  eTags?: ETagInfo[];
};

const getXDaysBeforeDateTimeLocal = (daysBefore: number): string => {
  const now = new Date();

  // Приводим к формату YYYY-MM-DDTHH:MM
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate() - daysBefore).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

export function Download() {
  const [files, setFiles] = useState<FileDTO[]>([]);
  const [dateFrom, setDateFrom] = useState(getXDaysBeforeDateTimeLocal(7));
  const [dateTo, setDateTo] = useState(getXDaysBeforeDateTimeLocal(0));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await FilesService.getFilesByDate(dateFrom, dateTo);

      if (!response.status) {
        throw new Error("Ошибка при получении данных");
      }

      const data: FileDTO[] = await response.data;
      setFiles(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (file: FileDTO) => {
    try {
      await FilesService.downloadFile(file.downloadUrl, file.name);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <form
        onSubmit={handleSubmit}
        className="mb-8 p-6 bg-white rounded-lg shadow-md"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Дата начала
            </label>
            <input
              type="datetime-local"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Дата окончания
            </label>
            <input
              type="datetime-local"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full md:w-auto px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:bg-gray-400"
        >
          {loading ? "Загрузка..." : "Получить данные"}
        </button>
      </form>

      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {files.map((file) => (
          <div className="p-4 border rounded-lg transition-shadow">
            <div
              key={file.id}
              onClick={() => handleDownload(file)}
              className="cursor-pointer p-4 border rounded-lg hover:shadow-lg transition-shadow"
            >
              {/* <div className="flex justify-between items-start mb-2"> */}
              <h3 className="text-lg font-semibold truncate">{file.name}</h3>
              <span className="text-sm text-gray-500 whitespace-nowrap">
                {(file.size / 1024).toFixed(2)} KB
              </span>
              <div className="ml-4 flex-shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 text-gray-500 hover:text-blue-600 transition-colors"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                  />
                </svg>
              </div>
            </div>

            <div className="space-y-1 text-sm text-gray-600">
              <p>
                <span className="font-medium">Bucket:</span> {file.bucketName}
              </p>
              <p>
                <span className="font-medium">Folder:</span> {file.prefix}
              </p>
              <p>
                <span className="font-medium">Тип:</span> {file.contentType}
              </p>
              <p>
                <span className="font-medium">Дата:</span>{" "}
                {new Date(file.createdDate).toLocaleString()}
              </p>
              <p>
                <span className="font-medium">Доп.инфо:</span>{" "}
                {file.storageInfo}
              </p>
              <p>
                <span className="font-medium">Id:</span> {file.id}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
