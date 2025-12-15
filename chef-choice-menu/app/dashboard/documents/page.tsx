"use client";

import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { DocumentService, Document } from '@/services/documentService';
import { FileText, Trash2, Upload, AlertCircle, CheckCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { toast, Toaster } from 'sonner';

export default function DocumentsPage() {
    const [documents, setDocuments] = useState<Document[]>([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);

    // Form state
    const [docName, setDocName] = useState('');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const fetchDocuments = async () => {
        try {
            setLoading(true);
            const data = await DocumentService.getDocuments();
            setDocuments(data);
        } catch (error) {
            console.error('Failed to fetch documents', error);
            toast.error('Failed to load documents');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDocuments();
    }, []);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0]);
        }
    };

    const handleUpload = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!docName.trim() || !selectedFile) {
            toast.error('Please provide both document name and file');
            return;
        }

        try {
            setUploading(true);
            const formData = new FormData();
            formData.append('name', docName);
            formData.append('attachment', selectedFile);

            await DocumentService.addDocument(formData);

            toast.success('Document uploaded successfully');

            // Reset form
            setDocName('');
            setSelectedFile(null);

            // Refresh list
            fetchDocuments();
        } catch (error: any) {
            console.error('Upload error', error);
            if (error.message === 'Service provider profile not found.' || error.message?.includes('profile not found')) {
                toast.error(
                    <div>
                        <p className="font-semibold">Profile Incomplete</p>
                        <p className="text-sm">Please complete your service provider profile in the Profile section before uploading documents.</p>
                        <a href="/dashboard/profile" className="text-sm underline mt-1 block hover:text-white/80">Go to Profile</a>
                    </div>,
                    { duration: 5000 }
                );
            } else {
                toast.error(error.message || 'Failed to upload document');
            }
        } finally {
            setUploading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this document?')) return;

        try {
            await DocumentService.deleteDocument(id);
            toast.success('Document deleted successfully');
            fetchDocuments(); // Refresh list to remove deleted item
        } catch (error: any) {
            console.error('Delete error', error);
            toast.error(error.message || 'Failed to delete document');
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'approved': return 'bg-green-100 text-green-700';
            case 'rejected': return 'bg-red-100 text-red-700';
            default: return 'bg-yellow-100 text-yellow-700';
        }
    };

    return (
        <DashboardLayout>
            <Toaster position="top-right" />
            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">My Documents</h1>
                    <p className="text-gray-600 mt-1">Manage your verification documents</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Upload Section */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <Upload className="w-5 h-5 text-primary-600" />
                                Upload Document
                            </h2>

                            <form onSubmit={handleUpload} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Document Name</label>
                                    <input
                                        type="text"
                                        value={docName}
                                        onChange={(e) => setDocName(e.target.value)}
                                        placeholder="e.g. PAN Card, ID Proof"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">File Attachment</label>
                                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50 transition-colors relative">
                                        <input
                                            type="file"
                                            onChange={handleFileChange}
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                            accept="image/*,.pdf"
                                        />
                                        <FileText className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                                        <p className="text-sm text-gray-500">
                                            {selectedFile ? selectedFile.name : 'Click to select file'}
                                        </p>
                                        <p className="text-xs text-gray-400 mt-1">PNG, JPG, PDF up to 5MB</p>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={uploading}
                                    className="w-full py-2.5 bg-gradient-to-r from-primary-500 to-warm-500 text-white rounded-lg font-semibold hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                >
                                    {uploading ? 'Uploading...' : 'Upload Document'}
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Documents List */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="p-6 border-b border-gray-100">
                                <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                                    <FileText className="w-5 h-5 text-primary-600" />
                                    Uploaded Documents
                                </h2>
                            </div>

                            {loading ? (
                                <div className="p-8 text-center text-gray-500">Loading documents...</div>
                            ) : documents.length === 0 ? (
                                <div className="p-12 text-center text-gray-500 flex flex-col items-center">
                                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                                        <FileText className="w-8 h-8 text-gray-300" />
                                    </div>
                                    <p className="font-medium">No documents uploaded yet</p>
                                    <p className="text-sm mt-1">Upload your verification documents to get verified</p>
                                </div>
                            ) : (
                                <div className="divide-y divide-gray-100">
                                    {documents.map((doc) => (
                                        <div key={doc.id} className="p-4 hover:bg-gray-50 transition-colors flex items-center justify-between group">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center text-primary-600 font-bold">
                                                    {doc.name.substring(0, 2).toUpperCase()}
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold text-gray-800">{doc.name}</h3>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <span className={`text-xs px-2 py-0.5 rounded-full capitalize ${getStatusColor(doc.status)}`}>
                                                            {doc.status}
                                                        </span>
                                                        <span className="text-xs text-gray-400">
                                                            {new Date(doc.created_date).toLocaleDateString()}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-3">
                                                <a
                                                    href={doc.attachment.startsWith('http') ? doc.attachment : `${process.env.NEXT_PUBLIC_API_BASE_URL}${doc.attachment}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all"
                                                    title="View Document"
                                                >
                                                    <FileText className="w-4 h-4" />
                                                </a>
                                                <button
                                                    onClick={() => handleDelete(doc.id)}
                                                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                                                    title="Delete Document"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
