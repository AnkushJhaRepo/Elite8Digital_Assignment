import React from 'react';
import { useForm } from 'react-hook-form';
import API from '@/api/axios';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

type FormData = {
    cardName: string;
    cardNumber: string;
    cvv: string;
};

const PayFees: React.FC = () => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<FormData>();

    const onSubmit = async () => {
        try {
            await API.patch('/toggle-fees');
            alert('Payment successful!');
            navigate('/profile');
        } catch (err: any) {
            alert(err.response?.data?.message || 'Payment failed');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white p-8 rounded-lg shadow-md w-full max-w-md space-y-4"
            >
                <h2 className="text-2xl font-bold text-center">Pay Fees</h2>

                <div>
                    <Label htmlFor="cardName">Cardholder Name</Label>
                    <Input
                        id="cardName"
                        {...register('cardName', { required: 'Cardholder name is required' })}
                        placeholder="John Doe"
                    />
                    <p className="text-red-500 text-sm">{errors.cardName?.message}</p>
                </div>

                <div>
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input
                        id="cardNumber"
                        {...register('cardNumber', { required: 'Card number is required' })}
                        placeholder="1234 5678 9012 3456"
                    />
                    <p className="text-red-500 text-sm">{errors.cardNumber?.message}</p>
                </div>

                <div>
                    <Label htmlFor="cvv">CVV</Label>
                    <Input
                        id="cvv"
                        {...register('cvv', { required: 'CVV is required' })}
                        placeholder="123"
                    />
                    <p className="text-red-500 text-sm">{errors.cvv?.message}</p>
                </div>

                <Button type="submit" className="w-full">Pay Now</Button>
            </form>
        </div>
    );
};

export default PayFees;
