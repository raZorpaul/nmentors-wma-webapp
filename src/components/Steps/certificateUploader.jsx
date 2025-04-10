import React, { useState } from 'react';
import { FileUploaderDropContainer, FileUploaderItem, Button, InlineLoading } from '@carbon/react';
import mentorService from '../../services/mentorService.js'; // Import your upload service

const CertificateUploader = ({ onUploadSuccess }) => {
    const [files, setFiles] = useState([]); // Store selected files
    const [uploading, setUploading] = useState(false); // Track upload state
    const [uploadError, setUploadError] = useState(null); // Track upload errors
    const [uploadedFiles, setUploadedFiles] = useState([]); // Store successfully uploaded files

    // Handle file drop
    const handleFileDrop = (event, { addedFiles }) => {
        setFiles(addedFiles); // Update the files state with the selected files
        setUploadError(null); // Clear any previous errors
    };

    // Handle file upload
    const handleUpload = async () => {
        if (files.length === 0) {
            setUploadError('Please select at least one file to upload.');
            return;
        }

        setUploading(true);
        setUploadError(null);

        try {
            const response = await mentorService.uploadCertificates(files);

            // Update the uploaded files state with the response
            setUploadedFiles(response.certificates);
            setFiles([]); // Clear the selected files

            // Call the onUploadSuccess callback with the uploaded files
            if (onUploadSuccess) {
                console.log('upload success');
                console.log(response.certificates);
                onUploadSuccess(response.certificates);
            }
        } catch (error) {
            setUploadError(error.message || 'Failed to upload certificates.');
        } finally {
            setUploading(false);
        }
    };

    // Handle file removal
    const handleFileRemove = (fileName) => {
        setFiles((prevFiles) => prevFiles.filter((file) => file.name !== fileName));
    };

    return (
        <div>
            <h3>Upload Certificates</h3>
            <h6>Please upload certificates before submitting</h6>
            <FileUploaderDropContainer
                labelText="Drag and drop your certificates here or click to upload"
                accept={['.pdf', '.doc', '.docx']}
                multiple={true} // Allow multiple files
                onAddFiles={handleFileDrop}
            />

            {/* Display selected files */}
            <div style={{ marginTop: '1rem' }}>
                {files.map((file) => (
                    <FileUploaderItem
                        key={file.name}
                        name={file.name}
                        status="edit"
                        onDelete={() => handleFileRemove(file.name)}
                    />
                ))}
            </div>

            {/* Upload button */}
            <div style={{ marginTop: '1rem' }}>
                <Button
                    onClick={handleUpload}
                    disabled={uploading || files.length === 0}
                >
                    Upload
                </Button>
            </div>

            {/* Inline loading indicator */}
            {uploading && (
                <div style={{ marginTop: '1rem' }}>
                    <InlineLoading
                        description="Uploading files..."
                        status="active"
                    />
                </div>
            )}

            {/* Error message */}
            {uploadError && (
                <div style={{ marginTop: '1rem', color: 'red' }}>
                    {uploadError}
                </div>
            )}

            {/* Display uploaded files */}
            {uploadedFiles.length > 0 && (
                <div style={{ marginTop: '1rem' }}>
                    <h4>Uploaded Certificates:</h4>
                    <ul>
                        {uploadedFiles.map((file) => (
                            <li key={file.file_key}>
                                <a href={file.file_url} target="_blank" rel="noopener noreferrer">
                                    {file.file_name}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default CertificateUploader;
