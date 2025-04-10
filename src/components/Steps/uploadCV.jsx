import React, { useState } from 'react';
import { FileUploaderDropContainer, FileUploaderItem } from '@carbon/react';
import mentorService from '../../services/mentorService';

const CVUpload = ({ onUploadSuccess }) => {
    const [uploadedFile, setUploadedFile] = useState(null); // Stores the file name
    const [uploadStatus, setUploadStatus] = useState(null); // 'uploading', 'complete', or 'edit'
    const [fileKey, setFileKey] = useState(null); // Stores the S3 file key

    const handleFileDrop = async (event, { addedFiles }) => {
        const file = addedFiles[0]; // Get the first file from the dropped files
        if (file) {
            setUploadedFile(file.name); // Set the file name
            setUploadStatus('uploading'); // Set the status to uploading

            try {
                // Call the backend service to upload the file
                const response = await mentorService.uploadCV(file);
                const cvUrl = response.fileUrl; // Extract the file URL from the response
                const s3Key = response.fileKey; // Extract the S3 key from the response

                setFileKey(s3Key); // Save the S3 key for deletion
                setTimeout(() => {
                    setUploadStatus('complete'); // Set the status to 'complete' after upload
                    // Transition to 'edit' after 3 seconds
                    setTimeout(() => {
                        setUploadStatus('edit'); // Set the status to 'edit' to enable the delete button
                    }, 3000); // 3-second delay
                }, 500); // Add a small delay for better UX

                // Call the onUploadSuccess prop to send the CV URL to the parent component
                if (onUploadSuccess) {
                    onUploadSuccess(s3Key);
                }
            } catch (error) {
                console.error('Failed to upload CV:', error);
                setUploadStatus('edit'); // Set error status if upload fails
            }
        }
    };

    const handleDelete = async () => {
        if (fileKey) {
            try {
                // Call the backend service to delete the file from S3
                await mentorService.deleteFile(fileKey);
                console.log('File deleted successfully from S3');
            } catch (error) {
                console.error('Failed to delete file from S3:', error);
            }
        }

        // Reset the state when the file is deleted
        setUploadedFile(null);
        setUploadStatus(null);
        setFileKey(null);
    };

    return (
        <div>
            <FileUploaderDropContainer
                labelText="Drag and drop your CV here or click to upload"
                accept={['.pdf', '.doc', '.docx']}
                multiple={false} // Only allow one file at a time
                onAddFiles={handleFileDrop}
            />
            {uploadedFile && (
                <FileUploaderItem
                    name={uploadedFile}
                    status={uploadStatus} // 'uploading', 'complete', or 'edit'
                    onDelete={handleDelete} // Handle file deletion
                />
            )}
        </div>
    );
};

export default CVUpload;
