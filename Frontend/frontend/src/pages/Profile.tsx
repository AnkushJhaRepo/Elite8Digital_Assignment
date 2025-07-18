import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '@/api/axios';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Mail, CreditCard, CheckCircle, XCircle,} from 'lucide-react';

type ProfileData = {
  fullname: string;
  email: string;
  fees_status: boolean;
};

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const getProfile = async () => {
    try {
      const res = await API.get('/current');
      setProfile(res.data?.data || {});
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to fetch profile');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-8">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="text-gray-600 font-medium">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-8">
      <Card className="w-full max-w-lg shadow-xl rounded-3xl border-0 bg-white/95 backdrop-blur-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-center">
            <Avatar className="h-24 w-24 ring-4 ring-blue-100 ring-offset-4 ring-offset-white">
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-3xl font-bold">
                {profile?.fullname?.[0]?.toUpperCase() || "?"}
              </AvatarFallback>
            </Avatar>
          </div>
        </CardHeader>

        <CardContent className="space-y-6 px-8 pb-8">
          <div className="text-center space-y-3">
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
              {profile?.fullname || 'Unknown User'}
            </h1>
            <div className="flex items-center justify-center space-x-2 text-gray-600">
              <Mail className="h-4 w-4" />
              <span className="text-sm">{profile?.email}</span>
            </div>
          </div>

          <div className="bg-gray-50 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <CreditCard className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Payment Status</p>
                  <p className="text-sm text-gray-500">Fee payment information</p>
                </div>
              </div>

              <Badge
                variant={profile?.fees_status ? "default" : "destructive"}
                className={`flex items-center space-x-1 px-3 py-1 ${profile?.fees_status
                    ? 'bg-green-100 text-green-800 hover:bg-green-200'
                    : 'bg-red-100 text-red-800 hover:bg-red-200'
                  }`}
              >
                {profile?.fees_status ? (
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
            </div>
          </div>

          {!profile?.fees_status && (
            <div className="space-y-3">
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                <div className="flex items-center space-x-2">
                  <div className="flex-shrink-0">
                    <XCircle className="h-5 w-5 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-amber-800">
                      Payment Required
                    </p>
                    <p className="text-xs text-amber-700">
                      Complete your fee payment to access all features
                    </p>
                  </div>
                </div>
              </div>

              <Button
                className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]"
                onClick={() => navigate('/pay-fees')}
              >
                <CreditCard className="h-5 w-5 mr-2" />
                Pay Fees Now
              </Button>
            </div>
          )}

          {profile?.fees_status && (
            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
              <div className="flex items-center space-x-2">
                <div className="flex-shrink-0">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-green-800">
                    All Set!
                  </p>
                  <p className="text-xs text-green-700">
                    Your fees are paid and account is active
                  </p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;