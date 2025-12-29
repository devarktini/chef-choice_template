"use client";

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { BankAccount } from '@/types/bankAccount';

interface BankAccountFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  initialData?: BankAccount | null;
}

export default function BankAccountFormModal({ 
  isOpen, 
  onClose, 
  onSubmit, 
  initialData 
}: BankAccountFormModalProps) {
  const [formData, setFormData] = useState({
    bank_name: '',
    account_name: '',
    account_number: '',
    ifsc_code: '',
    is_active: true
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        bank_name: initialData.bank_name || '',
        account_name: initialData.account_name || '',
        account_number: initialData.account_number || '',
        ifsc_code: initialData.ifsc_code || '',
        is_active: initialData.is_active || true
      });
    } else {
      setFormData({
        bank_name: '',
        account_name: '',
        account_number: '',
        ifsc_code: '',
        is_active: true
      });
    }
    setErrors({});
  }, [initialData, isOpen]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Bank Name validation - only letters and spaces
    if (!formData.bank_name.trim()) {
      newErrors.bank_name = 'Bank name is required';
    } else if (/[0-9]/.test(formData.bank_name)) {
      newErrors.bank_name = 'Bank name cannot contain numbers';
    }

    // Account Name validation - only letters and spaces
    if (!formData.account_name.trim()) {
      newErrors.account_name = 'Account name is required';
    } else if (/[0-9]/.test(formData.account_name)) {
      newErrors.account_name = 'Account name cannot contain numbers';
    }

    // Account Number validation - only numbers
    if (!formData.account_number.trim()) {
      newErrors.account_number = 'Account number is required';
    } else if (!/^\d+$/.test(formData.account_number)) {
      newErrors.account_number = 'Account number must contain only numbers';
    } else if (formData.account_number.length < 9 || formData.account_number.length > 18) {
      newErrors.account_number = 'Account number should be between 9-18 digits';
    }

    // IFSC Code validation - only uppercase letters and numbers
    if (!formData.ifsc_code.trim()) {
      newErrors.ifsc_code = 'IFSC code is required';
    } else if (!/^[A-Z0-9]+$/.test(formData.ifsc_code)) {
      newErrors.ifsc_code = 'IFSC code must contain only capital letters and numbers';
    } else if (formData.ifsc_code.length !== 11) {
      newErrors.ifsc_code = 'IFSC code must be exactly 11 characters';
    }

    // Branch Name validation - only letters and spaces
    // if (!formData.branch_name.trim()) {
    //   newErrors.branch_name = 'Branch name is required';
    // } else if (/[0-9]/.test(formData.branch_name)) {
    //   newErrors.branch_name = 'Branch name cannot contain numbers';
    // }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    
    // Apply input restrictions based on field type
    let processedValue = value;
    
    if (name === 'account_number') {
      // Allow only numbers
      processedValue = value.replace(/\D/g, '');
    } else if (name === 'ifsc_code') {
      // Convert to uppercase and allow only letters and numbers
      processedValue = value.toUpperCase().replace(/[^A-Z0-9]/g, '');
    } else if (name === 'bank_name' || name === 'account_name' || name === 'branch_name') {
      // Remove numbers from text fields (allow only letters, spaces, and basic punctuation)
      processedValue = value.replace(/[0-9]/g, '');
    }

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : processedValue
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-bold text-gray-800">
            {initialData ? 'Edit Bank Account' : 'Add Bank Account'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Bank Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Bank Name *
            </label>
            <input
              type="text"
              name="bank_name"
              value={formData.bank_name}
              onChange={handleChange}
              className={`w-full px-4 py-2.5 rounded-lg border ${errors.bank_name ? 'border-red-300' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              placeholder="Enter bank name"
              maxLength={50}
            />
            {errors.bank_name && (
              <p className="mt-1 text-sm text-red-600">{errors.bank_name}</p>
            )}
          </div>

          {/* Account Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Account Holder Name *
            </label>
            <input
              type="text"
              name="account_name"
              value={formData.account_name}
              onChange={handleChange}
              className={`w-full px-4 py-2.5 rounded-lg border ${errors.account_name ? 'border-red-300' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              placeholder="Enter account holder name"
              maxLength={50}
            />
            {errors.account_name && (
              <p className="mt-1 text-sm text-red-600">{errors.account_name}</p>
            )}
          </div>

          {/* Account Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Account Number *
            </label>
            <input
              type="text"
              name="account_number"
              value={formData.account_number}
              onChange={handleChange}
              className={`w-full px-4 py-2.5 rounded-lg border ${errors.account_number ? 'border-red-300' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              placeholder="Enter account number"
              maxLength={18}
              inputMode="numeric"
            />
            {errors.account_number && (
              <p className="mt-1 text-sm text-red-600">{errors.account_number}</p>
            )}
          </div>

          {/* IFSC Code */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              IFSC Code *(AAAA0XXXXXX)
            </label>
            <input
              type="text"
              name="ifsc_code"
              value={formData.ifsc_code}
              onChange={handleChange}
              className={`w-full px-4 py-2.5 rounded-lg border ${errors.ifsc_code ? 'border-red-300' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              placeholder="Enter 11-digit IFSC code"
              maxLength={11}
              style={{ textTransform: 'uppercase' }}
            />
            {errors.ifsc_code && (
              <p className="mt-1 text-sm text-red-600">{errors.ifsc_code}</p>
            )}
          </div>

          {/* Branch Name */}
          {/* <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Branch Name *
            </label>
            <input
              type="text"
              name="branch_name"
              value={formData.branch_name}
              onChange={handleChange}
              className={`w-full px-4 py-2.5 rounded-lg border ${errors.branch_name ? 'border-red-300' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              placeholder="Enter branch name"
              maxLength={50}
            />
            {errors.branch_name && (
              <p className="mt-1 text-sm text-red-600">{errors.branch_name}</p>
            )}
          </div> */}

          {/* Active Status */}
          <div className="flex items-center space-x-3 pt-2">
            <input
              type="checkbox"
              id="is_active"
              name="is_active"
              checked={formData.is_active}
              onChange={handleChange}
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            />
            <label htmlFor="is_active" className="text-sm text-gray-700">
              Set as active account
            </label>
          </div>

          {/* Buttons */}
          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              {initialData ? 'Update Account' : 'Add Account'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}