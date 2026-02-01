'use client'

import { useFormStatus } from 'react-dom'

export default function SignupButton() {
    const { pending } = useFormStatus()

    return (
        <button
            type="submit"
            disabled={pending}
            style={{
                marginTop: '0.5rem',
                padding: '0.9rem',
                background: pending ? '#333' : 'white',
                color: pending ? '#888' : 'black',
                border: 'none',
                borderRadius: '6px',
                fontSize: '0.95rem',
                fontWeight: 600,
                cursor: pending ? 'not-allowed' : 'pointer'
            }}
        >
            {pending ? 'Creating Account...' : 'Create Account'}
        </button>
    )
}
