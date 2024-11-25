'use client';

import React, { useEffect, useState } from 'react';
import { FiFilter, FiRefreshCw } from 'react-icons/fi';

interface Transaction {
  id: number;
  date: string;
  description: string;
  amount: number;
  payment_mode: string;
  account_id: string;
  department: string;
  category: string;
  zoho_match: string;
}

const ViewPage = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    department: '',
    category: '',
    payment_mode: '',
  });
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value) queryParams.append(key, value);
      });

      const response = await fetch(`/api/transactions?${queryParams}`);
      const data = await response.json();
      setTransactions(data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [filters]);

  const uniqueDepartments = [...new Set(transactions.map(t => t.department))];
  const uniqueCategories = [...new Set(transactions.map(t => t.category))];
  const uniquePaymentModes = [...new Set(transactions.map(t => t.payment_mode))];

  const getTotalAmount = () => {
    return transactions.reduce((sum, t) => sum + t.amount, 0);
  };

  const getTransactionsByDepartment = () => {
    const result: Record<string, number> = {};
    transactions.forEach(t => {
      result[t.department] = (result[t.department] || 0) + t.amount;
    });
    return result;
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">View Dashboard</h1>
        <div className="flex space-x-3">
          <button
            onClick={() => setIsFilterModalOpen(true)}
            className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <FiFilter className="mr-2" />
            Filter
          </button>
          <button
            onClick={fetchTransactions}
            className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            <FiRefreshCw className="mr-2" />
            Refresh
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Total Amount</h3>
          <p className="text-2xl font-bold text-gray-900">₹{getTotalAmount().toFixed(2)}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Total Transactions</h3>
          <p className="text-2xl font-bold text-gray-900">{transactions.length}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Departments</h3>
          <p className="text-2xl font-bold text-gray-900">{uniqueDepartments.length}</p>
        </div>
      </div>

      {/* Department-wise Breakdown */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">Department-wise Breakdown</h2>
        <div className="space-y-4">
          {Object.entries(getTransactionsByDepartment()).map(([dept, amount]) => (
            <div key={dept} className="flex items-center">
              <div className="w-32 font-medium text-gray-700">{dept}</div>
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-indigo-600"
                    style={{
                      width: `${(amount / getTotalAmount()) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>
              <div className="w-32 text-right text-gray-600">₹{amount.toFixed(2)}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Filter Modal */}
      {isFilterModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Filter Transactions</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Department
                </label>
                <select
                  value={filters.department}
                  onChange={(e) => setFilters({ ...filters, department: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="">All Departments</option>
                  {uniqueDepartments.map((dept) => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  value={filters.category}
                  onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="">All Categories</option>
                  {uniqueCategories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Payment Mode
                </label>
                <select
                  value={filters.payment_mode}
                  onChange={(e) => setFilters({ ...filters, payment_mode: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="">All Payment Modes</option>
                  {uniquePaymentModes.map((mode) => (
                    <option key={mode} value={mode}>{mode}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => {
                  setFilters({ department: '', category: '', payment_mode: '' });
                  setIsFilterModalOpen(false);
                }}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Reset
              </button>
              <button
                onClick={() => setIsFilterModalOpen(false)}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewPage;
