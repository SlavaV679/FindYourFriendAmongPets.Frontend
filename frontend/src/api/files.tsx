import axios from "axios";
import { PartETagInfo } from "../components/Upload";

export class FilesService {
  static async startMultipart(
    fileName: string,
    bucketName: string,
    prefix: string,
    contentType: string,
    size: number
  ) {
    console.log("contentType: " + contentType);
    return axios.post<{ key: string; uploadId: string }>(
      "http://localhost:5042/files/multipart",
      {
        fileName,
        bucketName,
        prefix,
        contentType,
        size,
      }
    );
  }

  static async getPresignedUrl(
    fileName: string,
    key: string,
    bucketName: string,
    prefix: string,
    contentType: string,
    uploadId: string,
    partNumber: number
  ) {
    return axios.post<{ key: string; url: string }>(
      `http://localhost:5042/files/${key}/presigned-part`,
      {
        fileName,
        bucketName,
        prefix,
        contentType,
        uploadId,
        partNumber,
      }
    );
  }

  static async uploadPart(url: string, chunk: Blob) {
    return axios.put(url, chunk, {
      headers: {
        "Content-Type": chunk.type,
      },
    });
  }

  static async completeMultipart(
    fileName: string,
    key: string,
    bucketName: string,
    prefix: string,
    contentType: string,
    uploadId: string,
    parts: PartETagInfo[]
  ) {
    return axios.post<{ key: string; location: string }>(
      `http://localhost:5042/files/${key}/complete-multipart`,
      { fileName, bucketName, prefix, contentType, uploadId, parts }
    );
  }
}
