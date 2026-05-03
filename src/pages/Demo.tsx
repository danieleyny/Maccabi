import { useMemo, useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import clsx from 'clsx'
import { ArrowRight, Check } from 'lucide-react'
import { Button } from '../components/primitives/Button'
import { Eyebrow } from '../components/primitives/Eyebrow'
import { Chip } from '../components/primitives/Chip'
import { InViewRoot } from '../components/primitives/InViewRoot'
import { demoExpectations } from '../content/copy'
import './Demo.css'

interface FormState {
  name: string
  email: string
  institution: string
  role: string
  modules: string[]
  notes: string
}

const ROLE_OPTIONS = [
  'Research Admin',
  'Sponsored Programs',
  'IT',
  'Compliance',
  'Faculty',
  'Leadership',
  'Other',
]

const MODULE_OPTIONS = [
  'Grants & Contracts',
  'IRB',
  'IACUC',
  'IBC',
  'COI / COC',
  'Current & Pending',
  'Effort Reporting',
  'Dashboards & Integrations',
  'Not sure yet',
]

export function DemoPage() {
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    institution: '',
    role: '',
    modules: [],
    notes: '',
  })
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({})
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const completedSteps = useMemo(() => {
    let n = 0
    if (form.name && form.email && form.institution) n++
    if (form.role || form.modules.length) n++
    if (form.notes.length > 0) n++
    if (status === 'success') n = 4
    else n = Math.max(n, 0)
    return n
  }, [form, status])

  const update = <K extends keyof FormState>(k: K, v: FormState[K]) => {
    setForm((f) => ({ ...f, [k]: v }))
    setErrors((e) => ({ ...e, [k]: undefined }))
  }

  const toggleModule = (m: string) => {
    update(
      'modules',
      form.modules.includes(m) ? form.modules.filter((x) => x !== m) : [...form.modules, m],
    )
  }

  const validate = () => {
    const next: typeof errors = {}
    if (!form.name.trim()) next.name = 'Tell us your name.'
    if (!form.email.trim()) next.email = 'Add a work email so we can reply.'
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) next.email = 'That email looks off.'
    if (!form.institution.trim()) next.institution = 'Which institution?'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setStatus('loading')
    await new Promise((r) => setTimeout(r, 900))
    setStatus('success')
  }

  return (
    <main id="main" className="demo">
      <InViewRoot className="demo__bg" aria-hidden="true">
        <div className="demo__mesh" />
        <div className="demo__grid" />
      </InViewRoot>

      <div className="container demo__inner">
        <div className="demo__form-wrap">
          <Eyebrow>Request Demo</Eyebrow>
          <h1 className="demo__title">A focused conversation around your institution.</h1>
          <p className="demo__lede">
            Tell us about the workflows that matter most. We will tailor the conversation around your priorities.
          </p>

          <form className="demo__form" noValidate onSubmit={onSubmit} aria-describedby="demo-form-status">
            <div className="demo__row">
              <Field
                label="Full name"
                id="name"
                value={form.name}
                onChange={(v) => update('name', v)}
                error={errors.name}
                autoComplete="name"
                required
              />
              <Field
                label="Work email"
                id="email"
                type="email"
                value={form.email}
                onChange={(v) => update('email', v)}
                error={errors.email}
                autoComplete="email"
                required
              />
            </div>

            <div className="demo__row">
              <Field
                label="Institution"
                id="institution"
                value={form.institution}
                onChange={(v) => update('institution', v)}
                error={errors.institution}
                autoComplete="organization"
                required
              />
              <Select
                label="Role"
                id="role"
                value={form.role}
                onChange={(v) => update('role', v)}
                options={ROLE_OPTIONS}
              />
            </div>

            <div className="demo__field-block">
              <span className="demo__label">Modules of interest</span>
              <div className="demo__chips" role="group" aria-label="Modules of interest">
                {MODULE_OPTIONS.map((m) => (
                  <Chip
                    key={m}
                    type="button"
                    active={form.modules.includes(m)}
                    onClick={() => toggleModule(m)}
                  >
                    {m}
                  </Chip>
                ))}
              </div>
            </div>

            <Field
              label="Notes"
              id="notes"
              as="textarea"
              value={form.notes}
              onChange={(v) => update('notes', v)}
              hint="Workflows, modules, integrations, or constraints — whatever helps us tailor the demo."
            />

            <div className="demo__actions">
              <Button
                variant="primary"
                size="lg"
                type="submit"
                loading={status === 'loading'}
                iconRight={status === 'success' ? <Check size={18} /> : <ArrowRight size={18} />}
                disabled={status === 'loading'}
              >
                {status === 'success' ? 'Request received' : status === 'loading' ? 'Sending…' : 'Request Demo'}
              </Button>
              <span id="demo-form-status" aria-live="polite" className="demo__status">
                {status === 'success' && 'Thanks — the Novelution team will be in touch.'}
              </span>
            </div>
          </form>
        </div>

        <aside className="demo__expect" aria-label="What to expect">
          <Eyebrow>What to expect</Eyebrow>
          <ol className="demo__timeline">
            {demoExpectations.map((step, i) => {
              const done = i < completedSteps
              return (
                <li key={step} className={clsx('demo__step', done && 'is-done')}>
                  <motion.span
                    className="demo__step-dot"
                    initial={false}
                    animate={{
                      backgroundColor: done ? 'rgba(89,208,180,1)' : 'rgba(255,255,255,0.18)',
                      scale: done ? 1.05 : 1,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {done ? <Check size={12} /> : i + 1}
                  </motion.span>
                  <span>{step}</span>
                </li>
              )
            })}
          </ol>
        </aside>
      </div>
    </main>
  )
}

interface FieldProps {
  label: string
  id: string
  value: string
  onChange: (value: string) => void
  type?: string
  required?: boolean
  autoComplete?: string
  as?: 'input' | 'textarea'
  hint?: string
  error?: string
}

function Field({ label, id, value, onChange, type = 'text', required, autoComplete, as = 'input', hint, error }: FieldProps) {
  const Tag = as
  const filled = value.length > 0
  return (
    <div className={clsx('demo__field', filled && 'is-filled', error && 'has-error')}>
      <label htmlFor={id}>{label}{required && <span aria-hidden="true"> *</span>}</label>
      <Tag
        id={id}
        name={id}
        autoComplete={autoComplete}
        type={as === 'input' ? type : undefined}
        rows={as === 'textarea' ? 5 : undefined}
        required={required}
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChange(e.target.value)}
        aria-invalid={!!error || undefined}
        aria-describedby={error ? `${id}-err` : hint ? `${id}-hint` : undefined}
      />
      {hint && !error && <small id={`${id}-hint`}>{hint}</small>}
      {error && <small id={`${id}-err`} className="demo__err">{error}</small>}
    </div>
  )
}

function Select({ label, id, value, onChange, options }: { label: string; id: string; value: string; onChange: (v: string) => void; options: string[] }) {
  return (
    <div className={clsx('demo__field', value && 'is-filled')}>
      <label htmlFor={id}>{label}</label>
      <select id={id} name={id} value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="" disabled>Select role</option>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  )
}
