import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { useToast } from './ui/use-toast';

interface Country {
  name: string;
  code: string;
}

interface City {
  name: string;
}

interface ProfileForm {
  firstName: string;
  lastName: string;
  country: string;
  city: string;
}

const ProfileInfo = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<ProfileForm>();

  const selectedCountry = watch('country');

  useEffect(() => {
    fetch('https://countriesnow.space/api/v0.1/countries')
      .then(res => res.json())
      .then(data => {
        setCountries(data.data.map((country: any) => ({
          name: country.country,
          code: country.iso2
        })));
      })
      .catch(error => {
        console.error('Error fetching countries:', error);
        toast({
          variant: "destructive",
          title: "Помилка",
          description: "Не вдалося завантажити список країн"
        });
      });
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      fetch('https://countriesnow.space/api/v0.1/countries/cities', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ country: selectedCountry }),
      })
        .then(res => res.json())
        .then(data => {
          setCities(data.data.map((city: string) => ({ name: city })));
        })
        .catch(error => {
          console.error('Error fetching cities:', error);
          toast({
            variant: "destructive",
            title: "Помилка",
            description: "Не вдалося завантажити список міст"
          });
        });
    }
  }, [selectedCountry]);

  const onSubmit = (data: ProfileForm) => {
    console.log('Profile data:', data);
    toast({
      title: "Успішно",
      description: "Профіль збережено"
    });
  };

  return (
    <div className="w-full max-w-md space-y-6 p-6 bg-white rounded-lg shadow-md">
      <div className="space-y-2 text-center">
        <h2 className="text-2xl font-bold">Інформація профілю</h2>
        <p className="text-gray-600">
          Заповніть додаткову інформацію про себе
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">Ім'я</Label>
          <Input
            id="firstName"
            {...register("firstName", { required: "Це поле обов'язкове" })}
          />
          {errors.firstName && (
            <p className="text-sm text-red-500">{errors.firstName.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="lastName">Прізвище</Label>
          <Input
            id="lastName"
            {...register("lastName", { required: "Це поле обов'язкове" })}
          />
          {errors.lastName && (
            <p className="text-sm text-red-500">{errors.lastName.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="country">Країна</Label>
          <Select onValueChange={(value) => setValue('country', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Оберіть країну" />
            </SelectTrigger>
            <SelectContent>
              {countries.map((country) => (
                <SelectItem key={country.code} value={country.name}>
                  {country.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.country && (
            <p className="text-sm text-red-500">{errors.country.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="city">Місто</Label>
          <Select onValueChange={(value) => setValue('city', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Оберіть місто" />
            </SelectTrigger>
            <SelectContent>
              {cities.map((city) => (
                <SelectItem key={city.name} value={city.name}>
                  {city.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.city && (
            <p className="text-sm text-red-500">{errors.city.message}</p>
          )}
        </div>

        <Button type="submit" className="w-full">
          Зберегти
        </Button>
      </form>
    </div>
  );
};

export default ProfileInfo;