import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import API from '@/api/axios';
import { useNavigate } from 'react-router-dom';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { User, Mail, Lock, Eye, EyeOff, UserPlus, AlertCircle, CheckCircle } from 'lucide-react';

type FormData = {
  fullname: string;
  email: string;
  password: string;
};

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm<FormData>();

  const password = watch('password');

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    setError(null);

    try {
      await API.post('/register', data);
      setSuccess(true);
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err: any) {
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const getPasswordStrength = (password: string) => {
    if (!password) return { strength: 0, label: '', color: '' };

    let strength = 0;
    if (password.length >= 6) strength++;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    const levels = [
      { label: 'Very Weak', color: 'bg-red-500' },
      { label: 'Weak', color: 'bg-orange-500' },
      { label: 'Fair', color: 'bg-yellow-500' },
      { label: 'Good', color: 'bg-blue-500' },
      { label: 'Strong', color: 'bg-green-500' }
    ];

    return { strength, ...levels[Math.min(strength, 4)] };
  };

  const passwordStrength = getPasswordStrength(password || '');

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-8">
        <Card className="w-full max-w-md shadow-xl rounded-3xl border-0 bg-white/95 backdrop-blur-sm">
          <CardContent className="flex flex-col items-center space-y-6 p-8">
            <div className="p-4 bg-green-100 rounded-full">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-gray-900">Registration Successful!</h2>
              <p className="text-gray-600">
                Your account has been created. Redirecting to login...
              </p>
            </div>
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-8">
      <Card className="w-full max-w-md shadow-xl rounded-3xl border-0 bg-white/95 backdrop-blur-sm">
        <CardHeader className="space-y-1 pb-6">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-gradient-to-br from-green-500 to-blue-600 rounded-2xl">
              <UserPlus className="h-8 w-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-center text-gray-900">
            Create Account
          </CardTitle>
          <p className="text-center text-gray-600 text-sm">
            Join us today and get started
          </p>
        </CardHeader>

        <CardContent className="space-y-6 px-8 pb-8">
          {error && (
            <Alert variant="destructive" className="bg-red-50 border-red-200">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="text-red-800">
                {error}
              </AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="fullname" className="text-sm font-semibold text-gray-700">
                Full Name
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  id="fullname"
                  {...register("fullname", {
                    required: "Full name is required",
                    minLength: {
                      value: 2,
                      message: "Name must be at least 2 characters"
                    }
                  })}
                  placeholder="Enter your full name"
                  className={`pl-10 h-12 rounded-xl border-2 transition-all duration-200 ${errors.fullname
                    ? 'border-red-300 focus:border-red-500'
                    : 'border-gray-200 focus:border-blue-500'
                    }`}
                  disabled={isLoading}
                />
              </div>
              {errors.fullname && (
                <p className="text-red-500 text-sm flex items-center space-x-1">
                  <AlertCircle className="h-4 w-4" />
                  <span>{errors.fullname.message}</span>
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-semibold text-gray-700">
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  id="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+\.\S+$/,
                      message: "Please enter a valid email address"
                    }
                  })}
                  placeholder="Enter your email"
                  className={`pl-10 h-12 rounded-xl border-2 transition-all duration-200 ${errors.email
                    ? 'border-red-300 focus:border-red-500'
                    : 'border-gray-200 focus:border-blue-500'
                    }`}
                  disabled={isLoading}
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm flex items-center space-x-1">
                  <AlertCircle className="h-4 w-4" />
                  <span>{errors.email.message}</span>
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-semibold text-gray-700">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters"
                    }
                  })}
                  placeholder="Create a password"
                  className={`pl-10 pr-10 h-12 rounded-xl border-2 transition-all duration-200 ${errors.password
                    ? 'border-red-300 focus:border-red-500'
                    : 'border-gray-200 focus:border-blue-500'
                    }`}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>

              {password && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">Password strength:</span>
                    <span className={`text-xs font-medium ${passwordStrength.strength <= 2 ? 'text-red-600' :
                      passwordStrength.strength === 3 ? 'text-yellow-600' : 'text-green-600'
                      }`}>
                      {passwordStrength.label}
                    </span>
                  </div>
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className={`h-2 flex-1 rounded-full ${i < passwordStrength.strength ? passwordStrength.color : 'bg-gray-200'
                          }`}
                      />
                    ))}
                  </div>
                </div>
              )}

              {errors.password && (
                <p className="text-red-500 text-sm flex items-center space-x-1">
                  <AlertCircle className="h-4 w-4" />
                  <span>{errors.password.message}</span>
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Creating account...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <UserPlus className="h-5 w-5" />
                  <span>Create Account</span>
                </div>
              )}
            </Button>
          </form>

          <div className="pt-4 border-t border-gray-200">
            <p className="text-center text-sm text-gray-600">
              Already have an account?{' '}
              <button
                onClick={() => navigate('/login')}
                className="text-blue-600 hover:text-blue-800 font-semibold transition-colors"
                disabled={isLoading}
              >
                Sign in here
              </button>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;