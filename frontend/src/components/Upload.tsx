import { Button } from "@mui/material";
import { FilesService } from "../api/files";

export type PartETagInfo = {
  partNumber: number;
  eTag: string;
};
export function Upload() {
  const handleFileChange = async (file: File) => {
    const {
      data: { key, uploadId },
    } = await FilesService.startMultipart(
      file.name,
      "files",
      "prefix",
      file.type,
      file.size
    );
    const chunkSize = 10 * 1024 * 1024; // 10 MB
    const parts: PartETagInfo[] = [];
    let partNumber = 1;
    for (let start = 0; start < file.size; start += chunkSize) {
      const chunk = file.slice(start, start + chunkSize);
      const { data } = await FilesService.getPresignedUrl(
        file.name,
        key,
        "files",
        "prefix",
        file.type,
        uploadId,
        partNumber
      );
      const response = await FilesService.uploadPart(data.url, chunk);
      const eTag = response.headers["etag"] as string;
      parts.push({ partNumber, eTag });
      partNumber++;
    }
    const response = await FilesService.completeMultipart(
      file.name,
      key,
      "files",
      "prefix",
      file.type,
      uploadId,
      parts
    );
    alert(`Upload complete! + ${response.data.location}`);
  };
  return (
    <section className="flex flex-col px-10 py-8 gap-6 w-full">
      <Button component="label" variant="contained" tabIndex={-1}>
        Upload Video
        <input
          type="file"
          className="hidden"
          accept="video/*"
          multiple={false}
          onChange={(e) => handleFileChange(e.target.files![0])}
        />
      </Button>
      {/* {Object.keys(uploadProgress).map((partNumber) => (
				<div key={partNumber}>
					<Typography variant="body1">
						Part {partNumber} - {uploadProgress[Number(partNumber)]}%
					</Typography>
					<LinearProgress
						variant="determinate"
						value={uploadProgress[Number(partNumber)]}
					/>
				</div>
			))} */}
    </section>
  );
}
