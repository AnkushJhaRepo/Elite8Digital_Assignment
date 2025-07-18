import React, { useEffect, useState } from 'react';
import API from '@/api/axios';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import {
    Search,
    Users,
    CheckCircle,
    XCircle,
    Mail,
    Filter,
    TrendingUp,
    TrendingDown,
    User
} from 'lucide-react';

type Student = {
    _id: string;
    fullname: string;
    email: string;
    fees_status: boolean;
};

const ITEMS_PER_PAGE = 10;

const AllStudents: React.FC = () => {
    const [students, setStudents] = useState<Student[]>([]);
    const [loading, setLoading] = useState(true);
    const [filtered, setFiltered] = useState<Student[]>([]);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [filterStatus, setFilterStatus] = useState<'all' | 'paid' | 'unpaid'>('all');

    const fetchStudents = async () => {
        try {
            const res = await API.get('/get-all');
            setStudents(res.data?.data || []);
            setFiltered(res.data?.data || []);
        } catch (err: any) {
            alert(err.response?.data?.message || 'Failed to load students');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    useEffect(() => {
        const s = search.toLowerCase();
        let filteredList = students.filter(
            (student) =>
                student.fullname.toLowerCase().includes(s) ||
                student.email.toLowerCase().includes(s)
        );

        // Apply status filter
        if (filterStatus === 'paid') {
            filteredList = filteredList.filter(student => student.fees_status);
        } else if (filterStatus === 'unpaid') {
            filteredList = filteredList.filter(student => !student.fees_status);
        }

        setFiltered(filteredList);
        setPage(1);
    }, [search, students, filterStatus]);

    const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
    const paginatedData = filtered.slice(
        (page - 1) * ITEMS_PER_PAGE,
        page * ITEMS_PER_PAGE
    );

    // Calculate statistics
    const totalStudents = students.length;
    const paidStudents = students.filter(s => s.fees_status).length;
    const unpaidStudents = totalStudents - paidStudents;
    const paymentRate = totalStudents > 0 ? (paidStudents / totalStudents) * 100 : 0;

    if (loading) {
        return (
            <div className="p-6">
                <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    <p className="text-gray-600 font-medium">Loading students...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="text-center space-y-2">
                <h1 className="text-3xl font-bold text-gray-900">Student Management</h1>
                <p className="text-gray-600">Manage and view all registered students</p>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100">
                    <CardContent className="p-4">
                        <div className="flex items-center space-x-3">
                            <div className="p-2 bg-blue-500 rounded-lg">
                                <Users className="h-6 w-6 text-white" />
                            </div>
                            <div>
                                <p className="text-sm text-blue-600 font-medium">Total Students</p>
                                <p className="text-2xl font-bold text-blue-900">{totalStudents}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100">
                    <CardContent className="p-4">
                        <div className="flex items-center space-x-3">
                            <div className="p-2 bg-green-500 rounded-lg">
                                <CheckCircle className="h-6 w-6 text-white" />
                            </div>
                            <div>
                                <p className="text-sm text-green-600 font-medium">Fees Paid</p>
                                <p className="text-2xl font-bold text-green-900">{paidStudents}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-0 shadow-lg bg-gradient-to-br from-red-50 to-red-100">
                    <CardContent className="p-4">
                        <div className="flex items-center space-x-3">
                            <div className="p-2 bg-red-500 rounded-lg">
                                <XCircle className="h-6 w-6 text-white" />
                            </div>
                            <div>
                                <p className="text-sm text-red-600 font-medium">Fees Unpaid</p>
                                <p className="text-2xl font-bold text-red-900">{unpaidStudents}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100">
                    <CardContent className="p-4">
                        <div className="flex items-center space-x-3">
                            <div className="p-2 bg-purple-500 rounded-lg">
                                {paymentRate >= 50 ? (
                                    <TrendingUp className="h-6 w-6 text-white" />
                                ) : (
                                    <TrendingDown className="h-6 w-6 text-white" />
                                )}
                            </div>
                            <div>
                                <p className="text-sm text-purple-600 font-medium">Payment Rate</p>
                                <p className="text-2xl font-bold text-purple-900">{paymentRate.toFixed(1)}%</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Search and Filter Controls */}
            <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row gap-4 items-center">
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <Input
                                placeholder="Search by name or email..."
                                className="pl-10 h-11 border-2 border-gray-200 focus:border-blue-500 rounded-xl"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>

                        <div className="flex items-center space-x-2">
                            <Filter className="h-5 w-5 text-gray-500" />
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => setFilterStatus('all')}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${filterStatus === 'all'
                                        ? 'bg-blue-100 text-blue-700 shadow-sm'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                        }`}
                                >
                                    All
                                </button>
                                <button
                                    onClick={() => setFilterStatus('paid')}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${filterStatus === 'paid'
                                        ? 'bg-green-100 text-green-700 shadow-sm'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                        }`}
                                >
                                    Paid
                                </button>
                                <button
                                    onClick={() => setFilterStatus('unpaid')}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${filterStatus === 'unpaid'
                                        ? 'bg-red-100 text-red-700 shadow-sm'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                        }`}
                                >
                                    Unpaid
                                </button>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Students Table */}
            <Card className="border-0 shadow-lg">
                <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                        <Users className="h-5 w-5" />
                        <span>Students List</span>
                        <Badge variant="secondary" className="ml-2">
                            {filtered.length} {filtered.length === 1 ? 'student' : 'students'}
                        </Badge>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-200">
                                    <th className="text-left py-4 px-4 font-semibold text-gray-700">
                                        <div className="flex items-center space-x-2">
                                            <User className="h-4 w-4" />
                                            <span>Name</span>
                                        </div>
                                    </th>
                                    <th className="text-left py-4 px-4 font-semibold text-gray-700">
                                        <div className="flex items-center space-x-2">
                                            <Mail className="h-4 w-4" />
                                            <span>Email</span>
                                        </div>
                                    </th>
                                    <th className="text-left py-4 px-4 font-semibold text-gray-700">
                                        Payment Status
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedData.map((student, index) => (
                                    <tr
                                        key={student._id}
                                        className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                                            }`}
                                    >
                                        <td className="py-4 px-4">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                                                    <span className="text-white font-semibold text-sm">
                                                        {student.fullname.charAt(0).toUpperCase()}
                                                    </span>
                                                </div>
                                                <div>
                                                    <p className="font-medium text-gray-900">{student.fullname}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-4">
                                            <p className="text-gray-600">{student.email}</p>
                                        </td>
                                        <td className="py-4 px-4">
                                            <Badge
                                                variant={student.fees_status ? "default" : "destructive"}
                                                className={`flex items-center space-x-1 w-fit ${student.fees_status
                                                    ? 'bg-green-100 text-green-800 hover:bg-green-200'
                                                    : 'bg-red-100 text-red-800 hover:bg-red-200'
                                                    }`}
                                            >
                                                {student.fees_status ? (
                                                    <>
                                                        <CheckCircle className="h-3 w-3" />
                                                        <span>Paid</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <XCircle className="h-3 w-3" />
                                                        <span>Unpaid</span>
                                                    </>
                                                )}
                                            </Badge>
                                        </td>
                                    </tr>
                                ))}
                                {paginatedData.length === 0 && (
                                    <tr>
                                        <td colSpan={3} className="text-center py-12">
                                            <div className="flex flex-col items-center space-y-3">
                                                <div className="p-4 bg-gray-100 rounded-full">
                                                    <Users className="h-8 w-8 text-gray-400" />
                                                </div>
                                                <div className="text-center">
                                                    <p className="text-gray-500 font-medium">No students found</p>
                                                    <p className="text-sm text-gray-400">
                                                        {search || filterStatus !== 'all'
                                                            ? 'Try adjusting your search or filter'
                                                            : 'No students have been registered yet'
                                                        }
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex justify-center">
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious
                                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                                    className={`cursor-pointer ${page === 1 ? 'pointer-events-none opacity-50' : 'hover:bg-gray-100'}`}
                                />
                            </PaginationItem>

                            <PaginationItem>
                                <div className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg font-medium">
                                    Page {page} of {totalPages}
                                </div>
                            </PaginationItem>

                            <PaginationItem>
                                <PaginationNext
                                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                                    className={`cursor-pointer ${page === totalPages ? 'pointer-events-none opacity-50' : 'hover:bg-gray-100'}`}
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            )}
        </div>
    );
};

export default AllStudents;