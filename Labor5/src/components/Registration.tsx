import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { useToast } from './ui/use-toast';

interface RegistrationForm {
  phone: string;
  email: string;
  password: string;
  verificationCode: string;
}

const Registration = () => {
  const [showVerification, setShowVerification] = useState(false);
  const { toast } = useToast();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RegistrationForm>();

  const onSubmit = (data: RegistrationForm) => {
    if (!showVerification) {
      if (data.phone) {
        setShowVerification(true);
        toast({
          title: "Код підтвердження надіслано",
          description: "Використовуйте код 1234 для підтвердження"
        });
      }
    } else {
      if (data.verificationCode === "1234") {
        console.log("Реєстрація успішна:", data);
        toast({
          title: "Реєстрація успішна",
          description: "Будь ласка, заповніть інформацію профілю"
        });
      } else {
        toast({
          variant: "destructive",
          title: "Помилка",
          description: "Невірний код підтвердження"
        });
      }
    }
  };

  return (
    <div className="w-full max-w-md space-y-6 p-6 bg-white rounded-lg shadow-md">
      <div className="space-y-2 text-center">
        <h2 className="text-2xl font-bold">Реєстрація</h2>
        <p className="text-gray-600">
          Заповніть дані для реєстрації. Вам знадобиться номер телефону та email.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="phone">Номер телефону</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="+380"
            {...register("phone", { required: "Це поле обов'язкове" })}
          />
          {errors.phone && (
            <p className="text-sm text-red-500">{errors.phone.message}</p>
          )}
        </div>

        {showVerification && (
          <>
            <div className="space-y-2">
              <Label htmlFor="verificationCode">Код підтвердження</Label>
              <Input
                id="verificationCode"
                type="text"
                placeholder="1234"
                {...register("verificationCode", { required: "Це поле обов'язкове" })}
              />
              {errors.verificationCode && (
                <p className="text-sm text-red-500">{errors.verificationCode.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                {...register("email", {
                  required: "Це поле обов'язкове",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Невірний формат email",
                  },
                })}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Пароль</Label>
              <Input
                id="password"
                type="password"
                {...register("password", {
                  required: "Це поле обов'язкове",
                  minLength: {
                    value: 8,
                    message: "Пароль має містити мінімум 8 символів",
                  },
                })}
              />
              {errors.password && (
                <p className="text-sm text-red-500">{errors.password.message}</p>
              )}
            </div>
          </>
        )}

        <Button type="submit" className="w-full">
          {showVerification ? "Зареєструватися" : "Надіслати код"}
        </Button>
      </form>
    </div>
  );
};

export default Registration;