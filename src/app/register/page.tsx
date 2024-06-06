'use client'

import { Form } from '@/components/Form'
import { useAuthFetch } from '@/hooks/useAuthFetch'
import { useLoading } from '@/hooks/useLoading'
import { useState } from 'react'

export default function LoginPage () {
  const { finishLoading, isLoading, startLoading } = useLoading()
  const authFetch = useAuthFetch()
  const [error, setError] = useState<string | null>(null)

  const validatePassword = (password: string) => {
    const errors = []
    if (password.length < 8) {
      errors.push('al menos 8 caracteres')
    }
    if (!/[A-Z]/.test(password)) {
      errors.push('una letra mayúscula')
    }
    if (!/[a-z]/.test(password)) {
      errors.push('una letra minúscula')
    }
    if (!/[0-9]/.test(password)) {
      errors.push('un número')
    }
    if (!/[@$!%*?&]/.test(password)) {
      errors.push('un carácter especial')
    }
    return errors
  }

  const register = async (formData: any) => {
    const { password, confirmPassword } = formData

    // Reset error state
    setError(null)

    // Validate password
    const passwordErrors = validatePassword(password)
    if (passwordErrors.length > 0) {
      setError(`La contraseña debe tener ${passwordErrors.join(', ')}.`)
      finishLoading()
      return
    }

    // Validate password match
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden.')
      finishLoading()
      return
    }

    startLoading()
    await authFetch({
      endpoint: 'register',
      redirectRoute: '/home',
      formData
    })
    finishLoading()
  }

  return (
    <>
      <Form
        title='Registrate'
        onSubmit={register}
        description='Formulario para crear una cuenta'
      >
        <div className='my-[10px] flex flex-col gap-4'>
          <Form.Input
            label='Correo'
            name='email'
            placeholder='Ingresa tu correo...'
          />
          <Form.Input
            placeholder='Ingresa tu contraseña...'
            label='Contraseña'
            name='password'
            type='password'
          />
          <Form.Input
            placeholder='Repite tu contraseña...'
            label='Contraseña'
            name='confirmPassword'
            type='password'
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <Form.SubmitButton buttonText='Crear cuenta' isLoading={isLoading} />
        <Form.Footer
          description='Ya tienes cuenta?'
          textLink='Inicia Sesión'
          link='/'
        />
      </Form>
    </>
  )
}
