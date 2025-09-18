"use client";

import {
  Controller,
  type Control,
  type FieldErrors,
  type UseFormSetValue,
  type UseFormSetError,
  type UseFormClearErrors,
} from "react-hook-form";
import { IMaskInput } from "react-imask";

// Supondo que você tenha estas funções em algum lugar
import { fetchAddressByCep } from "@/lib/services/api/viacepapi";
import { ZIP_CODE_MASK } from "@/lib/mask";
import { type FullFormData } from "@/lib/validations/formschema";


// Interface para receber as props do formulário pai
interface AddressFormProps {
  control: Control<FullFormData>;
  errors: FieldErrors<FullFormData>;
  setValue: UseFormSetValue<FullFormData>;
  setError: UseFormSetError<FullFormData>;
  clearErrors: UseFormClearErrors<FullFormData>;
}

export default function AddressFormSection({
  control,
  errors,
  setValue,
  setError,
  clearErrors,
}: AddressFormProps) {
  // Função que busca o CEP e preenche os campos usando o 'setValue' do pai
  async function handleCepBlur(e: React.FocusEvent<HTMLInputElement>) {
    const cepValue = e.target.value.replace(/\D/g, ""); // Remove não-dígitos
    if (cepValue.length !== 8) return;

    try {
      clearErrors(["street", "city", "state", "cep"]);
      const result = await fetchAddressByCep(cepValue);
      setValue("street", result.address, { shouldValidate: true });
      setValue("city", result.city, { shouldValidate: true });
      setValue("state", result.state, { shouldValidate: true });
    } catch (error) {
      setError("cep", {
        type: "manual",
        message: "CEP não encontrado ou inválido.",
      });
    }
  }

  return (
    <div className="space-y-6 border-t border-gray-200 pt-6">
      <h2 className="text-xl font-semibold text-slate-800">Endereço</h2>
      {/* CEP */}
      <div>
        <label htmlFor="cep" className="block text-sm font-medium text-gray-700">
          CEP
        </label>
        <Controller
          name="cep"
          control={control}
          render={({ field }) => (
            <IMaskInput
              {...field}
              mask={ZIP_CODE_MASK}
              id="cep"
              placeholder="00000-000"
              onAccept={(value) => field.onChange(value)}
              onBlur={handleCepBlur}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          )}
        />
        {errors.cep && (
          <p className="mt-1 text-sm text-red-600">{errors.cep.message}</p>
        )}
      </div>

      {/* Rua / Logradouro */}
      <div>
        <label htmlFor="street" className="block text-sm font-medium text-gray-700">
          Rua / Logradouro
        </label>
        <Controller
          name="street"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              id="street"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          )}
        />
        {errors.street && (
          <p className="mt-1 text-sm text-red-600">{errors.street.message}</p>
        )}
      </div>

      {/* Número */}
      <div>
        <label htmlFor="number" className="block text-sm font-medium text-gray-700">
          Número
        </label>
        <Controller
          name="number"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              id="number"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          )}
        />
        {errors.number && (
          <p className="mt-1 text-sm text-red-600">{errors.number.message}</p>
        )}
      </div>

      {/* Cidade */}
      <div>
        <label htmlFor="city" className="block text-sm font-medium text-gray-700">
          Cidade
        </label>
        <Controller
          name="city"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              id="city"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          )}
        />
        {errors.city && (
          <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>
        )}
      </div>

      {/* Estado */}
      <div>
        <label htmlFor="state" className="block text-sm font-medium text-gray-700">
          Estado
        </label>
        <Controller
          name="state"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              id="state"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          )}
        />
        {errors.state && (
          <p className="mt-1 text-sm text-red-600">{errors.state.message}</p>
        )}
      </div>
    </div>
  );
}