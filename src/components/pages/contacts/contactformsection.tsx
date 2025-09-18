"use client";

import {
  Controller,
  type Control,
  type FieldErrors,
  type UseFormSetError,
  type UseFormClearErrors,
} from "react-hook-form";
import { IMaskInput } from "react-imask";
import { User, Mail, Phone, Lock, CreditCard } from "lucide-react";

import { handleCpfVerify } from "@/lib/services/api/cpfvercel";
import { PHONE_MASK, CPF_MASK } from "@/lib/mask";
import { type FullFormData } from "@/lib/validations/formschema";

// Interface de props que espera o controle do formulário unificado
interface ContactFormProps {
  control: Control<FullFormData>;
  errors: FieldErrors<FullFormData>;
  setError: UseFormSetError<FullFormData>;
  clearErrors: UseFormClearErrors<FullFormData>;
}

export default function ContactForm({
  control,
  errors,
  setError,
  clearErrors,
}: ContactFormProps) {
  
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-slate-800">Dados pessoais</h2>

      {/* Nome */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-slate-700">
          Nome Completo
        </label>
        <div className="relative mt-1">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <User className="h-5 w-5 text-gray-400" />
          </div>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                id="name"
                type="text"
                placeholder="Seu nome"
                className="block w-full rounded-md border-gray-300 pl-10 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            )}
          />
        </div>
        {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
      </div>

      {/* CPF */}
      <div>
        <label htmlFor="cpf" className="block text-sm font-medium text-slate-700">
          CPF
        </label>
        <div className="relative mt-1">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <CreditCard className="h-5 w-5 text-gray-400" />
          </div>
          <Controller
            name="cpf"
            control={control}
            render={({ field }) => (
              <IMaskInput
                {...field}
                mask={CPF_MASK}
                id="cpf"
                placeholder="000.000.000-00"
                onAccept={(value) => field.onChange(value)}
                onBlur={async (e) => {
                  const message = await handleCpfVerify(e.currentTarget.value);
                  if (message === "CPF inválido.") {
                    setError("cpf", { type: "manual", message });
                  } else {
                    clearErrors("cpf");
                  }
                }}
                className="block w-full rounded-md border-gray-300 pl-10 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            )}
          />
        </div>
        {errors.cpf && <p className="mt-1 text-sm text-red-600">{errors.cpf.message}</p>}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-slate-700">
          E-mail
        </label>
        <div className="relative mt-1">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Mail className="h-5 w-5 text-gray-400" />
          </div>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                id="email"
                type="email"
                placeholder="seu.email@exemplo.com"
                className="block w-full rounded-md border-gray-300 pl-10 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            )}
          />
        </div>
        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
      </div>

      {/* Senha */}
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-slate-700">
          Senha
        </label>
        <div className="relative mt-1">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Lock className="h-5 w-5 text-gray-400" />
          </div>
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                id="password"
                type="password"
                placeholder="********"
                className="block w-full rounded-md border-gray-300 pl-10 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            )}
          />
        </div>
        {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>}
      </div>

      {/* Confirmar Senha */}
      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-700">
          Confirmar Senha
        </label>
        <div className="relative mt-1">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Lock className="h-5 w-5 text-gray-400" />
          </div>
          <Controller
            name="confirmPassword"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                id="confirmPassword"
                type="password"
                placeholder="********"
                className="block w-full rounded-md border-gray-300 pl-10 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            )}
          />
        </div>
        {errors.confirmPassword && (
          <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
        )}
      </div>

      {/* Telefone */}
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-slate-700">
          Telefone (Opcional)
        </label>
        <div className="relative mt-1">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Phone className="h-5 w-5 text-gray-400" />
          </div>
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <IMaskInput
                {...field}
                mask={PHONE_MASK}
                id="phone"
                placeholder="(99) 99999-9999"
                className="block w-full rounded-md border-gray-300 pl-10 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            )}
          />
        </div>
        {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>}
      </div>
    </div>
  );
}
